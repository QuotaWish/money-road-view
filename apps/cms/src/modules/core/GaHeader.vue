<script lang="ts" setup>
// import dayjs from 'dayjs'
import { useUserStore } from '~/composables/store/user'

const router = useRouter()
const userStore = useUserStore()

// function formatDate(date: string) {
//   return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
// }

function handleLogout() {
  userStore.logout()

  router.push('/auth/login')
}

const type = ref('')
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

function handleLoginHistory() {
  type.value = 'view'

  visible.value = true
}

function handleView() {
  type.value = 'view'

  visible.value = true
}
function handleEdit() {
  type.value = 'edit'

  visible.value = true
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
        <a-doption @click="handleLoginHistory">
          登录历史
        </a-doption>
        <a-doption text-red @click="handleLogout">
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
    <a-drawer :width="500" :visible="visible" unmount-on-close title="用户信息" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        {{ type === 'view' ? '查看' : '编辑' }}
      </template>
      <template #footer>
        <div flex items-center justify-end>
          <a-button v-show="type === 'edit'" status="normal" type="primary" @click="handleView">
            详情
          </a-button>
          <a-button v-show="type === 'view'" status="warning" @click="handleEdit">
            编辑
          </a-button>
        </div>
      </template>
      <!-- @submit="handleSubmit" -->
      <a-form :disabled="type === 'view'" :model="userStore.userInfo" layout="vertical">
        <a-form-item>
          <GaHeaderPersonalSetting />
        </a-form-item>
      </a-form>
    </a-drawer>
    <GaHeaderLoginHistory v-model="visible" />
  </div>
</template>
