interface RouteOptions {
    version?: 1 | 2;
    key?: string;
}
export default class Route {
    version: number;
    key: string;
    constructor(options?: RouteOptions);
    randomServerUrl(): `https://api-${number}.exptech.com.tw`;
    randomLoadBalancerUrl(): `https://lb-${number}.exptech.com.tw`;
    randomServerBaseUrl(): `https://lb-${number}.exptech.com.tw/api/v${number}`;
    randomLoadBalancerBaseUrl(): `https://lb-${number}.exptech.com.tw/api/v${number}`;
    static websocket(): `wss://lb-${number}.exptech.com.tw/websocket`;
    login(server?: number): `https://api-${number}.exptech.com.tw/api/v${number}/et/login`;
    earthquakeReportList(limit?: number): `https://lb-${number}.exptech.com.tw/api/v${number}/eq/report?limit=${number}&key=${string}`;
    earthquakeReport(id: string): `https://lb-${number}.exptech.com.tw/api/v${number}/eq/report/${string}`;
    static rts(timestamp?: string): string;
    rtsImage(timestamp?: string): string;
    static eew(timestamp?: string, type?: string): `${string}/eq/eew/${string}` | `${string}/eq/eew?type=${string}` | `${string}/eq/eew`;
    station(): "https://raw.githubusercontent.com/exptechtw/api/master/resource/station.json";
}
export {};
