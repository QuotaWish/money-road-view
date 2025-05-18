<script lang="ts" setup>
import { GaHeader, MenuBar } from './index'

interface IMenuItem {
  name: string
  path: string
}

const route = useRoute()
const router = useRouter()

const activeKey = ref('')
const menus = useLocalStorage('gather-tabs', new Array<IMenuItem>())

const routeMeta = computed(() => route.meta)

function handleDelete(a) {
  console.log(a)
}

router.afterEach((to) => {
  const { name, path } = to

  const targetMenu = menus.value.find((item: IMenuItem) => item.path === path)

  if (!targetMenu) {
    menus.value.push({ name, path })
  }

  activeKey.value = route.path

  console.log(to)
})

function handleTabClick(key: string) {
  activeKey.value = key

  router.push(key)
}
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
        <a-tabs v-model:active-key="activeKey" size="large" type="card-gutter" :editable="true" animation auto-switch justify @tab-click="handleTabClick" @delete="handleDelete">
          <a-tab-pane v-for="(item) of menus" :key="item.path" :title="item.name" :closable="menus.length">
            <slot />
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>
