/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
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
export enum EewSource {
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
  Trem = "trem",
}

/**
 * 地震速報狀態
 */
export enum EewStatus {
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
  Test = 3,
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

export const Intensity = [
  { value: 0, label: "0", text: "０級" },
  { value: 1, label: "1", text: "１級" },
  { value: 2, label: "2", text: "２級" },
  { value: 3, label: "3", text: "３級" },
  { value: 4, label: "4", text: "４級" },
  { value: 5, label: "5-", text: "５弱" },
  { value: 6, label: "5+", text: "５強" },
  { value: 7, label: "6-", text: "６弱" },
  { value: 8, label: "6+", text: "６強" },
  { value: 9, label: "7", text: "７級" },
] as const;

export class ExpTechApi extends EventEmitter {
  key: string;
  route: Route;
  headers: HeadersInit;

  constructor(key?: string, defaultRequestHeaders?: HeadersInit) {
    super();
    this.key = key ?? "";
    this.headers = defaultRequestHeaders ?? {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    this.route = new Route({ key: this.key });
  }

  setApiKey(apiKey: string): this {
    this.key = apiKey;
    this.route.key = apiKey;
    return this;
  }

  /**
   * Inner get request wrapper
   * @param {string} url
   * @returns {Promise<any>}
   */
  async #get(url: string): Promise<Response> {
    const request = new Request(url, {
      method: "GET",
      cache: "default",
      headers: {
        ...this.headers,
        Accept: "application/json",
      },
    });
    const res = await fetch(request);

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    return res;
  }

  /**
   * Inner post request wrapper
   * @param {string} url
   * @returns {Promise<any>}
   */
  async #post(url: string, body: BodyInit): Promise<Response> {
    const request = new Request(url, {
      method: "POST",
      cache: "default",
      headers: {
        ...this.headers,
        Accept: "application/json",
      },
      body
    });
    const res = await fetch(request);

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    return res;
  }

  /**
   * 獲取測站資料
   * @returns {Promise<Record<string, Station>>} 測站資料
   */
  async getStations(): Promise<Record<string, Station>> {
    const url = this.route.station();
    return (await this.#get(url)).json();
  }

  /**
   * 獲取地震報告列表
   * @param {number} [limit]
   * @returns {Promise<PartialReport[]>}
   */
  async getReportList(limit?: number): Promise<PartialReport[]> {
    const url = this.route.earthquakeReportList(limit);
    const data = await (await this.#get(url)).json();
    for (const report of data) report.no = +report.id.split("-")[0];
    return data;
  }

  /**
   * 獲取指定地震報告
   * @param {string} id 地震報告 ID
   * @returns {Promise<Report>}
   */
  async getReport(id: string): Promise<Report> {
    const url = this.route.earthquakeReport(`${id}`);

    const data = await (await this.#get(url)).json();
    data.no = +data.id.split("-")[0];
    data.int = Object.keys(data.list).reduce(
      (acc, key) => (data.list[key].int > acc ? data.list[key].int : acc),
      0
    );
    data.list = Object.keys(data.list)
      .map((key) => ({
        area: key,
        int: data.list[key].int,
        stations: Object.keys(data.list[key].town)
          .map((k) => ({
            ...data.list[key].town[k],
            station: k,
          }))
          .sort((a, b) => b.int - a.int),
      }))
      .sort((a, b) => b.int - a.int);

    return data;
  }

  /**
   * 獲取即時地動資料
   * @param {number} [time] 時間
   * @returns {Promise<Rts>}
   */
  async getRts(time?: number): Promise<Rts> {
    const url = Route.rts(time ? `${time}` : "");
    return (await this.#get(url)).json();
  }

  /**
   * 獲取即時地動圖片資料
   * @param {number} [time] 時間
   * @returns {Promise<Buffer>}
   */
  async getRtsImage(time?: number): Promise<ArrayBuffer> {
    const url = this.route.rtsImage(time ? `${time}` : "");
    return (await this.#get(url)).arrayBuffer();
  }

  /**
   * 獲取地震速報資料
   * @param {number} [time] 時間
   * @param {EewSource} [type] 地震速報來源機關
   * @returns {Promise<EewType[]>}
   */
  async getEew(time?: number, type?: EewSource): Promise<EewType[]> {
    const url = Route.eew(time ? `${time}` : "");
    return (await this.#get(url)).json();
  }

  /**
   * 獲取身份驗證代碼
   * @param {AuthenticationDetail} options 身份驗證資訊
   * @returns {Promise<string>} 身份驗證 Token
   */
  async getAuthToken(options: AuthenticationDetail, route: (1 | 2) = 1): Promise<string> {
    const url = this.route.login(route);
    const body = JSON.stringify({
      email: options.email,
      pass: options.password,
      name: options.name
    });
    return (await this.#post(url, body)).text();
  }
}
