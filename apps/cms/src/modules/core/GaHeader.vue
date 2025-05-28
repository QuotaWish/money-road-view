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
        <a-doption text-red @click="handleLogout">
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
    <a-drawer :width="340" :visible="visible" unmount-on-close title="用户信息" @ok="handleOk" @cancel="handleCancel">
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
        <a-form-item field="image" label="头像">
          -
          <a-space direction="vertical" :style="{ width: '100%' }">
            <!-- <a-upload
              action="/" :file-list="file ? [file] : []" :show-file-list="false" @change="onChange"
              @progress="onProgress"
            >
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''}`"
                >
                  <div v-if="file && file.url" class="arco-upload-list-picture custom-upload-avatar">
                    <img :src="file.url">
                    <div class="arco-upload-list-picture-mask">
                      <IconEdit />
                    </div>
                    <a-progress
                      v-if="file.status === 'uploading' && file.percent < 100" :percent="file.percent"
                      type="circle" size="mini" :style="{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                      }"
                    />
                  </div>
                  <div v-else class="arco-upload-picture-card">
                    <div class="arco-upload-picture-card-text">
                      <IconPlus />
                      <div style="margin-top: 10px; font-weight: 600">
                        Upload
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </a-upload> -->
          </a-space>
          <!-- <a-input v-model="personData.image" placeholder="please enter your image" /> -->
        </a-form-item>
        <a-form-item field="name" label="ID">
          <label>{{ userStore.userInfo.id }}</label>
        </a-form-item>
        <a-form-item field="name" label="用户名">
          <a-input v-model="userStore.userInfo.name" placeholder="please enter your username" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="userStore.userInfo.email" placeholder="please enter your email" />
        </a-form-item>
        <a-form-item field="emailVerified" label="EmailVerified">
          {{ formatDate(userStore.userInfo.emailVerified) }}
        </a-form-item>
        <a-form-item field="role" label="角色">
          <a-input v-model="userStore.userInfo.role" placeholder="please enter your role" />
        </a-form-item>
        <a-form-item field="createAt" label="创造时间">
          {{ formatDate(userStore.userInfo.createAt) }}
        </a-form-item>
        <a-form-item field="updateAt" label="更新时间">
          {{ formatDate(userStore.userInfo.updateAt) }}
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
