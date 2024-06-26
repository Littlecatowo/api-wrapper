import { EventEmitter } from "events";
import Route from "./route";
/**
 * 測站資訊
 */
export interface StationInfo {
    /**
     * 測站郵遞區號 (地區編號)
     */
    code: number;
    /**
     * 測站經度
     */
    lon: number;
    /**
     * 測站緯度
     */
    lat: number;
    /**
     * 測站安裝時間
     */
    time: string;
}
/**
 * TREM 測站
 */
export interface Station {
    /**
     * 測站種類
     */
    net: string;
    /**
     * 測站資訊
     */
    info: StationInfo[];
    /**
     * 測站是否運作
     */
    work: boolean;
}
/**
 * 部分地震報告
 */
export interface PartialReport {
    /**
     * 地震報告 ID
     */
    id: string;
    /**
     * 地震震央經度
     */
    lon: number;
    /**
     * 地震震央緯度
     */
    lat: number;
    /**
     * 地震位置敘述
     */
    loc: string;
    /**
     * 地震深度
     */
    depth: number;
    /**
     * 地震芮氏規模
     */
    mag: number;
    /**
     * 地震觀測最大震度
     */
    int: number;
    /**
     * 地震發生時間
     */
    time: number;
    /**
     * 地震報告編號
     */
    no: number;
    /**
     * 地震報告完整性
     */
    md5: string;
}
/**
 * 測站觀測資料
 */
export interface StationIntensity {
    /**
     * 測站名稱
     */
    station: string;
    /**
     * 測站經度
     */
    lon: number;
    /**
     * 測站緯度
     */
    lat: number;
    /**
     * 測站最大觀測震度
     */
    int: number;
}
/**
 * 區域觀測資料
 */
export interface AreaIntensity {
    /**
     * 區域名稱
     */
    area: string;
    /**
     * 區域最大觀測震度
     */
    int: number;
    /**
     * 區域內測站觀測資料
     */
    stations: StationIntensity[];
}
/**
 * 地震報告
 */
export interface Report extends Omit<PartialReport, "md5"> {
    /**
     * 各地觀測最大震度
     */
    list: AreaIntensity[];
}
/**
 * 測站地動資料
 */
export interface RtsStation {
    /**
     * 地動加速度
     */
    pga: number;
    /**
     * 地動速度
     */
    pgv: number;
    /**
     * 即時震度
     */
    i: number;
    /**
     * 衰減震度
     */
    I: number;
    /**
     * 測站是否觸發
     */
    alert: boolean;
}
export type Box = Record<string, number>;
export interface IntensityListing {
    code: string;
    area: string;
    station: string;
    i: number;
}
/**
 * 地動資料
 */
export interface Rts {
    /**
     * 測站地動資料
     */
    station: Record<string, RtsStation>;
    /**
     * 地動區塊
     */
    box: Box;
    /**
     * 資料時間
     */
    time: number;
    /**
     * 震度列表
     */
    int: IntensityListing[];
    replay?: boolean;
}
/**
 * 測站波形資料
 */
export interface Rtw {
    X: number[];
    Y: number[];
    Z: number[];
    boot: boolean;
    id: number;
    time: number;
    type: "rtw";
}
/**
 * 地震速報來源機關
 */
export declare enum EewSource {
    /**
     * 交通部中央氣象署
     * @link https://www.cwa.gov.tw
     */
    Cwa = "cwa",
    /**
     * 기상청 날씨누리
     * @link https://www.kma.go.kr
     */
    Kma = "kma",
    /**
     * 気象庁
     * @link https://www.jma.go.jp
     */
    Jma = "jma",
    /**
     * 防災科研
     * @link https://www.bosai.go.jp
     */
    Nied = "nied",
    /**
     * 四川省地震局
     * @link https://www.scdzj.gov.cn
     */
    Scdzj = "scdzj",
    /**
     * TREM 臺灣即時地震監測
     * @link https://exptech.com.tw/
     */
    Trem = "trem"
}
/**
 * 地震速報狀態
 */
export declare enum EewStatus {
    /**
     * 注意報
     */
    Warn = 0,
    /**
     * 警報
     */
    Alert = 1,
    /**
     * 取消報
     */
    Cancel = 2,
    /**
     * 測試報
     */
    Test = 3
}
type AuthoritySource = EewSource.Cwa | EewSource.Jma | EewSource.Nied | EewSource.Kma | EewSource.Scdzj;
export type Eew = {
    type: "eew";
    /**
     * 地震速報來源機關
     */
    author: AuthoritySource;
    /**
     * 地震速報 ID
     */
    id: string;
    /**
     * 地震速報報號
     */
    serial: number;
    /**
     * 地震速報狀態
     */
    status: EewStatus;
    /**
     * 地震速報是否為最終報
     */
    final: 1 | 0;
    /**
     * 地震速報參數
     */
    eq: {
        /**
         * 地震速報時間
         */
        time: number;
        /**
         * 地震震央預估經度
         */
        lon: number;
        /**
         * 地震震央預估緯度
         */
        lat: number;
        /**
         * 地震預估深度
         */
        depth: number;
        /**
         * 地震預估芮氏規模
         */
        mag: number;
        /**
         * 地震預估位置
         */
        loc: string;
        /**
         * 地震預估最大震度
         */
        max: number;
    };
};
export type TremEew = {
    type: "eew";
    /**
     * 地震速報來源機關
     */
    author: EewSource.Trem;
    /**
     * 地震速報 ID
     */
    id: string;
    /**
     * 地震速報報號
     */
    serial: number;
    /**
     * 地震速報狀態
     */
    status: EewStatus;
    /**
     * 是否有震源資料
     */
    detail: 1 | 0;
    /**
     * 地震速報是否為最終報
     */
    final: 1 | 0;
    /**
     * 地震速報參數
     */
    eq: {
        /**
         * 地震速報時間
         */
        time: number;
        /**
         * 地震震央預估經度
         */
        lon: number;
        /**
         * 地震震央預估緯度
         */
        lat: number;
        /**
         * 地震預估深度
         */
        depth: number;
        /**
         * 地震預估芮氏規模
         */
        mag: number;
        /**
         * 地震預估位置
         */
        loc: string;
        /**
         * 地震預估最大震度
         */
        max: number;
    };
};
export type EewType = Eew | TremEew;
/**
 * 校時
 */
export type Ntp = {
    type: "ntp";
    /**
     * 伺服器時間
     */
    time: number;
    /**
     * 校時板本
     */
    version: number;
};
/**
 * 身份驗證資訊
 */
export interface AuthenticationDetail {
    /**
     * 身份驗證電子郵件
     */
    email: string;
    /**
     * 身份驗證密碼
     */
    password: string;
    /**
     * 身份驗證名稱
     */
    name: string;
}
export declare const Intensity: readonly [{
    readonly value: 0;
    readonly label: "0";
    readonly text: "０級";
}, {
    readonly value: 1;
    readonly label: "1";
    readonly text: "１級";
}, {
    readonly value: 2;
    readonly label: "2";
    readonly text: "２級";
}, {
    readonly value: 3;
    readonly label: "3";
    readonly text: "３級";
}, {
    readonly value: 4;
    readonly label: "4";
    readonly text: "４級";
}, {
    readonly value: 5;
    readonly label: "5-";
    readonly text: "５弱";
}, {
    readonly value: 6;
    readonly label: "5+";
    readonly text: "５強";
}, {
    readonly value: 7;
    readonly label: "6-";
    readonly text: "６弱";
}, {
    readonly value: 8;
    readonly label: "6+";
    readonly text: "６強";
}, {
    readonly value: 9;
    readonly label: "7";
    readonly text: "７級";
}];
export declare class ExpTechApi extends EventEmitter {
    #private;
    key: string;
    route: Route;
    headers: HeadersInit;
    constructor(key?: string, defaultRequestHeaders?: HeadersInit);
    setApiKey(apiKey: string): this;
    /**
     * 獲取測站資料
     * @returns {Promise<Record<string, Station>>} 測站資料
     */
    getStations(): Promise<Record<string, Station>>;
    /**
     * 獲取地震報告列表
     * @param {number} [limit]
     * @returns {Promise<PartialReport[]>}
     */
    getReportList(limit?: number): Promise<PartialReport[]>;
    /**
     * 獲取指定地震報告
     * @param {string} id 地震報告 ID
     * @returns {Promise<Report>}
     */
    getReport(id: string): Promise<Report>;
    /**
     * 獲取即時地動資料
     * @param {number} [time] 時間
     * @returns {Promise<Rts>}
     */
    getRts(time?: number): Promise<Rts>;
    /**
     * 獲取即時地動圖片資料
     * @param {number} [time] 時間
     * @returns {Promise<Buffer>}
     */
    getRtsImage(time?: number): Promise<ArrayBuffer>;
    /**
     * 獲取地震速報資料
     * @param {number} [time] 時間
     * @param {EewSource} [type] 地震速報來源機關
     * @returns {Promise<EewType[]>}
     */
    getEew(time?: number, type?: EewSource): Promise<EewType[]>;
    /**
     * 獲取身份驗證代碼
     * @param {AuthenticationDetail} options 身份驗證資訊
     * @returns {Promise<string>} 身份驗證 Token
     */
    getAuthToken(options: AuthenticationDetail, route?: (1 | 2)): Promise<string>;
}
export {};
