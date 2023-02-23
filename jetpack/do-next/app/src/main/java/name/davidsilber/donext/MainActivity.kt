package name.davidsilber.donext

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import name.davidsilber.donext.ui.theme.DoNextTheme
import java.time.Instant

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DoNextTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    DoNextList(privateData)
                }
            }
        }
    }
}

data class DoItem(val text: String, val date: Instant)

@Composable
fun DoNextList(doList: List<DoItem>) {
    Column {
        Text(text = "Do these things:")
        LazyColumn {
            items(doList) { item -> DoNextItem(item) }
        }
    }
}

@Composable
fun DoNextItem(item: DoItem) {
    Text(text = item.text)
}

val previewData = listOf(
    DoItem("Walk dog", Instant.EPOCH),
    DoItem("Paint house", Instant.EPOCH),
    DoItem("Tweak gizmo parameters", Instant.EPOCH),
)

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    DoNextTheme {
        DoNextList(previewData)
    }
}
