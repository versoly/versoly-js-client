import { Client } from './client/Client';
import { Interceptors } from './client/core/OpenAPI';

type Config = {
  token: string;
};

export class VersolyClient extends Client {
  constructor(config: Config) {
    let requestMadeAt: number[] = [];

    super({
      BASE: 'http://localhost:8080',
      HEADERS: {
        Authorization: `Bearer ${config.token}`,
      },
      interceptors: {
        request: {
          use: () => {},
          eject: async (request) => {
            console.log(request);
          },
          _fns: [
            async (request) => {
              requestMadeAt = requestMadeAt.filter((time) => Date.now() - time < 1000);
              requestMadeAt.push(Date.now());

              if (requestMadeAt.length >= 3) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }

              return request;
            },
            async (request) => {
              // @ts-ignore
              if (request.headers?.['Content-Type'] === 'multipart/form-data') {
                const formData = request.body as FormData;
                const size = Array.from(formData.entries()).reduce((acc, [key, value]) => {
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
            },
          ],
        },
        // request: new Interceptors(),
        response: new Interceptors(),
      },
    });
  }
}
