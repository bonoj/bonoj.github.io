package io.github.bonoj.jitgestalt

import android.os.Bundle
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
                        onClick = { selected = if (selected == idea) "" else idea },
                        label = { Text(idea) }
                    )
                }
            }
            Card(colors = CardDefaults.cardColors(containerColor = Color.White)) {
                Column(Modifier.fillMaxWidth().padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("✦", style = MaterialTheme.typography.displayMedium, color = Accent)
                    Text("The observatory", style = MaterialTheme.typography.titleLarge)
                    Text("The model authors intent; renderers interpret the contract.")
                    Button(onClick = { saved = !saved }) {
                        Text(if (saved) "✓ Saved" else "Save idea")
                    }
                }
            }
            Button(onClick = { explored++ }, modifier = Modifier.fillMaxWidth()) {
                Text("Explore ideas")
            }
            if (explored > 0) {
                Text("Explored $explored time(s)" + if (selected.isNotEmpty()) " · $selected" else "")
            }
            Text("Native Android · Kotlin · Jetpack Compose", style = MaterialTheme.typography.labelSmall)
        }
    }
}
