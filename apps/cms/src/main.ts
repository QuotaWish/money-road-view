import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
// ✅ 自动设置暗黑模式
import { setupAutoDarkMode } from '~/utils/darkMode'
import App from './App.vue'

// 引入arco暗黑主题
import '@arco-design/web-vue/dist/arco.css'

import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
// 自动开启暗黑模式
setupAutoDarkMode()
