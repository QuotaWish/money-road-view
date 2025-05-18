import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', () => {
  const refreshToken = ref('')

  function setRefreshToken(token: string) {
    refreshToken.value = token
  }

  return { refreshToken, setRefreshToken }
}, {
  persist: true,
})
