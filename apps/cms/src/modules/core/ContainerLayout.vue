<script lang="ts" setup>
import { MenuBar, GaHeader } from './index'

const route = useRoute()

const routeMeta = computed(() => route.meta)
</script>

<template>
  <div v-if="routeMeta.layout === 'fullscreen'" class="ContainerLayout fullscreen absolute-layout">
    <slot />
  </div>
  <a-layout v-else class="ContainerLayout absolute-layout overflow-hidden">
    <a-layout-header
      class="p-4 border-b border-color-[var(--color-neutral-2)] flex h-[64px] items-center justify-between"
    >
      <Logo />

      <GaHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="w-[200px]">
        <MenuBar />
      </a-layout-sider>
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>
