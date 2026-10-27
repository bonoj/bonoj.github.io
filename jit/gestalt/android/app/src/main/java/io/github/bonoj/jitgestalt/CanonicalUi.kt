package io.github.bonoj.jitgestalt

import androidx.compose.foundation.layout.RowScope
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

// Canonical native primitives for this isolated experiment.
// Authority is this reviewed file, not model-authored screen code.
object CanonicalTokens {
    val Accent = Color(0xFFBD1831)
    val Background = Color(0xFFF7F7F5)
    val Ink = Color(0xFF242424)
    val Surface = Color.White
}

@Composable
fun CanonicalButton(onClick: () -> Unit, modifier: Modifier = Modifier, content: @Composable RowScope.() -> Unit) {
    Button(onClick = onClick, modifier = modifier, content = content)
}

@Composable
fun CanonicalChip(selected: Boolean, onClick: () -> Unit, label: @Composable () -> Unit) {
    FilterChip(selected = selected, onClick = onClick, label = label)
}

@Composable
fun CanonicalCard(content: @Composable () -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = CanonicalTokens.Surface), content = content)
}
