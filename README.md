# Versoly JS Client


## Install

```bash
pnpm install versoly-js-client
```

## Usage

```ts
import { VersolyClient } from 'versoly-js-client';

let versoly = new VersolyClient({ token: 'f77e6400-0814-4582-9185-03dd13f7ef8a' });
const sites = await versoly.sites.list();
// {
//   data: [
//     {
//       id: 'a813080b-2e29-4a1e-838f-dc510e49290a',
//       name: 'exceed-kindly-1706940885',
//       workspaceId: 'a813080b-2e29-4a1e-838f-dc510e49290a',
//       createdAt: '2024-02-03T06:14:45.000Z',
//       updatedAt: '2024-10-04T04:19:15.966Z'
//     },
//   ]
// }
```