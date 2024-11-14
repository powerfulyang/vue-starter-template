import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import '@/styles/index.scss'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  await setupRouter(app)

  app.mount('#app')
}

void bootstrap()
