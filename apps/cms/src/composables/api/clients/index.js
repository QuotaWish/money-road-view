import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { toast } from 'vue-sonner'
import { useAuthStore, useUserStore } from '~/composables/store'
import { END_POINT_API } from '..'
import { createApis, withConfigType } from './createApis'

const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
  login({ data }) {
    if (data.code !== 0) {
      return
    }

    const authStore = useAuthStore()
    const userStore = useUserStore()

    const token = data.data.token
    authStore.setRefreshToken(token)

    userStore.setLogin(data.data.user)
  },
  assignToken(method) {
    const authStore = useAuthStore()
    const userStore = useUserStore()

    if (authStore.refreshToken && userStore.isLogin) {
      method.config.headers.Authorization = authStore.refreshToken
    }
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

      const body = await response.json()

      if (body.code !== 0) {
        toast.error(body.message)
        return
      }

      return body
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
