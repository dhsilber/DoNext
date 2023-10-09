package name.davidsilber.donext

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import name.davidsilber.donext.ui.theme.DoNextTheme
import org.junit.Rule
import org.junit.Test

class DoNextTest {

    @get:Rule
    val composeTestRule = createComposeRule()
    // use createAndroidComposeRule<YourActivity>() if you need access to
    // an activity

    @Test
    fun displaySingleItem() {
        // Start the app
        composeTestRule.setContent {
            DoNextTheme {
                DoNextItem(
                    item = previewData[1],
                    resetCounter = 0,
                    showDoneItems = false
                )
            }
        }

        composeTestRule.onNodeWithText(previewData[1].text).assertIsDisplayed()
    }

    @Test
    fun resetButton() {
        composeTestRule.setContent {
            DoNextTheme {
                DoNextList(doList = previewData)
            }
        }
        for (item in previewData) {
            composeTestRule.onNodeWithText(item.text).assertIsDisplayed()
        }
        composeTestRule.onNodeWithText(previewData[2].text).performClick()
        composeTestRule.onNodeWithText(previewData[2].text).assertDoesNotExist()

        composeTestRule.onNodeWithText("Reset").performClick()

        for (item in previewData) {
            composeTestRule.onNodeWithText(item.text).assertIsDisplayed()
        }

//        composeTestRule.onNodeWithText("Show Done Items").performClick()
//
//        for (item in previewData) {
//            composeTestRule.waitUntil {
//                composeTestRule.onAllNodesWithText(item.text)
//                    .fetchSemanticsNodes().size == 1
//            }
//        }

//        for ( item in previewData) {
//            composeTestRule.onNodeWithText(item.text).assertIsDisplayed()
//        }
    }

    @Test
    fun showHideButtonAction() {
        composeTestRule.setContent {
            DoNextTheme {
                DoNextList(doList = previewData)
            }
        }

        for (item in previewData) {
            composeTestRule.onNodeWithText(item.text).assertIsDisplayed()
        }
        composeTestRule.onNodeWithText(previewData[1].text).performClick()
        composeTestRule.onNodeWithText(previewData[1].text).assertDoesNotExist()

        composeTestRule.onNodeWithText("Show Done Items").assertIsDisplayed()
        composeTestRule.onNodeWithText("Show Done Items").performClick()
        composeTestRule.onNodeWithText("Hide Done Items").assertIsDisplayed()
        composeTestRule.onNodeWithText(previewData[1].text).assertIsDisplayed()
        composeTestRule.onNodeWithText("Hide Done Items").performClick()
        composeTestRule.onNodeWithText("Show Done Items").assertIsDisplayed()
    }

    @Test
    fun showHideButtonText() {
        composeTestRule.setContent {
            DoNextTheme {
                DoNextList(doList = previewData)
            }
        }

        composeTestRule.onNodeWithText("Show Done Items").assertIsDisplayed()
        composeTestRule.onNodeWithText("Show Done Items").performClick()
        composeTestRule.onNodeWithText("Hide Done Items").assertIsDisplayed()
        composeTestRule.onNodeWithText("Hide Done Items").performClick()
        composeTestRule.onNodeWithText("Show Done Items").assertIsDisplayed()
    }

}