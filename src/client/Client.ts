import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AssetsService } from './services.gen';
import { CollectionsService } from './services.gen';
import { ComponentsService } from './services.gen';
import { FormsService } from './services.gen';
import { FormSubmissionsService } from './services.gen';
import { ItemsService } from './services.gen';
import { PagesService } from './services.gen';
import { SitesService } from './services.gen';
import { WebhooksService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class Client {
  public readonly assets: AssetsService;
  public readonly collections: CollectionsService;
  public readonly components: ComponentsService;
  public readonly forms: FormsService;
  public readonly formSubmissions: FormSubmissionsService;
  public readonly items: ItemsService;
  public readonly pages: PagesService;
  public readonly sites: SitesService;
  public readonly webhooks: WebhooksService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'https://api.versoly.com/v1',
      VERSION: config?.VERSION ?? '1.0.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.assets = new AssetsService(this.request);
    this.collections = new CollectionsService(this.request);
    this.components = new ComponentsService(this.request);
    this.forms = new FormsService(this.request);
    this.formSubmissions = new FormSubmissionsService(this.request);
    this.items = new ItemsService(this.request);
    this.pages = new PagesService(this.request);
    this.sites = new SitesService(this.request);
    this.webhooks = new WebhooksService(this.request);
  }
}
