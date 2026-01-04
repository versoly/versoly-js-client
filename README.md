# Versoly JS Client

[![npm shield](https://img.shields.io/npm/v/webflow-api)](https://www.npmjs.com/package/webflow-api)

The Versoly JavaScript SDK provides convenient access to the [Versoly Data API](https://versoly.com/developers/api/reference) for apps written in JS/TS.

## Documentation

Explore the [API reference documentation](https://versoly.com/developers/api/reference).

## Install

```shell
pnpm install versoly-js-client
```

## Usage

```typescript
import { VersolyClient } from 'versoly-js-client';

const client = new VersolyClient({ token: 'f77e6400-0814-4582-9185-03dd13f7ef8a' });
const { data: sites, error } = await client.sites.list();
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

const siteId = 'a813080b-2e29-4a1e-838f-dc510e49290a';
const { data: site, error } = await client.sites.get({ path: { siteId } });

if (error) {
  console.log('Error:', error);
  return;
}
console.log(site);
// {
//   id: 'a813080b-2e29-4a1e-838f-dc510e49290a',
//   name: 'exceed-kindly-1706940885',
//   workspaceId: 'a813080b-2e29-4a1e-838f-dc510e49290a',
//   createdAt: '2024-02-03T06:14:45.000Z',
//   updatedAt: '2024-10-04T04:19:15.966Z'
// }
```

## FAQ

### Why do you use path, body and query?

We currently use @hey-api/openapi-ts to autogenerate the API,
it is possible to simplify the function parameters.
However we decided that being explicit will make adding new features easier in the future.
Features such as pagination, ordering and filtering.

### Why do return {data, error} instead of the object

Clean code bases will explicitly handle errors instead of throwing.
Other SDKs recommend wrapping in try/catch, however it can be automated here instead.
Also the errors follow web dev best practices such as having 401 (auth issues), 404 (not found), 409 (conflicts) and 500 (server issues).


## Beta Status

This SDK is in **Preview**, and there may be breaking changes between versions without a major version update.

To ensure a reproducible environment (and minimize risk of breaking changes), we recommend pinning a specific package version.

## Contributing

This SDK is mostly auto-generated, if you have feature request or ideas how to improve it feel free to use issues.

If you want to contribution to the README, those are always very welcome!