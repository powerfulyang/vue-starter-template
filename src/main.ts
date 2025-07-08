import { createApp } from 'vue'
import { setupAssets } from '@/assets'
import { setupPlugins } from '@/plugins'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { setupVueQuery } from '@/vue-query/setupVueQuery'
import App from './App.vue'
import 'reflect-metadata'

async function bootstrap() {
  const app = createApp(App)

  setupPlugins()
  setupAssets()
  setupVueQuery(app)
  setupStore(app)
  await setupRouter(app)

  app.mount('#app')
}

void bootstrap()
