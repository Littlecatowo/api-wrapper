# api-wrapper

This is a simple ExpTech api wrapper module written in TypeScript.

## Installation

1. Clone this repository or use `npm install`.

```bash
npm install git+https://github.com/ExpTechTW/api-wrapper.git
```

> [!NOTE]
> This module is regularly updated, if you find a bug that hasn't been addressed, please [file an issue](https://github.com/ExpTechTW/api-wrapper/issues/new) 

2. Import and use the api-wrapper

This api wrapper provides two main classes `ExpTechApi` and `ExpTechWebsocket`.

```ts
import { ExpTechApi } from "@ExpTechTW/api-wrapper";

const api = new ExpTechApi(/* api key here */);
```

You can also change the api key later using `setApiKey(key)`

```ts
api.setApiKey(/* Your new key here */)
```

API calls can be called by invoking request methods

```ts
api
  .getReportList(20)
  .then(console.log);

/*
Returns PartialReport[]
[
  {
    id: "113000-2024-0425-084819",
    lat: 23.71,
    lon: 121.59,
    depth: 7.2,
    loc: "花蓮縣政府南方  31.3  公里 (位於花蓮縣近海)",
    mag: 3.9,
    time: 1714006099000,
    trem: 1714006105548,
    int: 3,
    md5: "56098CD9C543017FEFC5FDE27391E7AF"
  },
  ...
]
*/
```
