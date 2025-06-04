<script lang="ts" setup>
import dayjs from 'dayjs'
import { useUserStore } from '~/composables/store/user'

const userStore = useUserStore()
const type = ref('')

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<template>
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
</template>

<style scoped></style>
