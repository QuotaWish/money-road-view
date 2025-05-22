<script lang="ts" setup>
import { useUserStore } from '~/composables/store';

defineOptions({
  name: 'Workspace',
})

const userStore = useUserStore()
</script>

<template>
  <div class="p-4 flex gap-4 h-full relative">
    <div class="flex flex-1 flex-col" gap-4>
      <a-card class="Workspace-Card p-6" flex-1>
        <p class="Workspace-Headline-Primary">
          欢迎回来，{{ userStore.userInfo.name }}
        </P>
        <a-divider />
        <a-row class="Workspace-Grid-Demo" justify="space-between">
          <a-col :span="4">
            <div class="Workspace-Card p-4 flex-1">
              <IconButton class="text-black" icon="i-carbon:batch-job-step" />
              <a-space size="large">
                <a-statistic title="线上总内容" :value="125670" show-group-separator>
                  <template #suffix>
                    <icon-arrow-rise />
                  </template>
                </a-statistic>
              </a-space>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="Workspace-Card p-4 flex-1">
              <IconButton class="text-black" icon="i-carbon:account" />
              <a-space size="large">
                <a-statistic title="投放中内容" :value="125670" show-group-separator>
                  <template #suffix>
                    <icon-arrow-rise />
                  </template>
                </a-statistic>
              </a-space>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="Workspace-Card p-4 flex-1">
              <IconButton class="text-black" icon="i-carbon:add-comment " />
              <a-space size="large">
                <a-statistic title="日增新评论" :value="125670" show-group-separator>
                  <template #suffix>
                    <icon-arrow-rise />
                  </template>
                </a-statistic>
              </a-space>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="Workspace-Card p-4 flex-1">
              <IconButton class="text-black" icon="i-carbon:analytics " />
              <a-space size="large">
                <a-statistic title="较昨日新增" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
                  <template #prefix>
                    <icon-arrow-rise />
                  </template>
                  <template #suffix>
                    %
                  </template>
                </a-statistic>
              </a-space>
            </div>
          </a-col>
        </a-row>
      </a-card>
      <div class="flex gap-6 h-[40%] w-full justify-between">
        <a-card class="Workspace-Card p-4 flex-1">
          2
        </a-card>
        <a-card class="Workspace-Card p-4 flex-1">
          3
        </a-card>
      </div>
    </div>
    <div class="flex flex-col gap-4 max-w-[300px] w-[30%]">
      <a-card class="Workspace-Card p-4 rounded-xl flex-1">
        <p class="Workspace-Headline-Secondary">
          快捷入口
        </p>
        <div class="Layout-Right">
          <IconButton icon="i-carbon-book">
            内容管理
          </IconButton>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon:align-vertical-bottom">
              内容统计
            </IconButton>
          </div>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon:block-storage-alt">
              高级管理
            </IconButton>
          </div>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon:application-mobile">
              线上推广
            </IconButton>
          </div>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon:border-full">
              内容投放
            </IconButton>
          </div>
        </div>
      </a-card>
      <a-card class="Workspace-Card p-4 rounded-xl flex-1">
        <p class="titleright">
          最近访问
        </p>
        <div class="layoutright">
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon-account">
              数据统计
            </IconButton>
          </div>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon-batch-job">
              内容管理
            </IconButton>
          </div>
          <div class="flex gap-2 items-center">
            <IconButton icon="i-carbon-block-storage-alt">
              高级管理
            </IconButton>
          </div>
        </div>
      </a-card>
      <a-card class="Workspace-Card p-4 rounded-xl flex-1">
        公告
      </a-card>
      <a-card class="Workspace-Card p-4 rounded-xl flex-1">
        帮助文档
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.Workspace-Headline-Primary {
  font-size: 25px;
}

.Workspace-Headline-Secondary {
  font-size: 20px;
}

.Layout-Right {
  gap: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.Workspace-Grid-Demo {
  /* background-color: var(--color-fill-2); */
  margin-bottom: 40px;
}

.Workspace-Grid-Demo:last-child {
  margin-bottom: 0px;
}

.Workspace-Grid-Demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.Workspace-Grid-Demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.Workspace-Grid-Demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}

.Workspace-Card {
  user-select: none;
  border-radius: 12px;
}
</style>

<route lang="yaml">
  meta:
    title: 工作台
</route>
