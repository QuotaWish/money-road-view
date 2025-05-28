<script lang="ts" setup>
import dayjs from 'dayjs'
import { useUserStore } from '~/composables/store/user'
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';

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

components: { IconPlus, IconEdit } {
  const file = ref()
}

const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  }
}
const onProgress = (currentFile) => {
  file.value = currentFile
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
    <a-drawer :width="340" :visible="visible" unmount-on-close @ok="handleOk" @cancel="handleCancel" title="用户信息">
      <template #title>
        {{ type === 'view' ? '查看' : '编辑' }}
      </template>
      <template #footer>
        <div v-if="type === 'edit'" flex gap-2 justify-end>
          <a-button @click="handleCancel">
            取消
          </a-button>
          <a-button :disabled="true" status="warning" @click="handleOk">
            编辑
          </a-button>
        </div>
        <div v-if="type === 'view'">
          <a-button @click="handleCancel">
            关闭
          </a-button>
        </div>
      </template>
      <a-form :disabled="type === 'view'" :model="personData" layout="vertical" @submit="handleSubmit">
        <a-form-item field="image" label="头像">
          <a-space direction="vertical" :style="{ width: '100%' }">
            <a-upload action="/" :fileList="file ? [file] : []" :show-file-list="false" @change="onChange"
              @progress="onProgress">
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''}`">
                  <div class="arco-upload-list-picture custom-upload-avatar" v-if="file && file.url">
                    <img :src="file.url" />
                    <div class="arco-upload-list-picture-mask">
                      <IconEdit />
                    </div>
                    <a-progress v-if="file.status === 'uploading' && file.percent < 100" :percent="file.percent"
                      type="circle" size="mini" :style="{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)'
                      }" />
                  </div>
                  <div class="arco-upload-picture-card" v-else>
                    <div class="arco-upload-picture-card-text">
                      <IconPlus />
                      <div style="margin-top: 10px; font-weight: 600">Upload</div>
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
          </a-space>
          <!-- <a-input v-model="personData.image" placeholder="please enter your image" /> -->
        </a-form-item>
        <a-form-item field="name" label="ID">
          <label>{{ personData.id }}</label>
        </a-form-item>
        <a-form-item field="name" label="用户名">
          <a-input v-model="personData.name" placeholder="please enter your username" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="personData.email" placeholder="please enter your email" />
        </a-form-item>
        <a-form-item field="emailVerified" label="EmailVerified">
          {{ formatDate(personData.emailVerified) }}
        </a-form-item>
        <a-form-item field="role" label="角色">
          <a-input v-model="personData.role" placeholder="please enter your role" />
        </a-form-item>
        <a-form-item field="createAt" label="创造时间">
          {{ formatDate(personData.createAt) }}
        </a-form-item>
        <a-form-item field="updateAt" label="更新时间">
          {{ formatDate(personData.updateAt) }}
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
