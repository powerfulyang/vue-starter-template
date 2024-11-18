import { defineConfig } from 'orval'

export default defineConfig({
  petstore: {
    output: {
      mode: 'split',
      target: 'src/orval/service.ts',
      schemas: 'src/orval/models',
      client: 'vue-query',
      httpClient: 'fetch',
      override: {
        fetch: {
          includeHttpStatusReturnType: false,
        },
        mutator: {
          path: './src/http-client/index.ts',
          name: 'request',
        },
        operationName: (operation, route: string, verb) => {
          // 去掉 route 的 prefix
          const name = route.replace('/api', '')
          // / _ - 转驼峰
          const camelCase = name.replace(/[/_-](\w)/g, (_, letter) => letter.toUpperCase())
          //  只保留英文
          const operationName = camelCase.replace(/[^a-z]/gi, '')
          // 加上 verb, 且首字母大写
          return `${verb}${operationName.charAt(0).toUpperCase()}${camelCase.slice(1)}`
        },
      },
    },
    input: {
      target: './openapi/source.json',
    },
  },
})
