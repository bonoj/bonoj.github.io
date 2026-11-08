package org.hermeticon.jitbrowser;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceError;
import android.webkit.WebSettings;
import android.graphics.Color;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import org.json.JSONObject;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * Local-only browser shell. Remote command transport is intentionally NOT enabled.
 * No JS interface is exposed to untrusted websites.
 */
public final class MainActivity extends Activity {
    private WebView browser;
    private TextView status;
    private EditText address;
    private long revision = 0;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        address = new EditText(this);
        address.setSingleLine(true);
        address.setHint("https://example.org");
        root.addView(address, new LinearLayout.LayoutParams(-1, -2));
        Button go = new Button(this);
        go.setText("Navigate");
        root.addView(go, new LinearLayout.LayoutParams(-1, -2));
        status = new TextView(this);
        status.setText("Local browser only — remote control not connected");
        status.setTextColor(Color.BLACK);
        root.addView(status, new LinearLayout.LayoutParams(-1, -2));
        browser = new WebView(this);
        browser.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                revision++;
                address.setText(url);
                status.setText("Loaded · revision " + revision + " · " + url);
            }
            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) status.setText("Navigation failed: " + error.getDescription());
            }
        });
        browser.setWebChromeClient(new WebChromeClient());
        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        root.addView(browser, new LinearLayout.LayoutParams(-1, 0, 1));
        Button inspect = new Button(this);
        inspect.setText("Inspect DOM locally");
        root.addView(inspect, new LinearLayout.LayoutParams(-1, -2));
        inspect.setOnClickListener(v -> observe());
        Button stop = new Button(this);
        stop.setText("Stop / clear browser");
        root.addView(stop, new LinearLayout.LayoutParams(-1, -2));
        go.setOnClickListener(v -> navigate(address.getText().toString()));
        stop.setOnClickListener(v -> {
            browser.stopLoading();
            browser.loadUrl("about:blank");
            browser.clearHistory();
            status.setText("Stopped · remote control not connected");
        });
        setContentView(root);
    }

    private void navigate(String raw) {
        String url = raw.trim();
        android.net.Uri parsed = android.net.Uri.parse(url);
        if (!"https".equalsIgnoreCase(parsed.getScheme()) || parsed.getHost() == null) {
            status.setText("Only absolute HTTPS URLs are supported");
            return;
        }
        browser.loadUrl(url);
    }

    /** Local diagnostic only. A future authenticated dispatcher must enforce
     * device identity, authorization, origin and command expiry before execution.
     */
    private void observe() {
        if (browser.getUrl() == null || !browser.getUrl().startsWith("https://")) {
            status.setText("Navigate to an HTTPS page before inspecting");
            return;
        }
        final String script;
        try (InputStream in = getAssets().open("dom-v1.js")) {
            byte[] bytes = new byte[in.available()];
            int count = in.read(bytes);
            if (count != bytes.length) throw new java.io.IOException("Incomplete runtime asset");
            script = new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception ex) {
            status.setText("DOM runtime unavailable: " + ex.getClass().getSimpleName());
            return;
        }
        browser.evaluateJavascript(script, ignored -> browser.evaluateJavascript(
            "JSON.stringify(window.__jitDomRuntime.act({operation:'observe'}))",
            result -> {
                try {
                    // evaluateJavascript returns a JSON-encoded JavaScript string.
                    String decoded = new org.json.JSONTokener(result).nextValue().toString();
                    JSONObject observation = new JSONObject(decoded).getJSONObject("observation");
                    status.setText("DOM verified locally · revision " + observation.getInt("revision")
                        + " · controls " + observation.getJSONArray("controls").length());
                } catch (Exception ex) {
                    status.setText("DOM inspection failed: " + ex.getClass().getSimpleName());
                }
            }
        ));
    }

    @Override public void onBackPressed() {
        if (browser.canGoBack()) browser.goBack(); else super.onBackPressed();
    }

    @Override protected void onDestroy() {
        browser.destroy();
        super.onDestroy();
    }
}
