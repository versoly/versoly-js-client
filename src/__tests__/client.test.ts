import { describe, test, expect } from 'vitest';
import { VersolyClient } from '../index';
import { randomUUID } from 'crypto';

type VersolySite = Exclude<NonNullable<Awaited<ReturnType<typeof VersolyClient.prototype.sites.get>>>, undefined>;

const config = {
  token: 'f77e6400-0814-4582-9185-03dd13f7ef8a',
  url: 'http://localhost:8080',
};

const exampleVariables = {
  siteId: 'a813080b-2e29-4a1e-838f-dc510e49290a',
  collectionId: '7ef6204a-73c6-46cc-baf4-2dabed1d91b9',
  itemId: 'da2b604b-7328-4175-9dd1-ba164d323501',
};

const { siteId, collectionId, itemId } = exampleVariables;

describe('index', async () => {
  let client = new VersolyClient({ token: config.token, url: config.url });

  test('list sites', async () => {
    const { data } = await client.sites.list();
    expect(data?.data.length).toBeGreaterThan(0);
  });

  test('get site', async () => {
    const { data: site, error } = await client.sites.get({ path: { siteId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(site.id).toBe(siteId);
  });

  test('list pages', async () => {
    const { data: pages, error } = await client.pages.list({ path: { siteId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(pages.data.length).toBeGreaterThan(0);
  });

  test('get page', async () => {
    const { data: page, error } = await client.pages.get({ path: { siteId, pageId: siteId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(page.id).toBe(siteId);
  });

  test('get page 404', async () => {
    const { data: page, error } = await client.pages.get({ path: { siteId, pageId: randomUUID() } });

    expect(error?.status).toBe(404);
  });

  test('list collections', async () => {
    const { data: collections, error } = await client.collections.list({ path: { siteId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(collections.data.length).toBeGreaterThan(0);
  });

  test('get collection', async () => {
    const { data: collection, error } = await client.collections.get({ path: { collectionId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(collection.id).toBe(collectionId);
  });

  test('list items', async () => {
    const { data: items, error } = await client.items.list({ path: { collectionId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(items.data.length).toBeGreaterThan(0);
  });

  test('get item', async () => {
    const { data: item, error } = await client.items.get({ path: { collectionId, itemId } });

    if (error) {
      console.log('Error:', error);
      return;
    }

    expect(item.id).toBe(itemId);
  });

  // test('update item', async () => {
  //   // const obj = await client.items.update({ collectionId, itemId, fieldData: { title: 'Updated Title' } });
  //   const obj = await client.items.update({
  //     path: { collectionId, itemId },
  //     body: { fieldData: { title: 'Updated Title' } },
  //   });

  //   expect(obj?.id).toBe(itemId);
  // });
});
