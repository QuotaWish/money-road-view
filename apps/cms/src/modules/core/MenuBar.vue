<script lang="ts" setup>
const router = useRouter()
const selectedKeys = ref<string[]>([])

function handleMenuItemClick(key: string) {
  selectedKeys.value = [key]

  router.push(`/${key.replace('_', '/')}`)
}
</script>

<template>
  <a-menu auto-open :selected-keys="selectedKeys" :style="{ width: '200px', height: '100%' }" show-collapse-button
    @menu-item-click="handleMenuItemClick">
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
    <a-sub-menu key="manage">
      <template #icon>
        <div i-carbon:gateway-user-access />
      </template>
      <template #title>
        管理系统
      </template>
      <a-menu-item key="manage_configurations">
        <template #icon>
          <div i-carbon:contour-finding />
        </template>
        配置管理
      </a-menu-item>
      <a-menu-item key="manage_users">
        <template #icon>
          <div i-carbon:user />
        </template>
        用户管理
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
