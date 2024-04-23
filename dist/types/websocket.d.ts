import type { Eew, Ntp, Report, Rts, Rtw } from "./api";
import { EventEmitter } from "events";
export declare enum WebSocketEvent {
    Eew = "eew",
    Info = "info",
    Ntp = "ntp",
    Report = "report",
    Rts = "rts",
    Rtw = "rtw",
    Verify = "verify",
    Close = "close",
    Error = "error"
}
export declare enum SupportedService {
    /**
     * 即時地動資料
     */
    RealtimeStation = "trem.rts",
    /**
     * 即時地動波形圖資料
     */
    RealtimeWave = "trem.rtw",
    /**
     * 地震速報資料
     */
    Eew = "websocket.eew",
    /**
     * TREM 地震速報資料
     */
    TremEew = "trem.eew",
    /**
     * 中央氣象署地震報告資料
     */
    Report = "websocket.report",
    /**
     * 中央氣象署海嘯資訊資料
     */
    Tsunami = "websocket.tsunami",
    /**
     * 中央氣象署震度速報資料
     */
    CwaIntensity = "cwa.intensity",
    /**
     * TREM 震度速報資料
     */
    TremIntensity = "trem.intensity"
}
export interface WebSocketConnectionConfig {
    type: "start";
    key: string;
    service: SupportedService[];
    config?: Partial<{
        [SupportedService.RealtimeWave]: number[];
    }>;
}
export type WebSocketAuthenticationInfo = {
    code: 200;
    list: SupportedService[];
    failed: SupportedService[];
} | {
    code: 400 | 401 | 403 | 429;
    message: string;
};
export declare class ExpTechWebsocket extends EventEmitter {
    #private;
    ws: WebSocket;
    websocketConfig: WebSocketConnectionConfig;
    constructor(websocketConfig: Omit<WebSocketConnectionConfig, "type">);
    updateConfig(websocketConfig: Omit<WebSocketConnectionConfig, "type">): void;
}
export declare interface ExpTechWebsocket extends EventEmitter {
    /**
     * 身份驗證資訊
     * @param {WebSocketEvent.Info} event info
     * @param {(info: WebSocketAuthenticationInfo) => void} listener
     */
    on(event: WebSocketEvent.Info, listener: (info: WebSocketAuthenticationInfo) => void): this;
    /**
     * 地動資料
     * @param {WebSocketEvent.Rts} event rts
     * @param {(rts: Rts) => void} listener
     */
    on(event: WebSocketEvent.Rts, listener: (rts: Rts) => void): this;
    /**
     * 測站波形資料
     * @param {WebSocketEvent.Rtw} event rtw
     * @param {(rtw: Rtw) => void} listener
     */
    on(event: WebSocketEvent.Rtw, listener: (rtw: Rtw) => void): this;
    /**
     * 地震速報資料
     * @param {WebSocketEvent.Eew} event eew
     * @param {(eew: Eew) => void} listener
     */
    on(event: WebSocketEvent.Eew, listener: (eew: Eew) => void): this;
    /**
     * 地震速報資料
     * @param {WebSocketEvent.Ntp} event ntp
     * @param {(ntp: Ntp) => void} listener
     */
    on(event: WebSocketEvent.Ntp, listener: (ntp: Ntp) => void): this;
    /**
     * 地震報告資料
     * @param {WebSocketEvent.Report} event ntp
     * @param {(report: Report) => void} listener
     */
    on(event: WebSocketEvent.Report, listener: (report: Report) => void): this;
    /**
     * WebSocket 連線關閉
     * @param {WebSocketEvent.Close} event close
     * @param {(ev: CloseEvent) => void} listener
     */
    on(event: WebSocketEvent.Close, listener: (ev: CloseEvent) => void): this;
    /**
     * WebSocket 錯誤
     * @param {WebSocketEvent.Error} event close
     * @param {(error: unknown) => void} listener
     */
    on(event: WebSocketEvent.Error, listener: (error: unknown) => void): this;
}
