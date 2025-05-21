<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import { useUserStore } from '~/composables/store'
import { ContainerLayout, GaRouterView } from '~/modules/core'
import { initApis } from './composables/api/clients'

const userStore = useUserStore()
const router = useRouter()

initApis()

router.beforeEach((to, from, next) => {
  const targetNeedAuth = to.meta?.needAuth
  const doNotNeedAuth = targetNeedAuth !== undefined || targetNeedAuth === false

  if (!doNotNeedAuth && !userStore.isLogin) {
    next({ path: '/auth/login' })
  }
  else {
    if (doNotNeedAuth && userStore.isLogin) {
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
    <GaRouterView />

    <Toaster position="top-right" :toast-options="{
      class: 'Toast',
    }" rich-colors />
  </ContainerLayout>
</template>
