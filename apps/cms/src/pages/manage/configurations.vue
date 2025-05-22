<script lang="ts" setup>
import { usePagination } from 'alova/client'

defineOptions({
  name: 'Configurations',
})

const searchForm = useTemplateRef('searchForm')

function handleReset() {
  searchForm.value.resetFields()
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

const visible = ref(false)
const type = ref('')
const rowData = ref({})

function handleOk() {
  visible.value = false
}
function handleCancel() {
  visible.value = false
}

function handleView(data) {
  type.value = 'view'

  rowData.value = data

  visible.value = true
}
function handleEdit(data) {
  type.value = 'edit'

  rowData.value = data

  visible.value = true
}
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
                <a-button status="normal" type="primary" @click="handleView(record)">
                  详情
                </a-button>

                <a-button status="warning" @click="handleEdit(record)">
                  编辑
                </a-button>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <a-drawer :width="340" :visible="visible" unmount-on-close @ok="handleOk" @cancel="handleCancel">
        <template #title>
          {{ type === 'view' ? '查看' : '编辑' }}
        </template>
        <template #footer>
          <div v-if="type === 'edit'" flex gap-2 justify-end>
            <a-button @click="handleCancel">
              取消
            </a-button>
            <a-button :disabled="true" status="warning" @click="handleOk">
              确定
            </a-button>
          </div>
          <div v-if="type === 'view'">
            <a-button @click="handleCancel">
              关闭
            </a-button>
          </div>
        </template>
        <div>
          <a-form :form="rowData" :disabled="type === 'view'" @submit="handleSubmit">
            <a-form-item field="name" label="名称">
              <a-input v-model="rowData.name" placeholder="请输入你的名称" />
            </a-form-item>
            <a-form-item field="role" label="角色">
              <a-input v-model="rowData.role" placeholder="请输入你的角色" />
            </a-form-item>
            <a-form-item field="email" label="地址">
              <a-input v-model="rowData.email" placeholder="请输入你的邮箱地址" />
            </a-form-item>
            <a-form-item field="emailVerified" label="验证时间">
              <a-input v-model="rowData.emailVerified" placeholder="请输入你的邮箱验证时间" />
            </a-form-item>
            <a-form-item field="updatedAt" label="更新">
              <a-input v-model="rowData.updatedAt" placeholder="请输入你的更新时间" />
            </a-form-item>
            <a-form-item field="createdAt" label="创建">
              <a-input v-model="rowData.createdAt" placeholder="请输入你的创建时间" />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
    </a-spin>
  </div>
</template>

<route lang="yaml">
  meta:
    title: 配置管理
</route>
