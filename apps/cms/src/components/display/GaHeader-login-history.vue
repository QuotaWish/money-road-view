<script lang="ts" setup>
import { useRequest } from 'alova/client'
import dayjs from 'dayjs'

const model = defineModel()

const { data, send } = useRequest(() => EndApis.Auth.AuthController_getHistory(), {
  immediate: false,
  initialData: [],
})

watch(model, () => {
  if (model.value) {
    send()
  }
})
</script>

<template>
  <a-drawer width="30%" :visible="model" unmount-on-close title="登录历史">
    <template #footer>
      <a-button @click="model = false">
        关闭
      </a-button>
    </template>
    <div class="p-4 space-y-4">
      <div v-for="item in data"
        class="p-4 border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
        <div class="gap-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              ID
            </p>
            <p class="text-sm font-mono">
              {{ item.id }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              User ID
            </p>
            <p class="text-sm font-mono">
              {{ item.userId }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Platform
            </p>
            <p class="text-sm">
              {{ item.platform }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Device
            </p>
            <p class="text-sm">
              {{ item.device }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Fingerprint
            </p>
            <p class="text-xs font-mono truncate">
              {{ item.fingerprint }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              User Agent
            </p>
            <p class="text-xs font-mono truncate">
              {{ item.userAgent }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              IP
            </p>
            <p class="text-sm font-mono">
              {{ item.ip }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Location
            </p>
            <p class="text-sm">
              {{ item.where }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Status
            </p>
            <p class="text-sm font-medium" :class="item.success ? 'text-green-600' : 'text-red-600'">
              {{ item.success ? 'Success' : 'Failed' }}
            </p>
          </div>
          <div v-if="!item.success" class="space-y-1">
            <p class="text-xs text-gray-500">
              Error
            </p>
            <p class="text-sm text-red-500">
              {{ item.errorMsg }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Created
            </p>
            <p class="text-sm">
              {{ item.createdAt }}
            </p>
          </div>
          <div class="space-y-1">
            <p class="text-xs text-gray-500">
              Updated
            </p>
            <p class="text-sm">
              {{ item.updatedAt }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<style scoped></style>
