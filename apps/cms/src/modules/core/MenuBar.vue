<script lang="ts" setup>

</script>

<template>
  <a-menu
    :style="{ width: '200px', height: '100%' }"
    :default-open-keys="['0']"
    :default-selected-keys="['0_1']"
    show-collapse-button
  >
    <a-sub-menu key="0">
      <template #icon>
        <div i-carbon-dashboard />
      </template>
      <template #title>
        仪表盘
      </template>
      <a-menu-item key="0_0_0" data-obj="1">
        <template #icon>
          <div i-carbon:ibm-consulting-advantage-application />
        </template>
        工作台
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
