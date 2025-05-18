import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = reactive({})

  function setLogin(thisUserInfo: any) {
    Object.assign(userInfo, thisUserInfo)
    isLogin.value = true
  }

  return { isLogin, setLogin }
}, {
  persist: true,
})
