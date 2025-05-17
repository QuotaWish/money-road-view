<script lang="ts" setup>
import { MenuBar } from './index.ts'

const _route = useRoute()
</script>

<template>
  <a-layout class="ContainerLayout absolute-layout overflow-hidden">
    <a-layout-header
      class="p-4 border-b border-color-[var(--color-neutral-2)] flex h-[64px] items-center justify-between"
    >
      <Logo />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="w-[200px]">
        <MenuBar />
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>
