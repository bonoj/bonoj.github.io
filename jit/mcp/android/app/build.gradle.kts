plugins { id("com.android.application") }
android {
    namespace = "org.hermeticon.jitbrowser"
    compileSdk = 35
    defaultConfig { applicationId = "org.hermeticon.jitbrowser"; minSdk = 33; targetSdk = 35; versionCode = 2; versionName = "0.2.0" }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
}
