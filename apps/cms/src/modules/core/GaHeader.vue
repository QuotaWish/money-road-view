<script lang="ts" setup>
import dayjs from 'dayjs'
import { useUserStore } from '~/composables/store/user'

const router = useRouter()
const userStore = useUserStore()

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

function handleLogout() {
  userStore.logout()

  router.push('/auth/login')
}

const visible = ref(false)
const personData = ref<any>({})

function handleClick() {
  visible.value = true
  personData.value = userStore.userInfo
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
      <a-form disabled :model="personData" layout="vertical" @submit="handleSubmit">
        <a-form-item field="name" label="ID">
          <label>{{ personData.id }}</label>
        </a-form-item>
        <a-form-item field="name" label="Username">
          <a-input v-model="personData.name" placeholder="please enter your username" />
        </a-form-item>
        <a-form-item field="email" label="Email">
          <a-input v-model="personData.email" placeholder="please enter your email" />
        </a-form-item>
        <a-form-item field="emailVerified" label="EmailVerified">
          {{ formatDate(personData.emailVerified) }}
        </a-form-item>
        <a-form-item field="image" label="Image">
          
          <a-input v-model="personData.image" placeholder="please enter your image" />
        </a-form-item>
        <a-form-item field="role" label="Role">
          <a-input v-model="personData.role" placeholder="please enter your role" />
        </a-form-item>
        <a-form-item field="createAt" label="CreateAt">
          {{ formatDate(personData.createAt) }}
        </a-form-item>
        <a-form-item field="updateAt" label="UpdatedAt">
          {{ formatDate(personData.updateAt) }}
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
