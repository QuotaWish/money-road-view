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
  (page, pageSize) => EndApis.User.UserController_getUsers(page, pageSize),
  {
    // 请求前的初始数据（接口返回的数据格式）
    initialData: {
      total: 0,
      data: [],
    },
    initialPage: 1, // 初始页码，默认为1
    initialPageSize: 10, // 初始每页数据条数，默认为10
  },
)

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]
</script>

<template>
  <div>
    <a-table :columns="columns" :data="data" />
  </div>
</template>

<route lang="yaml">
  meta:
    title: 用户管理
</route>
