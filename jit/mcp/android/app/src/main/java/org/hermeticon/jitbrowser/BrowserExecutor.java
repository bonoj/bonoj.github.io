package org.hermeticon.jitbrowser;

import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;
import org.json.JSONObject;
import org.json.JSONTokener;
import java.util.function.Consumer;

/** Deterministic WebView execution engine. No network, device credentials or public JS bridge. */
public final class BrowserExecutor {
    private final WebView web;
    private final Handler main = new Handler(Looper.getMainLooper());
    private final String runtime;
    private long generation = 0;
    private boolean busy = false;

    public BrowserExecutor(WebView web, String runtime) {
        this.web = web;
        this.runtime = runtime;
    }

    public void invalidate() { generation++; busy = false; }

    public void execute(JSONObject command, Consumer<JSONObject> done) {
        if (Looper.myLooper() != Looper.getMainLooper()) {
            done.accept(error("wrong_thread")); return;
        }
        if (busy) { done.accept(error("busy")); return; }
        String operation = command.optString("operation", "");
        if (!operation.equals("observe") && !operation.equals("click") &&
            !operation.equals("fill") && !operation.equals("scroll") &&
            !operation.equals("back") && !operation.equals("navigate")) {
            done.accept(error("unsupported_operation")); return;
        }
        if (operation.equals("navigate")) {
            String url = command.optString("url", "");
            android.net.Uri uri = android.net.Uri.parse(url);
            if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getHost() == null) {
                done.accept(error("invalid_url")); return;
            }
            web.loadUrl(url);
            done.accept(pending("navigation_started")); return;
        }
        if (operation.equals("back")) {
            if (!web.canGoBack()) { done.accept(error("no_history")); return; }
            web.goBack();
            done.accept(pending("navigation_started")); return;
        }
        if (operation.equals("scroll")) {
            String direction = command.optString("direction", "");
            if (!direction.equals("up") && !direction.equals("down")) {
                done.accept(error("invalid_direction")); return;
            }
            int amount = command.optInt("amount", 0);
            if (amount < 1 || amount > 2000) { done.accept(error("invalid_amount")); return; }
            web.scrollBy(0, direction.equals("up") ? -amount : amount);
            main.postDelayed(() -> observe(done), 200);
            return;
        }
        if (web.getUrl() == null || !web.getUrl().startsWith("https://")) {
            done.accept(error("no_https_document")); return;
        }
        busy = true;
        long token = ++generation;
        web.evaluateJavascript(runtime, ignored -> {
            if (token != generation) return;
            String arg = JSONObject.quote(command.toString());
            web.evaluateJavascript("(function(){try{return JSON.stringify(window.__jitDomRuntime.act(JSON.parse(" +
                arg + ")));}catch(e){return JSON.stringify({error:'runtime_exception'});}})()", result -> {
                if (token != generation) return;
                JSONObject parsed = decode(result);
                if (!parsed.optBoolean("ok", false) || operation.equals("observe")) {
                    busy = false;
                    done.accept(parsed);
                    return;
                }
                // A click may navigate or cause an asynchronous SPA update. This is a bounded
                // settle delay, NOT proof of network-idle or completion of arbitrary async work.
                main.postDelayed(() -> {
                    if (token != generation) return;
                    web.evaluateJavascript(runtime, unused -> web.evaluateJavascript(
                        "JSON.stringify(window.__jitDomRuntime.act({operation:'observe'}))",
                        observed -> {
                            if (token != generation) return;
                            busy = false;
                            JSONObject resultObj = decode(observed);
                            try {
                                resultObj.put("action_dispatched", true);
                                resultObj.put("settle_delay_ms", 350);
                            } catch (Exception ignored2) {}
                            done.accept(resultObj);
                        }));
                }, 350);
            });
        });
    }

    private void observe(Consumer<JSONObject> done) {
        JSONObject command = new JSONObject();
        try { command.put("operation", "observe"); } catch (Exception ignored) {}
        execute(command, done);
    }

    private static JSONObject decode(String raw) {
        try {
            Object value = new JSONTokener(raw).nextValue();
            return new JSONObject(String.valueOf(value));
        } catch (Exception e) { return error("invalid_runtime_result"); }
    }

    private static JSONObject pending(String state) {
        JSONObject result = new JSONObject();
        try { result.put("pending", true); result.put("state", state); }
        catch (Exception ignored) {}
        return result;
    }

    private static JSONObject error(String message) {
        JSONObject result = new JSONObject();
        try { result.put("error", message); } catch (Exception ignored) {}
        return result;
    }
}
