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
  <div class="GaHeader flex items-cen ter">
    <a-dropdown trigger="hover">
      <a-avatar>{{userStore.userInfo.name }}</a-avatar>
      <template #content>
        <a-doption @click="handleLogout" text-red>退出登录</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
