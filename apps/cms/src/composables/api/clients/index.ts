import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { createApis, withConfigType } from './createApis'

export const alovaInstance = createAlova({
  statesHook: VueHook,
  baseURL: '',
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
