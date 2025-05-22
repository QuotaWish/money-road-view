<script lang="ts" setup>
import { useUserStore } from '~/composables/store/user'

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()

  router.push('/auth/login')
}

const visible = ref(false)

function handleClick() {
  visible.value = true
}
function handleOk() {
  visible.value = false
}
function handleCancel() {
  visible.value = false
}
</script>

<template>
  <div class="GaHeader flex gap-8 items-center">
    <div class="flex gap-4 items-center">
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
      <a-avatar :size="48">
        {{ userStore.userInfo.name }}
      </a-avatar>
      <template #content>
        <a-doption @click="handleClick">
          个人设置
        </a-doption>
        <a-doption text-red @click="handleLogout">
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
    <a-drawer :footer="false" :width="340" :visible="visible" unmount-on-close @ok="handleOk" @cancel="handleCancel">
    </a-drawer>
  </div>
</template>
