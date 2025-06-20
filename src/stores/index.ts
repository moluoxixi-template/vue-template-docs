import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createSentryPiniaPlugin } from '@sentry/vue'

const store = createPinia()
store.use(piniaPluginPersistedstate)
store.use(createSentryPiniaPlugin())
export { store }
