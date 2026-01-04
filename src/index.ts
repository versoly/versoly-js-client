import {
  Assets,
  Collections,
  Components,
  Forms,
  FormSubmissions,
  Items,
  Pages,
  PublicFiles,
  Redirects,
  Sites,
  Webhooks,
} from './client/sdk.gen';
import { client } from './client/client.gen';

export * from './client/types.gen';

type Config = {
  url?: string;
  token: string;
};

export class VersolyClient {
  constructor(config: Config) {
    client.setConfig({
      baseUrl: config.url,
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    let requestMadeAt: number[] = [];

    client.interceptors.request.use(async (request) => {
      requestMadeAt = requestMadeAt.filter((time) => Date.now() - time < 1000);
      requestMadeAt.push(Date.now());

      if (requestMadeAt.length > 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        requestMadeAt = [];
      }

      return request;
    });

    client.interceptors.request.use(async (request) => {
      const headers = request.headers as Headers;

      if (request.body && headers.get('Content-Type') === 'multipart/form-data') {
        // @ts-ignore
        const formData = request.body as FormData;
        const size = Array.from(formData.entries()).reduce((acc, [_key, value]) => {
          if (value instanceof Blob) {
            acc += value.size;
          }

          return acc;
        }, 0);

        if (size > 1000000) {
          throw new Error('File size is too big');
        }
      }

      return request;
    });
  }

  assets = Assets;
  collections = Collections;
  components = Components;
  forms = Forms;
  formSubmissions = FormSubmissions;
  items = Items;
  pages = Pages;
  publicFiles = PublicFiles;
  redirects = Redirects;
  sites = Sites;
  webhooks = Webhooks;
}
