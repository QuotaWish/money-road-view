export class UserAuthStore {
  accessToken: string = ''

  constructor() {

  }
}

export const useAuthStore = createGlobalState(() => useLocalStorage('gather-auth', new UserAuthStore()))

// defineStore('user', () => {
//   const refreshToken = ref('')

//   function setRefreshToken(token: string) {
//     refreshToken.value = token
//   }

//   return { refreshToken, setRefreshToken }
// }, {
//   persist: true,
// })
