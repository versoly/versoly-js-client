import { describe, it } from 'vitest';
import { VersolyClient } from '../src';

describe('index', () => {
  let versoly = new VersolyClient({ token: 'f77e6400-0814-4582-9185-03dd13f7ef8a' });

  describe('myPackage', () => {
    it('should return a string containing the message', async () => {
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.list();
      await versoly.sites.get({ siteId: 'a813080b-2e29-4a1e-838f-dc510e49290a' });
      const r = await versoly.sites.list();
      console.log(r);
    });
  });
});
