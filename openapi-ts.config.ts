import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  name: 'Client',
  // input: 'http://localhost:8080/documentation/json',
  // input: './versoly.openapi.yaml',
  input: 'https://api.versoly.com/web/v1/documentation/json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client',
  },
  plugins: [
    '@hey-api/client-fetch',
    // '@hey-api/schemas',
    {
      dates: false,
      name: '@hey-api/transformers',
    },
    {
      name: '@hey-api/typescript',
      enums: {
        enabled: false,
      },
    },
    {
      name: '@hey-api/sdk',
      paramsStructure: 'grouped', // flat, grouped
      responseStyle: 'fields', // data, fields
      transformer: false,
      asClass: true,
      methodNameBuilder: (operation) => {
        const requestMethodNames = ['list', 'get', 'create', 'update', 'delete', 'publish'];

        if (!operation.operationId) {
          console.log('error', operation);
          return operation.id;
        }

        let methodName = operation.operationId;

        for (const requestMethodName of requestMethodNames) {
          if (methodName.startsWith(requestMethodName)) {
            methodName = requestMethodName;
            break;
          }
        }

        return methodName;
      },
    },
  ],
});
