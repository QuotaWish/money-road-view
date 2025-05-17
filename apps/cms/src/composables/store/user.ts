import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)

  return { isLogin }
})