#

設定流程 第一版

ReadMe.md編輯：浪貓(xLittlecatTw)

程式編寫：Kamiya

#

# CommonJS
### **1. 在資料夾(api-wrapper)內或外 創建一個 main.js**
* 注意創建的位置，將影響 **第二部分** 的 import路徑

### **2. import 所需 Class**

A. *創建在資料夾內*

* 如果日後 api-wrapper 有更新，**自己寫的檔案會被覆蓋掉**

    ```js
        const { ExpTechApi, ExpTechWebsocket } = require("./dist/index.js");
        const { ExpTechApi, ExpTechWebsocket } = require("./dist/index.min.js");
    ```

B. *創建在資料夾外 (Recommand)*

* 如果日後 api-wrapper 有更新，**不會覆蓋掉自己寫的檔案**

    ```js
        const { ExpTechApi, ExpTechWebsocket } = require("./api-wrapper/dist/index.js");
        const { ExpTechApi, ExpTechWebsocket } = require("./api-wrapper/dist/index.min.js");
    ```

### **3. 設定 api & websocket**
        
* 說明
        
    1. *api* 
            
        * key 從 ExpTech 網頁取得的 key

    2. *websocket*
        *    key     *從 ExpTech 網頁取得的 key (必填)*
        *    service *訂閱的服務項目 (必填)*
             
                #### **可訂閱項目**
                1.    trem.rts
                2.    trem.rtw
                3.    websocket.eew
                4.    trem.eew
                5.    websocket.report
                6.    websocket.tsunami
                7.    trem.intensity
                8.    cwa.intensity
                
        *    config? 取得特定一個或數個測站的波形圖 (選填)

### **SupportedService & WebSocketEvent**

* *SupportedService*

        * 即時地動資料
        SupportedService["RealtimeStation"] = "trem.rts";
        
        * 即時地動波形圖資料
        SupportedService["RealtimeWave"] = "trem.rtw";
        
        * 地震速報資料
        SupportedService["Eew"] = "websocket.eew";
        
        * TREM 地震速報資料
        SupportedService["TremEew"] = "trem.eew";
        
        * 中央氣象署地震報告資料
        SupportedService["Report"] = "websocket.report";
        
        * 中央氣象署海嘯資訊資料
        SupportedService["Tsunami"] = "websocket.tsunami";
        
        * 中央氣象署震度速報資料
        SupportedService["CwaIntensity"] = "cwa.intensity";
        
        * TREM 震度速報資料
        SupportedService["TremIntensity"] = "trem.intensity";

* *WebSocketEvent*
    
        * 地震速報 聆聽事件
        WebSocketEvent["Eew"] = "eew";
        
        * 地震報告 聆聽事件
        WebSocketEvent["Report"] = "report";
        
        * 即時地動 聆聽事件
        WebSocketEvent["Rts"] = "rts";
        
        * 即時地動波形圖資料 聆聽事件
        WebSocketEvent["Rtw"] = "rtw";

### **實作例子**  
```js
const { ExpTechApi, ExpTechWebsocket, SupportedService, WebSocketEvent } = require("./api-wrapper/dist/index.js");
/* or */
const { ExpTechApi, ExpTechWebsocket, SupportedService, WebSocketEvent } = require("./api-wrapper/dist/index.min.js");

const api = new ExpTechApi();
const key = api.getAuthToken({  email: "ExpTech 註冊的信箱", 
                                password: "ExpTech 註冊的密碼", 
                                name:"名稱/軟體名稱/軟體版本號/裝置版本號"});

api.setApiKey(key);
const ws = new ExpTechWebsocket({
    key: key,
    service: [SupportedService.RealtimeStation, SupportedService.RealtimeWave],
    config: {
        [SupportedService.RealtimeWave]: [
        11366940, 6024428, 13898616, 4812424, 11339620, 6125804,
        ],
    },
});

// 地震報告列表
api.getReportList().then(console.log)

// 地震速報
ws.on(WebSocketEvent.Eew, console.log);
```

# TypeScript
```ts
import { ExpTechApi } from "./api-wrapper/src/api.ts";
import { ExpTechWebsocket, SupportedService, WebSocketEvent } from "./api-wrapper/src/websocket.ts";

const api = new ExpTechApi();

const key = await api.getAuthToken({
    email: "ExpTech 註冊的信箱", 
    password: "ExpTech 註冊的密碼", 
    name:"名稱/軟體名稱/軟體版本號/裝置版本號"
})

api.setApiKey(key);

const ws = new ExpTechWebsocket({
    key: key,
    service: [SupportedService.RealtimeStation, SupportedService.RealtimeWave],
    config: {
        [SupportedService.RealtimeWave]: [
        11366940, 6024428, 13898616, 4812424, 11339620, 6125804,
        ],
    },
})

// 地震報告列表
api.getReportList().then(console.log)

// 地震速報
ws.on(WebSocketEvent.Eew, console.log);
```

# ESModule
* 待更新