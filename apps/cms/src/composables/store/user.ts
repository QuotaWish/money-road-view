import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = reactive({})

  function setLogin(thisUserInfo: any) {
    Object.assign(userInfo, thisUserInfo)
    isLogin.value = true
  }

  function logout() {
    localStorage.removeItem('gather-auth')

    isLogin.value = false
    // TODO clear user info
  }

  return { isLogin, logout, userInfo, setLogin }
}, {
  persist: true,
})
