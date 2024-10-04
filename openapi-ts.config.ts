import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: 'legacy/fetch',
  // input: './versoly.openapi.yaml',
  input: 'https://api.versoly.com/web/v1/documentation/json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client',
  },
  types: {
    enums: 'javascript',
  },
  name: 'Client',
  services: {
    // asClass: true,
    methodNameBuilder: (operation) => {
      const requestMethodNames = ['list', 'get', 'create', 'update', 'delete', 'publish'];

      let methodName = operation.id || operation.name;

      for (const requestMethodName of requestMethodNames) {
        if (methodName.startsWith(requestMethodName)) {
          methodName = requestMethodName;
          break;
        }
      }

      return methodName;
    },
    //   name: '{{name}}',
  },
});
