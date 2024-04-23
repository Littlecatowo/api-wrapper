interface RouteOptions {
  version?: 1 | 2;
  key?: string;
}

export default class Route {
  version: number;
  key: string;

  constructor(options: RouteOptions = {}) {
    this.version = options.version ?? 3;
    this.key = options.key ?? "";
  }

  randomServerUrl() {
    return `https://api-${Math.ceil(Math.random() * 2)}.exptech.com.tw` as const;
  }

  randomLoadBalancerUrl() {
    return `https://lb-${Math.ceil(Math.random() * 4)}.exptech.com.tw` as const;
  }

  randomServerBaseUrl() {
    return `${this.randomLoadBalancerUrl()}/api/v${this.version}` as const;
  }

  randomLoadBalancerBaseUrl() {
    return `${this.randomLoadBalancerUrl()}/api/v${this.version}` as const;
  }

  static websocket() {
    return `wss://lb-${Math.ceil(Math.random() * 4)}.exptech.com.tw/websocket` as const;
  }

  login(server: number = 1) {
    return `https://api-${server}.exptech.com.tw/api/v${this.version}/et/login` as const;
  }

  earthquakeReportList(limit: number = 50) {
    return `${this.randomServerBaseUrl()}/eq/report?limit=${limit}&key=${this.key}` as const;
  }

  earthquakeReport(id: string) {
    return `${this.randomServerBaseUrl()}/eq/report/${id}` as const;
  }

  rts(timestamp?: string) {
    if (timestamp) {
      return `${this.randomLoadBalancerBaseUrl()}/trem/rts/${timestamp}` as const;
    } else {
      return `${this.randomLoadBalancerBaseUrl()}/trem/rts`;
    }
  }

  rtsImage(timestamp?: string) {
    if (timestamp) {
      return `${this.randomLoadBalancerBaseUrl()}/trem/rts-image/${timestamp}` as const;
    } else {
      return `${this.randomLoadBalancerBaseUrl()}/trem/rts-image`;
    }
  }

  eew(timestamp?: string, type?: string) {
    if (timestamp) {
      if (type) {
        return `${this.randomLoadBalancerBaseUrl()}/eq/eew/${timestamp}?type=${type}` as const;
      } else {
        return `${this.randomLoadBalancerBaseUrl()}/eq/eew/${timestamp}` as const;
      }
    } else {
      if (type) {
        return `${this.randomLoadBalancerBaseUrl()}/eq/eew?type=${type}` as const;
      } else {
        return `${this.randomLoadBalancerBaseUrl()}/eq/eew` as const;
      }
    }
  }

  station() {
    return `${this.randomLoadBalancerUrl()}/file/resource/station.json` as const;
  }
}
