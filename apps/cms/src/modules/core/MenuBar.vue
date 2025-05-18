<script lang="ts" setup>
const router = useRouter()
const selectedKeys = ref([])

function handleMenuItemClick(key) {
  selectedKeys.value = [key]

  router.push(`/${key.replace("_", "/")}`)
}
</script>

<template>
  <a-menu
    auto-open
    :selected-keys="selectedKeys"
    :style="{ width: '200px', height: '100%' }"
    show-collapse-button
    @menu-item-click="handleMenuItemClick"
  >
    <a-sub-menu key="dashboard">
      <template #icon>
        <div i-carbon-dashboard />
      </template>
      <template #title>
        仪表盘
      </template>
      <a-menu-item key="dashboard_workspace">
        <template #icon>
          <div i-carbon:ibm-consulting-advantage-application />
        </template>
        工作台
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="user">
      <template #icon>
        <div i-carbon:gateway-user-access />
      </template>
      <template #title>
        用户系统
      </template>
      <a-menu-item key="user_manage">
        <template #icon>
          <div i-carbon:user />
        </template>
        用户管理
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
