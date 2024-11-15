import type { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
        },
      },
    },
  })
}
