package org.hermeticon.jitbrowser;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import android.webkit.WebView;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.net.ssl.HttpsURLConnection;
import org.json.JSONObject;
import org.json.JSONArray;

final class DeviceTransport {
    private static final String ENDPOINT = "https://iqglyokmcobegledbfcm.supabase.co/functions/v1/jit-mcp-capabilities";
    private static final String KEY_ALIAS = "jit-device-transport-v1";
    private final Handler ui = new Handler(Looper.getMainLooper());
    private final ExecutorService network = Executors.newSingleThreadExecutor();
    private final WebView web;
    private final Consumer<String> status;
    private final SharedPreferences settings;
    private final String jwt;
    private final String signingPublicKey;
    private final String bundledScript;
    private String token;
    private String session;
    private String approvedOrigin;
    private String script;
    private int runtimeVersion = 1;
    private int generation;
    private boolean foreground;
    private boolean starting;

    DeviceTransport(Context context, WebView web, Consumer<String> status) throws Exception {
        this.web = web;
        this.status = status;
        settings = context.getSharedPreferences("jit_transport", Context.MODE_PRIVATE);
        jwt = asset(context, "supabase-public-jwt.txt").trim();
        signingPublicKey = asset(context, "runtime-public-key.txt").trim();
        bundledScript = asset(context, "observe-v1.js");
        script = bundledScript;
        token = readToken();
        String cached = settings.getString("runtime", null);
        if (cached != null) {
            try { activate(new JSONObject(cached)); } catch (Exception ignored) { }
        }
    }

    void foreground(boolean value) {
        foreground = value;
        if (!value) stop();
    }

    void enroll(String code) {
        if (!foreground || !code.matches("[0-9a-f]{32}") || starting || session != null) {
            status.accept("Stop sharing first and enter the one-time 32-character enrollment code.");
            return;
        }
        int current = generation;
        starting = true;
        network.execute(() -> {
            try {
                byte[] bytes = new byte[32];
                new SecureRandom().nextBytes(bytes);
                String credential = hex(bytes);
                JSONObject result = call(credential, object("operation","enroll","pairing_code",code));
                if (result.has("error")) throw new IllegalStateException("Server: " + result.optString("error"));
                if (!result.has("device_id")) throw new IllegalStateException("Enrollment response missing device_id");
                saveToken(credential);
                ui.post(() -> {
                    token = credential;
                    if (generation == current && foreground) status.accept("Enrolled. Open a public page, then start sharing.");
                    starting = false;
                });
            } catch (Exception failure) {
                ui.post(() -> {
                    starting = false;
                    if (generation == current && foreground) status.accept("Enrollment failed: " + safeError(failure));
                });
            }
        });
    }

    void start() {
        final String origin = origin(web.getUrl());
        if (!foreground || token == null || origin == null || starting || session != null) {
            status.accept("Enroll and load a public HTTPS page before sharing.");
            return;
        }
        final String credential = token;
        final int current = ++generation;
        starting = true;
        network.execute(() -> {
            JSONObject update = null;
            try { update = call(credential, object("operation","runtime")); } catch (Exception ignored) { }
            final JSONObject candidate = update;
            try {
                JSONObject response = call(credential, object("operation","start","origin",origin));
                if (response.has("error")) throw new IllegalStateException("Server: " + response.optString("error"));
                final String id = response.getString("session_id");
                ui.post(() -> {
                    starting = false;
                    if (generation != current || !foreground || !origin.equals(origin(web.getUrl()))) {
                        revoke(credential,id);
                        return;
                    }
                    try { if (candidate != null) activate(candidate); } catch (Exception ignored) { }
                    approvedOrigin = origin;
                    session = id;
                    status.accept("Sharing page text from " + origin + " · runtime " + runtimeVersion);
                    poll(current,id,credential);
                });
            } catch (Exception failure) {
                ui.post(() -> {
                    starting = false;
                    if (generation == current) status.accept("Session failed: " + safeError(failure));
                });
            }
        });
    }

    void navigation(String url) {
        if (session != null && !approvedOrigin.equals(origin(url))) stop();
    }

    void stop() {
        ++generation;
        String previous = session;
        session = null;
        approvedOrigin = null;
        if (previous != null) {
            revoke(token,previous);
            status.accept("Sharing stopped.");
        }
    }

    void destroy() {
        foreground(false);
        network.shutdown();
    }

    private void revoke(String credential,String id) {
        if (!network.isShutdown()) network.execute(() -> {
            try { call(credential,object("operation","stop","session_id",id)); } catch (Exception ignored) { }
        });
    }

    private boolean active(int current,String id) {
        return foreground && current == generation && id.equals(session);
    }

    private void poll(int current,String id,String credential) {
        if (!active(current,id)) return;
        network.execute(() -> {
            try {
                JSONObject response = call(credential,object("operation","claim","session_id",id));
                ui.post(() -> {
                    if (!active(current,id)) return;
                    if (response.has("error")) { stop(); status.accept("Sharing session ended."); return; }
                    JSONObject command = response.optJSONObject("command");
                    if (command == null) schedule(current,id,credential);
                    else execute(current,id,credential,command);
                });
            } catch (Exception failure) {
                ui.post(() -> {
                    if (!active(current,id)) return;
                    stop();
                    status.accept("Connection lost. Sharing stopped.");
                });
            }
        });
    }

    private void schedule(int current,String id,String credential) {
        ui.postDelayed(() -> poll(current,id,credential),1500);
    }

    private void execute(int current,String id,String credential,JSONObject command) {
        String commandId = command.optString("command_id");
        String origin = approvedOrigin;
        if (!"browser.observe".equals(command.optString("operation")) ||
            !origin.equals(command.optString("origin")) || !origin.equals(origin(web.getUrl())) ||
            !unexpired(command.optString("expires_at"))) {
            complete(current,id,credential,commandId,object("error","observation_rejected"));
            return;
        }
        final boolean[] delivered = {false};
        Runnable timeout = () -> {
            if (delivered[0] || !active(current,id)) return;
            delivered[0] = true;
            complete(current,id,credential,commandId,object("error","execution_timeout"));
        };
        ui.postDelayed(timeout,3500);
        web.evaluateJavascript(script,raw -> {
            if (delivered[0] || !active(current,id)) return;
            delivered[0] = true;
            ui.removeCallbacks(timeout);
            JSONObject result;
            try {
                JSONObject dom = new JSONObject(raw);
                if (dom.has("error")) result = object("error","document_unavailable");
                else if (!origin.equals(origin(web.getUrl())) || !origin.equals(dom.optString("origin"))) {
                    result = object("error","observation_rejected");
                } else {
                    result = object("origin",origin,"title",clip(dom.getString("title"),160),
                        "text",clip(dom.getString("text"),360),"observed_at",Instant.now().toString(),
                        "nonce",UUID.randomUUID().toString(),"runtime_version",runtimeVersion);
                    if (runtimeVersion >= 3) result.put("links", safeLinks(dom.optJSONArray("links")));
                }
            } catch (Exception failure) { result = object("error","invalid_runtime_result"); }
            complete(current,id,credential,commandId,result);
        });
    }

    private void complete(int current,String id,String credential,String commandId,JSONObject result) {
        if (!active(current,id)) return;
        network.execute(() -> {
            try { call(credential,object("operation","complete","session_id",id,"command_id",commandId,"result",result)); }
            catch (Exception ignored) { }
            ui.post(() -> schedule(current,id,credential));
        });
    }

    private void activate(JSONObject release) throws Exception {
        int version = release.getInt("version");
        String source = release.getString("script");
        if (version < 2 || version < settings.getInt("highest_runtime",1) ||
            release.getInt("min_host") != 1 || source.length() > 4096) return;
        String digest = hex(MessageDigest.getInstance("SHA-256").digest(source.getBytes(StandardCharsets.UTF_8)));
        if (!digest.equals(release.getString("sha256"))) return;
        byte[] raw = Base64.decode(signingPublicKey,Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
        byte[] prefix = {0x30,0x2a,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x03,0x21,0x00};
        if (raw.length != 32) return;
        byte[] x509 = new byte[prefix.length+raw.length];
        System.arraycopy(prefix,0,x509,0,prefix.length);
        System.arraycopy(raw,0,x509,prefix.length,raw.length);
        Signature verify = Signature.getInstance("Ed25519");
        verify.initVerify(KeyFactory.getInstance("Ed25519").generatePublic(new X509EncodedKeySpec(x509)));
        verify.update(("jit-dom-v1\n"+version+"\n1\n"+digest+"\n").getBytes(StandardCharsets.UTF_8));
        if (!verify.verify(Base64.decode(release.getString("signature"),Base64.DEFAULT))) return;
        if (!settings.edit().putString("runtime",release.toString()).putInt("highest_runtime",version).commit()) return;
        script = source;
        runtimeVersion = version;
    }

    private JSONObject call(String credential,JSONObject body) throws Exception {
        HttpsURLConnection conn = (HttpsURLConnection) new URL(ENDPOINT).openConnection();
        conn.setInstanceFollowRedirects(false);
        conn.setConnectTimeout(3000);
        conn.setReadTimeout(4000);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization","Bearer "+jwt);
        conn.setRequestProperty("X-JIT-Device-Token",credential);
        conn.setRequestProperty("Content-Type","application/json");
        conn.setDoOutput(true);
        byte[] bytes = body.toString().getBytes(StandardCharsets.UTF_8);
        if (bytes.length > 2048) throw new IllegalArgumentException();
        conn.setFixedLengthStreamingMode(bytes.length);
        try {
            try (java.io.OutputStream output = conn.getOutputStream()) { output.write(bytes); }
            int http = conn.getResponseCode();
            if (http != 200) throw new IllegalStateException("HTTP " + http);
            try (InputStream in = conn.getInputStream()) { return new JSONObject(read(in,8192)); }
        } finally { conn.disconnect(); }
    }

    private static String safeError(Exception error) {
        String message = error.getMessage();
        if (error instanceof java.net.SocketTimeoutException) return "Network timeout";
        if (error instanceof java.net.UnknownHostException) return "Cannot resolve server";
        if (error instanceof javax.net.ssl.SSLException) return "TLS connection failed";
        if (message != null && (message.startsWith("HTTP ") || message.startsWith("Server: ") || message.equals("Enrollment response missing device_id"))) return message;
        return "Network or device error (" + error.getClass().getSimpleName() + ")";
    }

    private SecretKey key() throws Exception {
        KeyStore store = KeyStore.getInstance("AndroidKeyStore");
        store.load(null);
        if (store.containsAlias(KEY_ALIAS)) return (SecretKey) store.getKey(KEY_ALIAS,null);
        KeyGenerator generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
        generator.init(new KeyGenParameterSpec.Builder(KEY_ALIAS,KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
            .setKeySize(256).setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build());
        return generator.generateKey();
    }

    private void saveToken(String value) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE,key());
        String sealed = Base64.encodeToString(cipher.getIV(),Base64.NO_WRAP)+"."+
            Base64.encodeToString(cipher.doFinal(value.getBytes(StandardCharsets.UTF_8)),Base64.NO_WRAP);
        if (!settings.edit().putString("credential",sealed).commit()) throw new IllegalStateException();
    }

    private String readToken() {
        String sealed = settings.getString("credential",null);
        if (sealed == null) return null;
        try {
            String[] parts = sealed.split("\\.");
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE,key(),new GCMParameterSpec(128,Base64.decode(parts[0],Base64.DEFAULT)));
            return new String(cipher.doFinal(Base64.decode(parts[1],Base64.DEFAULT)),StandardCharsets.UTF_8);
        } catch (Exception failure) { return null; }
    }

    static String origin(String value) {
        try {
            URI uri = URI.create(value);
            String host = uri.getHost();
            if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getRawUserInfo()!=null || host==null ||
                (uri.getPort()!=-1 && uri.getPort()!=443)) return null;
            host = host.toLowerCase(java.util.Locale.ROOT);
            if (!host.matches("(?:[a-z0-9-]+\\.)+[a-z]{2,63}") ||
                host.matches(".*\\.(local|internal|localhost|test|invalid|onion)")) return null;
            return "https://"+host;
        } catch (Exception failure) { return null; }
    }

    private static boolean unexpired(String time) {
        try { return Instant.parse(time).isAfter(Instant.now()); } catch (Exception failure) { return false; }
    }

    private static String asset(Context context,String name) throws Exception {
        try (InputStream in = context.getAssets().open(name)) { return read(in,8192); }
    }

    private static String read(InputStream in,int max) throws Exception {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int count;
        while ((count=in.read(buffer))!=-1) {
            if (out.size()+count>max) throw new IllegalArgumentException();
            out.write(buffer,0,count);
        }
        return out.toString(StandardCharsets.UTF_8.name());
    }

    private static String hex(byte[] bytes) {
        StringBuilder out = new StringBuilder(bytes.length*2);
        for (byte b : bytes) out.append(Character.forDigit((b&255)>>>4,16)).append(Character.forDigit(b&15,16));
        return out.toString();
    }

    private static JSONArray safeLinks(JSONArray source) throws Exception {
        JSONArray out = new JSONArray();
        if (source == null) return out;
        for (int i=0;i<source.length() && out.length()<5;i++) {
            JSONObject item = source.optJSONObject(i);
            if (item == null) continue;
            String label = item.optString("text","").trim();
            String href = item.optString("href","");
            if (label.isEmpty() || label.length()>60 || href.length()>160) continue;
            try {
                URI url = URI.create(href);
                if (!(url.getScheme().equalsIgnoreCase("https") || url.getScheme().equalsIgnoreCase("http")) ||
                    url.getHost()==null || url.getRawUserInfo()!=null) continue;
                out.put(object("text",label,"href",href));
            } catch (Exception ignored) { }
        }
        return out;
    }

    private static String clip(String value,int max) {
        return value.length()<=max?value:value.substring(0,max);
    }

    private static JSONObject object(Object... pairs) {
        JSONObject result = new JSONObject();
        try {
            for (int i=0;i<pairs.length;i+=2) result.put((String) pairs[i],pairs[i+1]);
        } catch (Exception error) { throw new IllegalArgumentException(error); }
        return result;
    }
}
