import { defineStore } from 'pinia'

export class UserInfo {
  id: string = ''
  name: string = ''
  createdAt: string = ''
  updatedAt: string = ''
  email: string = ''
  emailVerified: string = ''
  image: string = ''
  role: string = ''
}

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const userInfo = reactive<UserInfo>(new UserInfo())

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
