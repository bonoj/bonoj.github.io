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

    /** Future authenticated dispatcher calls this only on the UI thread.
     * Never pass arbitrary instructions directly from a webpage into this method.
     */
    private void observe() {
        browser.evaluateJavascript(
            "(function(){return JSON.stringify({url:location.href,title:document.title,text:(document.body?.innerText||'').slice(0,3000),controls:[...document.querySelectorAll('button,input,a,select,textarea')].slice(0,50).map((e,i)=>({index:i,tag:e.tagName,role:e.getAttribute('role'),label:e.getAttribute('aria-label')||e.innerText||e.getAttribute('placeholder')||'',type:e.getAttribute('type')||''}))})})()",
            result -> status.setText("DOM observation (local diagnostic): " + result.substring(0, Math.min(result.length(), 200)))
        );
    }

    @Override public void onBackPressed() {
        if (browser.canGoBack()) browser.goBack(); else super.onBackPressed();
    }

    @Override protected void onDestroy() {
        browser.destroy();
        super.onDestroy();
    }
}
