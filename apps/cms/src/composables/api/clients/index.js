import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
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
      method.config.headers.Authorization = authStore.value.accessToken
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
