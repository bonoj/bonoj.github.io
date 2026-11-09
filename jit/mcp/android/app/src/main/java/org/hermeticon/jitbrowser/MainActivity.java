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
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.graphics.Insets;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import org.json.JSONObject;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.io.ByteArrayOutputStream;

/**
 * Foreground browser shell with explicitly approved read-only observation.
 * No JS interface is exposed to untrusted websites.
 */
public final class MainActivity extends Activity {
    private WebView browser;
    private TextView status;
    private EditText address;
    private long revision = 0;
    private BrowserExecutor executor;
    private DeviceTransport transport;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.WHITE);
        root.setFocusableInTouchMode(true);
        root.setOnApplyWindowInsetsListener((view, insets) -> {
            Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsets.CONSUMED;
        });
        address = new EditText(this);
        address.setSingleLine(true);
        address.setHint("https://example.org");
        LinearLayout navigation = new LinearLayout(this);
        navigation.setOrientation(LinearLayout.HORIZONTAL);
        navigation.addView(address, new LinearLayout.LayoutParams(0, -2, 1));
        Button go = new Button(this);
        go.setText("Go");
        go.setAllCaps(false);
        navigation.addView(go, new LinearLayout.LayoutParams(-2, -2));
        root.addView(navigation, new LinearLayout.LayoutParams(-1, -2));
        address.setText("https://example.com");
        address.setSelectAllOnFocus(true);
        status = new TextView(this);
        status.setText("Sharing off");
        status.setTextColor(Color.BLACK);
        status.setTextSize(12);
        status.setPadding(12,4,12,4);
        root.addView(status, new LinearLayout.LayoutParams(-1, -2));
        browser = new WebView(this);
        browser.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (!request.isForMainFrame()) return false;
                String url = request.getUrl().toString();
                if (transport != null && transport.blockRemoteNavigation(url)) return true;
                return DeviceTransport.origin(url) == null;
            }
            @Override public void onPageStarted(WebView view, String url, android.graphics.Bitmap icon) {
                if (transport != null) transport.navigation(url);
                if (executor != null) executor.invalidate();
            }
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
        TextView sharing = new TextView(this);
        sharing.setText("Remote observation off");
        sharing.setTextColor(Color.BLACK);
        sharing.setTextSize(12);
        sharing.setPadding(12,4,12,4);
        root.addView(sharing);
        try { transport = new DeviceTransport(this,browser,sharing::setText); }
        catch (Exception failure) { sharing.setText("Transport unavailable"); }
        LinearLayout controls = new LinearLayout(this);
        Button enroll = new Button(this);
        enroll.setText("Enroll");
        Button share = new Button(this);
        share.setText("Share page text");
        Button pause = new Button(this);
        pause.setText("Stop sharing");
        for (Button button : new Button[]{enroll,share,pause}) {
            controls.addView(button,new LinearLayout.LayoutParams(0,-2,1));
            button.setEnabled(transport != null);
        }
        enroll.setOnClickListener(v -> {
            EditText code = new EditText(this);
            code.setSingleLine(true);
            code.setHint("One-time enrollment code");
            code.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
            new android.app.AlertDialog.Builder(this).setTitle("Enroll this companion")
                .setView(code).setNegativeButton("Cancel",null)
                .setPositiveButton("Enroll",(dialog,which)->{
                    String value=code.getText().toString().trim();
                    code.setText("");
                    transport.enroll(value);
                }).show();
        });
        share.setOnClickListener(v -> new android.app.AlertDialog.Builder(this)
            .setTitle("Share visible page text with JIT MCP?")
            .setMessage("Only the current website is approved. Sharing stops when you leave the app or tap Stop sharing.")
            .setNegativeButton("Cancel",null).setPositiveButton("Share",(dialog,which)->transport.start()).show());
        pause.setOnClickListener(v -> transport.stop());
        root.addView(browser, new LinearLayout.LayoutParams(-1, 0, 1));
        LinearLayout bottom = new LinearLayout(this);
        bottom.setPadding(4,4,4,4);
        bottom.setBackgroundColor(Color.WHITE);
        bottom.setGravity(android.view.Gravity.CENTER_VERTICAL);
        Button back = new Button(this); back.setText("‹"); back.setOnClickListener(v -> { if(browser.canGoBack()) browser.goBack(); });
        Button forward = new Button(this); forward.setText("›"); forward.setOnClickListener(v -> { if(browser.canGoForward()) browser.goForward(); });
        Button reload = new Button(this); reload.setText("↻"); reload.setOnClickListener(v -> browser.reload());
        Button connect = new Button(this); connect.setText("Connect"); connect.setAllCaps(false);
        connect.setOnClickListener(v -> new android.app.AlertDialog.Builder(this).setTitle("JIT MCP · Connect").setItems(new String[]{"Enroll device","Share current site","Stop sharing","Inspect locally"},(d,i) -> { if(i==0) enroll.performClick(); else if(i==1) share.performClick(); else if(i==2) pause.performClick(); else observe(); }).setNegativeButton("Cancel",null).show());
        for(Button b : new Button[]{back,forward,reload,connect}) bottom.addView(b,new LinearLayout.LayoutParams(0,-2,b==connect?2:1));
        root.addView(bottom);
        controls.setVisibility(View.GONE);
        root.addView(controls);
        Button inspect = new Button(this);
        inspect.setText("Inspect DOM locally");
        inspect.setVisibility(View.GONE);
        inspect.setOnClickListener(v -> observe());
        Button stop = new Button(this);
        stop.setText("Stop / clear browser");
        stop.setVisibility(View.GONE);
        go.setOnClickListener(v -> navigate(address.getText().toString()));
        stop.setOnClickListener(v -> {
            if (transport != null) transport.stop();
            if (executor != null) executor.invalidate();
            browser.stopLoading();
            browser.loadUrl("about:blank");
            browser.clearHistory();
            status.setText("Stopped");
        });
        setContentView(root);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
        root.requestApplyInsets();
        root.requestFocus();
        root.post(() -> { root.requestFocus(); root.scrollTo(0,0); });
        browser.loadUrl("https://example.com");
    }

    private void navigate(String raw) {
        String url = raw.trim();
        if (DeviceTransport.origin(url) == null) {
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

    // onPause can occur while still visible in Android split-screen.
    // Remote consent is tied to visibility, not input focus.
    @Override protected void onStart() {
        super.onStart();
        if (transport != null) transport.foreground(true);
    }

    @Override protected void onStop() {
        if (transport != null) transport.foreground(false);
        super.onStop();
    }

    @Override protected void onDestroy() {
        if (transport != null) transport.destroy();
        browser.destroy();
        super.onDestroy();
    }
}
