package io.github.bonoj.jitgestalt

import android.os.Bundle
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import androidx.compose.ui.platform.LocalContext
import org.json.JSONObject
import org.json.JSONArray
import java.time.Instant
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

private val Accent = Color(0xFFBD1831)
private val Background = Color(0xFFF7F7F5)
private val Ink = Color(0xFF242424)
private val Ideas = listOf("Interiors", "Recipes", "Cats", "Gardens")

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(colorScheme = lightColorScheme(primary = Accent, background = Background, onBackground = Ink)) {
                GestaltScreen()
            }
        }
    }
}

@Composable
private fun GestaltScreen() {
    var selected by rememberSaveable { mutableStateOf("") }
    var saved by rememberSaveable { mutableStateOf(false) }
    var explored by rememberSaveable { mutableIntStateOf(0) }
    val context = LocalContext.current
    val events = remember { mutableStateListOf<JSONObject>() }
    val session = remember { Instant.now().toString() }
    fun record(action: String, detail: String) {
        events.add(JSONObject().put("at", Instant.now().toString()).put("action", action).put("detail", detail))
    }
    fun report(): String {
        val state = JSONObject()
            .put("selectedInterest", selected)
            .put("saved", saved)
            .put("exploreCount", explored)
        return JSONObject()
            .put("schema", "jit-gestalt-native-eye/v1")
            .put("fixture", "gestalt-covenant-fixture")
            .put("contract", "mini-gestalt/v1")
            .put("capturedAt", Instant.now().toString())
            .put("sessionStartedAt", session)
            .put("appId", context.packageName)
            .put("state", state)
            .put("events", JSONArray(events.toList()))
            .put("eventCount", events.size)
            .put("observationLimit", "in-memory events since this activity session; not a complete interaction trace")
            .toString(2)
    }

    Surface(color = Background, modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text("✿ JIT Gestalt", style = MaterialTheme.typography.titleMedium, color = Accent)
            Text("A tiny model-directed design system", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.height(8.dp))
            Text("Collect what moves you", style = MaterialTheme.typography.headlineLarge)
            Text("One declarative UI contract, multiple rendering targets.")
            Row(
                modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Ideas.forEach { idea ->
                    FilterChip(
                        selected = selected == idea,
                        onClick = { selected = if (selected == idea) "" else idea; record("selectInterest", selected) },
                        label = { Text(idea) }
                    )
                }
            }
            Card(colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("✦", style = MaterialTheme.typography.displayMedium, color = Accent)
                    Text("The observatory", style = MaterialTheme.typography.titleLarge)
                    Text("The model authors intent; renderers interpret the contract.")
                    Button(onClick = { saved = !saved; record("toggleSave", saved.toString()) }) {
                        Text(if (saved) "✓ Saved" else "Save idea")
                    }
                }
            }
            Button(onClick = { explored++; record("explore", explored.toString()) }, modifier = Modifier.fillMaxWidth()) {
                Text("Explore ideas")
            }
            if (explored > 0) {
                Text("Explored $explored time(s)" + if (selected.isNotEmpty()) " · $selected" else "")
            }
            HorizontalDivider()
            Button(onClick = {
                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                clipboard.setPrimaryClip(ClipData.newPlainText("JIT Gestalt Runtime Eyes", report()))
            }, modifier = Modifier.fillMaxWidth()) {
                Text("👁 Copy Runtime Eyes")
            }
            Text("Eyes: ${events.size} interactions · copy JSON to clipboard", style = MaterialTheme.typography.labelSmall)
            Text("Native Android · Kotlin · Jetpack Compose", style = MaterialTheme.typography.labelSmall)
        }
    }
}
