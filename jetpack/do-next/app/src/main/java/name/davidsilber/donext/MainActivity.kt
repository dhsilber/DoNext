package name.davidsilber.donext

import android.content.res.Configuration
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
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
    var resetCounter by remember { mutableStateOf(1) }
    var showDoneItems by remember { mutableStateOf(false) }
    Column {
        Text(text = "Do these things:\n")
        LazyColumn(modifier = Modifier.weight(1f)) {
            items(doList) { item -> DoNextItem(item, resetCounter, showDoneItems) }
        }
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier.fillMaxWidth().padding(8.dp)
        ) {
            Button(onClick = { resetCounter += 1 }) {
                Text(text = "Reset")
            }
//            Spacer(modifier = Modifier.padding(horizontal = 4.dp))
            Button(onClick = { showDoneItems = !showDoneItems }) {
                Text(text = if (showDoneItems) "Hide Done Items" else "Show Done Items")
            }
        }
    }
}

@Composable
fun DoNextItem(item: DoItem, resetCounter: Int, showDoneItems: Boolean) {
    var isHidden by remember(key1 = resetCounter) { mutableStateOf(false) }
    Row(modifier = Modifier
        .clickable { isHidden = !isHidden }
    ) {
        if (!isHidden) {
            Text(
                text = item.text,
                modifier = Modifier.padding(8.dp)
            )
        }
        if (isHidden && showDoneItems) {
            Text(
                text = item.text,
                modifier = Modifier
                    .padding(8.dp)
                    .alpha(0.5f)
            )
        }
    }
}

val previewData = listOf(
    DoItem("Walk dog", Instant.EPOCH),
    DoItem("Paint house", Instant.EPOCH),
    DoItem("Tweak gizmo parameters", Instant.EPOCH),
)

@Preview(
    uiMode = Configuration.UI_MODE_NIGHT_YES,
    showBackground = true,
)
@Composable
fun DefaultPreview() {
    DoNextTheme {
        DoNextList(previewData)
    }
}
