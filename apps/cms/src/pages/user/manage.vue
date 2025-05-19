<script lang="ts" setup>
import { usePagination } from 'alova/client'

defineOptions({
  name: 'Users',
})

const {
  loading,

  data,

  page,

  pageSize,

  pageCount,

  total,
} = usePagination(
  // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
  (page, pageSize) => EndApis.User.UserController_getUsers({
    data: { page, pageSize },
  }),
  {
    initialData: {
      total: 0,
      data: [],
    },
    initialPage: 1,
    initialPageSize: 10,
  },
)

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]
</script>

<template>
  <div p-4 h-full w-full>
    <a-spin h-full w-full :loading="loading" tip="Loading">
      <a-table :data="data">
        <template #columns>
          <a-table-column title="ID" data-index="id" />
          <a-table-column title="名称" data-index="name" />
          <a-table-column title="角色" data-index="role" />
          <a-table-column title="邮箱">
            <a-table-column title="地址" data-index="email" />
            <a-table-column title="是否验证" data-index="emailVerified" />
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
