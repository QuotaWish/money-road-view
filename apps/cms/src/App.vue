<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import { useUserStore } from '~/composables/store'
import { ContainerLayout } from '~/modules/core'

const userStore = useUserStore()
const router = useRouter()

router.beforeEach((to, from, next) => {
  if (to.meta?.needAuth !== false && !userStore.isLogin) {
    next({ path: '/auth/login' })
  }
  else {
    if (to.meta?.needAuth === false && userStore.isLogin) {
      next({ path: '/' })
    }
    else {
      next()
    }
  }
})
</script>

<template>
  <ContainerLayout>
    <RouterView />
    <Toaster
      position="top-right" :toast-options="{
        class: 'Toast',
      }" rich-colors
    />
  </ContainerLayout>
</template>
