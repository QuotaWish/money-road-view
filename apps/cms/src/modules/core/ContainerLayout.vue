<script lang="ts" setup>
import { useUserStore } from '~/composables/store'
import { GaHeader, MenuBar } from './index'

interface IMenuItem {
  name: string
  path: string
}

const route = useRoute()
const router = useRouter()

const activeKey = ref('')
const userStore = useUserStore()
const menus = useLocalStorage('gather-tabs', new Array<IMenuItem>())

const routeMeta = computed(() => route.meta)

function handleDelete(key: string) {
  menus.value = menus.value.filter((item: IMenuItem) => item.path !== key)
}

router.afterEach((to) => {
  const targetNeedAuth = to.meta?.needAuth
  const doNotNeedAuth = targetNeedAuth !== undefined || targetNeedAuth === false

  if (doNotNeedAuth && !userStore.isLogin) {
    return
  }

  const { matched, path } = to
  if (path === '/') {
    router.push('/dashboard/workspace')
    return
  }
  const target = matched?.at?.(-1)

  const name: string = (target?.meta?.title as string) ?? target?.components?.default?.name ?? (to.name as string)

  const targetMenu = menus.value.find((item: IMenuItem) => item.path === path)

  if (!targetMenu) {
    menus.value.push({ name, path })
  }

  activeKey.value = route.path
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
        <a-tabs v-if="menus.length" v-model:active-key="activeKey" size="large" type="card-gutter" :editable="true" animation auto-switch justify @tab-click="handleTabClick" @delete="handleDelete">
          <a-tab-pane v-for="(item) of menus" :key="item.path" :title="item.name" :closable="menus.length">
            <slot />
          </a-tab-pane>
        </a-tabs>
        <div v-else flex h-full w-full items-center justify-center absolute>
          <a-empty />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>
