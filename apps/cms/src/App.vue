<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import { ContainerLayout } from '~/modules/core'
import { useUserStore } from '~/composables/store'

const userStore = useUserStore()
const router = useRouter()

router.beforeEach((to, from, next) => {
  if (to.meta?.needAuth !== false && !userStore.isLogin.value) {
    next({ path: '/auth/login' })
  } else {
    next()
  }
})
</script>

<template>
  <ContainerLayout>
    <RouterView />
    <Toaster
      position="top-right"
      :toast-options="{
        class: 'Toast',
      }" rich-colors
    />
  </ContainerLayout>
</template>
