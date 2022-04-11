let whiteList = {
    "binance": "https://binance.com/",
    "ace": "https://ace.io/",
    "crypto": "https://crypto.com/",
    "pancakeswap": "https://pancakeswap.finance/",
    "sushi": "https://sushi.com/",
    "raydium": "https://raydium.io/",
    "uniswap": "https://uniswap.org/",
    "apeswap": "https://apeswap.finance/",
    "max": "https://max.maicoin.com/",
    "coinbase": "https://www.coinbase.com/",
    "okex": "https://www.okex.com",
    "pionex": "https://www.pionex.com/",
    "proex": "https://www.proex.io/",
    "ftx": "https://ftx.com/"
};
let flag = false;
// let message = document.getElementById("message");

try {
    let [cur_tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let keyword = cur_tab.url.split("://")[1];
    keyword = keyword.split("/")[0];
    keyword = keyword.split(".");
    keyword = keyword[0] == "www" ? keyword[1] : keyword[0];

    console.log(keyword);

    for (let name in whiteList) {
        if (keyword.includes(name)) {
            flag = true;

            if (keyword === name) {
                // message.style.color = "green";
                // message.innerText = "這個交易所已通過驗證";
                chrome.action.setIcon({ path: "./images/checked16.png" })
                break;
            } else {
                // message.style.color = "red";
                // message.innerHTML = `<p>這間交易所不安全，您是否在尋找\n<a href=${whiteList[name]} target="_blank" rel="noreferrer noopener"><strong>${whiteList[name]}</strong></a></p>`;
                chrome.action.setIcon({ path: "./images/warning16.png" });
                break;
            }
        }
    }

    if (flag === false) {
        // message.style.color = "black";
        // message.innerText = "交易所認證功能已啟用，等待進入交易所"
        chrome.action.setIcon({ path: "./images/checked16.png" });
    }
} catch (err) {
    console.error(err);
}