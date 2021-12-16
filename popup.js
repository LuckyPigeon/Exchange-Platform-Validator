let textArea = document.getElementById("textArea");

// chrome.storage.sync.get("url", ({ url }) => {
//     textArea.innerHTML = `
//     <span>world</span>
//     `
// });

textArea.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundText,
    });
});

// The body of this function will be executed as a content script inside the
// current page
// function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({ color }) => {
//         document.body.style.backgroundColor = color;
//     });
// }

function setPageBackgroundText() {
    chrome.storage.sync.get("url", ({ url }) => {
        textArea.innerText = url;
    });
};