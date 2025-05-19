import { createAlova } from 'alova'
import { createClientTokenAuthentication, useForm } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { toast } from 'vue-sonner'
import { useAuthStore, useUserStore } from '~/composables/store'
import { END_POINT_API } from '..'
import { createApis, withConfigType } from './createApis'

const authStore = useAuthStore()

const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
  async login(response) {
  },
  assignToken(method) {
    const userStore = useUserStore()

    if (authStore.value.accessToken && userStore.isLogin) {
      method.config.headers.Authorization = `Bearer ${authStore.value.accessToken}`
    }
  },
  refreshToken: {
    isExpired: () => {
      return authStore.value.expiredTime - 1000 <= Date.now()
    },
    handler: async () => {
      return refreshToken()
    },
  },
})

export const alovaInstance = createAlova({
  statesHook: VueHook,
  baseURL: END_POINT_API,
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken({
    onSuccess: async (response, method) => {
      const meta = method.config.meta
      if (meta?.type === 'file') {
        return
      }

      const { code, message, data } = await response.json()

      if (code === 401) {
        const userStore = useUserStore()
        userStore.logout()
        location.reload()
        return
      }

      if (code !== 0) {
        toast.error(message)
        return
      }

      return data
    },
    onError: async (error) => {
      toast.error(error.method)
    },
  }),
})

export const $$userConfigMap = withConfigType({})

/**
 * @type { EndApis }
 */
const Apis = createApis(alovaInstance, $$userConfigMap)

export default Apis

export function initApis() {
  console.debug('Network initialized')
}

const { onSuccess, send } = useForm(() => Apis.Auth.AuthController_refresh({
  data: {
    token: authStore.value.refreshToken,
  },
  meta: {
    authRole: 'refreshToken',
  },
}), {})

onSuccess((res) => {
  const token = res.token

  authStore.value.accessToken = token.access_token
  authStore.value.refreshToken = token.refresh_token
  authStore.value.expiredTime = Date.now() + token.expire_time
})

async function refreshToken() {
  console.log("Execute refresh workflow")

  send()

}
