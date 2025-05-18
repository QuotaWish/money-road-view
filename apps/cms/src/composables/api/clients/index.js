import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { END_POINT_API } from '..'
import { createApis, withConfigType } from './createApis'

export const alovaInstance = createAlova({
  statesHook: VueHook,
  baseURL: END_POINT_API,
  requestAdapter: fetchAdapter(),
  beforeRequest: (method) => { },
  responded: (res) => {
    return res.json()
  },
})

export const $$userConfigMap = withConfigType({})

/**
 * @type { EndApis }
 */
const Apis = createApis(alovaInstance, $$userConfigMap)

export default Apis

export function initApis() {
  console.debug("Network initialized")
}
