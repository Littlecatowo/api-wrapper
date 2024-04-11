設定流程 第一版

編輯：浪貓(xLittlecatTw)

# CommonJS
    1. 在資料夾(api-wrapper)內或外 創建一個 main.js
    -> 注意創建的位置，將影響 2. 的 import路徑

    2. import 所需 Class

        A. 創建在資料夾內 
            -> 如果日後 api-wrapper 有更新，自己寫的檔案會被覆蓋掉

        \\\
            const { ExpTechApi, ExpTechWebsocket } = require("./dist/index.js");
            const { ExpTechApi, ExpTechWebsocket } = require("./dist/index.min.js");
        \\\

        B. 創建在資料夾外 (Recommand) 
            -> 如果日後 api-wrapper 有更新，不會覆蓋掉自己寫的檔案

        \\\
            const { ExpTechApi, ExpTechWebsocket } = require("./api-wrapper/dist/index.js");
            const { ExpTechApi, ExpTechWebsocket } = require("./api-wrapper/dist/index.min.js");
        \\\

    3. 設定 api & websocket
        說明
            api 
                -> key 從 ExpTech 網頁取得的 key

            websocket
                ->    type    不需修改  (必填)
                ->    key     從 ExpTech 網頁取得的 key (必填)
                ->    service 訂閱的服務項目 (必填)
                        可訂閱項目
                        1.    "trem.rts"
                        2.    "trem.rtw"
                        3.    "websocket.eew"
                        4.    "trem.eew"
                        5.    "websocket.report"
                        6.    "websocket.tsunami"
                        7.    "trem.intensity"
                        8.    "cwa.intensity"
                ->    config? 取得特定一個或數個測站的波形圖 (選填)

        例子  
            \\\
                const api = new ExpTechApi(key);
                const ws = new ExpTechWebsocket({
                    type: "start"
                    key: 你的key
                    service: [訂閱項目]
                    config?: {
                        "trem.rtw": number[測站ID放這裡] // 測站 ID
                    }
                });

                // 地震報告列表
                api.getReportList().then(console.log)

                // 地震速報
                ws.on(WebSocketEvent.Eew, console.log);
            \\\

#TypeScript
    待更新

#ESModule
    待更新