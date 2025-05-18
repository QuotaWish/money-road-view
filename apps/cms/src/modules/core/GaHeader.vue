<script lang="ts" setup>
import { useUserStore } from '~/composables/store/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()

  router.push('/auth/login')
}
</script>

<template>
  <div class="GaHeader flex items-center gap-8">
    <div class="flex items-center gap-4">
      <a-button shape="circle">
      <div i-carbon-search />
    </a-button>
      <a-button shape="circle">
      <div i-carbon-notification />
    </a-button>
      <a-button shape="circle">
      <div i-carbon-settings />
    </a-button>
    </div>
    <a-dropdown trigger="hover">
      <a-avatar :size="48">{{userStore.userInfo.name }}</a-avatar>
      <template #content>
        <a-doption @click="handleLogout" text-red>退出登录</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
