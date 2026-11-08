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
import java.io.ByteArrayOutputStream;

/**
 * Local-only browser shell. Remote command transport is intentionally NOT enabled.
 * No JS interface is exposed to untrusted websites.
 */
public final class MainActivity extends Activity {
    private WebView browser;
    private TextView status;
    private EditText address;
    private long revision = 0;
    private BrowserExecutor executor;

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
                if (executor != null) executor.invalidate();
                address.setText(url);
                status.setText("Loaded · revision " + revision + " · " + url);
            }
            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) status.setText("Navigation failed: " + error.getDescription());
            }
        });
        browser.setWebChromeClient(new WebChromeClient());
        android.webkit.WebView.setWebContentsDebuggingEnabled(false);
        WebSettings settings = browser.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setSupportMultipleWindows(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
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
            if (executor != null) executor.invalidate();
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

    /** Local diagnostic only; no remote command source is connected. */
    private void observe() {
        if (executor == null) {
            try (InputStream in = getAssets().open("dom-v1.js")) {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                byte[] buffer = new byte[8192];
                int count;
                while ((count = in.read(buffer)) != -1) out.write(buffer, 0, count);
                executor = new BrowserExecutor(browser, out.toString(StandardCharsets.UTF_8.name()));
            } catch (Exception ex) {
                status.setText("DOM runtime unavailable: " + ex.getClass().getSimpleName());
                return;
            }
        }
        JSONObject command = new JSONObject();
        try { command.put("operation", "observe"); } catch (Exception ignored) {}
        executor.execute(command, result -> {
            if (result.has("error")) {
                status.setText("DOM inspection: " + result.optString("error"));
                return;
            }
            JSONObject observation = result.optJSONObject("observation");
            if (observation == null) {
                status.setText("DOM inspection: missing observation");
                return;
            }
            status.setText("DOM observed locally · revision " + observation.optInt("revision")
                + " · controls " + (observation.optJSONArray("controls") == null ? 0 : observation.optJSONArray("controls").length()));
        });
    }

    @Override public void onBackPressed() {
        if (browser.canGoBack()) browser.goBack(); else super.onBackPressed();
    }

    @Override protected void onDestroy() {
        browser.destroy();
        super.onDestroy();
    }
}
