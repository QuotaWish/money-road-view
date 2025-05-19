<script lang="ts" setup>
import { usePagination } from 'alova/client'

defineOptions({
  name: 'Users',
})

const form = useTemplateRef('searchForm')

function handleReset() {
  form.value.resetFields()
}

const form = reactive({
  name: '',
  email: '',
})
const {
  loading,

  data,

  send,
} = usePagination(
  // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
  (page, pageSize) => EndApis.User.UserController_getUsers({
    data: { page, pageSize, name: form.name.length ? form.name : undefined, email: form.email.length ? form.email : undefined },
  }),
  {
    initialData: {
      total: 0,
      data: [],
    },
    initialPage: 1,
    initialPageSize: 10,
    // watchingStates: [form],
  },
)
</script>

<template>
  <div p-4 flex flex-col gap-4 h-full w-full>
    <a-card w-full>
      <a-form ref="searchForm" :model="form" layout="inline">
        <a-form-item field="name" label="账号">
          <a-input v-model="form.name" placeholder="按账号名称筛选" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="form.email" placeholder="按邮箱地址筛选" />
        </a-form-item>
        <a-form-item>
          <div flex gap-2 items-center>
            <a-button status="success" @click="send">
              搜索
            </a-button>
            <a-button @click="send">
              刷新
            </a-button>
            <a-button status="warning" @click="handleReset()">
              重置
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>

    <a-spin flex-1 h-full w-full :loading="loading" tip="Loading">
      <a-table :data="data">
        <template #columns>
          <a-table-column title="ID" data-index="id" />
          <a-table-column title="名称" data-index="name" />
          <a-table-column title="角色" data-index="role" />
          <a-table-column title="邮箱">
            <a-table-column title="地址" data-index="email" />
            <a-table-column title="验证时间" data-index="emailVerified" />
          </a-table-column>
          <a-table-column title="时间戳">
            <a-table-column title="更新" data-index="updatedAt" />
            <a-table-column title="创建" data-index="createdAt" />
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <div flex gap-2 items-center>
                <a-button status="normal">
                  详情
                </a-button>
                <a-button status="warning">
                  编辑
                </a-button>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<route lang="yaml">
  meta:
    title: 用户管理
</route>
