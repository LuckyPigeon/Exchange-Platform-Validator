document.addEventListener('DOMContentLoaded', async() => {
    let whiteList = { // 交易所白名單
        "binance": "binance.com",
        "ace": "ace.io",
        "crypto": "crypto.com",
        "pancakeswap": "pancakeswap.finance",
        "sushi": "sushi.com",
        "raydium.io": "raydium.io",
        "uniswap": "uniswap.org",
        "apeswap": "apeswap.finance",
        "max": "max.maicoin.com",
        "coinbase": "coinbase.com",
        "okex": "okex.com",
        "pionex": "pionex.com",
        "proex": "proex.io",
        "ftx": "ftx.com",
        "coinmarketcap": "coinmarketcap.com",
        "coingecko": "coingecko.com",
        "kraken": "kraken.com",
        "whalefin": "whalefin.com",
        "kucoin": "kucoin.com",
        "compound": "compound.finance",
        "okcoin": "okcoin.com",
        "mexc": "mexc.com",
        "blockchain": "blockchain.com",
        "lbank": "lbank.info",
        "upbit": "upbit.com",
        "liquid": "liquid.com",
        "poloniex": "poloniex.com",
        "okx": "okx.com",
        "bithumb": "bithumb.com",
        "bitstamp": "bitstamp.net",
        "anchorprotocol": "anchorprotocol.com",
        "coincheck": "coincheck.com",
        "gemini": "gemini.com",
        "bitflyer": "bitflyer.com",
        "bybit": "bybit.com",
        "bitfinex": "bitfinex.com",
        "gate": "gate.io",
        "huobi": "huobi.com",
    };
    let isExchange = false; // 是否為交易所
    let message = document.getElementById("message");

    try {
        let [cur_tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // 抓取使用者當前頁面
        let url = cur_tab.url.split("://")[1]; // 去除冗餘路徑
        url = url.split("/")[0];
        url = url.split(".");

        let keyword;
        let isPro = url[0] === "pro" ? true : false; // 檢查是否為 pro 版本

        keyword = url[0] === "www" || "pro" ? url[1] : url[0]; // 取得 keyword，釣魚最喜歡從這下手
        url = url[0] === "www" || "pro" ? url[1] + "." + url[2] : url[0] + "." + url[1]; // 組合 keyword + 頂級網域，有錢釣魚會購買頂級網域

        for (let whiteKey in whiteList) {
            if (keyword.includes(whiteKey)) { // 檢查當前網址是否有交易所關鍵字，若有，使用者大概已經進了交易所
                // console.log(url);
                // console.log(whiteList[whiteKey]);
                isExchange = true;

                if (url === whiteList[whiteKey]) { // 如果 keyword + 頂級網域 與白名單相符，則為正常交易所
                    message.style.color = "green";
                    message.innerText = "這個交易所已通過驗證";
                    await chrome.action.setIcon({ path: "./images/checked16.png" });
                    break;
                } else { // 若否，則為釣魚網站
                    let validateUrl = "https://" + (isPro === true ? "pro." : "") + whiteList[whiteKey];
                    // console.log(validateUrl);
                    message.style.color = "red";
                    message.innerHTML = `<p>這間交易所不安全，您是否在尋找\n<a href=${validateUrl} target="_blank" rel="noreferrer noopener"><strong>${validateUrl}</strong></a></p>`;
                    await chrome.action.setIcon({ path: "./images/warning16.png" });
                    break;
                }
            }
        }

        if (isExchange === false) { // 若當前網址沒有交易所關鍵字，則不是交易所
            message.style.color = "black";
            message.innerText = "交易所認證功能已啟用，等待進入交易所";
            await chrome.action.setIcon({ path: "./images/checked16.png" });
        }
    } catch (err) {
        console.error(err);
    }
});