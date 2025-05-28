<script lang="ts" setup>
import GardientIcon from '~/components/display/GardientIcon .vue'
import { useUserStore } from '~/composables/store'

defineOptions({
  name: 'Workspace',
})

const position = ref('top')

const userStore = useUserStore()

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    ellipsis: true,
    tooltip: true,
    width: 100
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
    tooltip: { position: 'left' },
    width: 200,
  },
]
const data = reactive([{
  key: '1',
  name: 'Jane Doe',
  salary: 23000,
  address: '32 Park Road, London',
  email: 'jane.doe@example.com'
}, {
  key: '2',
  name: 'Alisa Ross',
  salary: 25000,
  address: '35 Park Road, London',
  email: 'alisa.ross@example.com'
}, {
  key: '3',
  name: 'Kevin Sandra',
  salary: 22000,
  address: '31 Park Road, London',
  email: 'kevin.sandra@example.com'
}, {
  key: '4',
  name: 'Ed Hellen',
  salary: 17000,
  address: '42 Park Road, London',
  email: 'ed.hellen@example.com'
}, {
  key: '5',
  name: 'William Smith',
  salary: 27000,
  address: '62 Park Road, London',
  email: 'william.smith@example.com'
}])
</script>

<template>
  <div class="p-4 flex gap-4 h-full relative">
    <div class="flex flex-1 flex-col" gap-4>
      <a-card class="Workspace-Card" flex-1>
        <p class="Workspace-Headline-Primary">
          欢迎回来，{{ userStore.userInfo.name }}
        </P>
        <a-divider />
        <a-row class="Workspace-Grid-Demo" justify="space-between">
          <a-col :span="4">
            <div class="Workspace-Card flex gap-4 items-center">
              <GardientIcon color="#5EAAB5" icon="i-carbon:batch-job-step" />
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
            <div class="Workspace-Card flex gap-4 items-center">
              <GardientIcon color="#C44AFC" icon="i-carbon:account" />
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
            <div class="Workspace-Card flex flex-1 gap-4 items-center">
              <GardientIcon color="#FCA471" icon="i-carbon:add-comment " />
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
            <div class="Workspace-Card flex flex-1 gap-4 items-center">
              <GardientIcon color="#03B3FB" icon="i-carbon:analytics " />
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
        <a-card class="Workspace-Card flex-1">
          <p>线上热门内容</p>
          <a-link href="link" class="Workspace-Card-Link">
            查看更多
          </a-link>
          <a-space direction="vertical" size="large">
            <a-tabs :position="position">
              <a-tab-pane key="1" title="文本">
                <a-table :pagination="{ 'hide-on-single-page': true }" :columns="columns" :data="data" />
              </a-tab-pane>
              <a-tab-pane key="2" title="图文">
                <a-table :pagination="{ 'hide-on-single-page': true }" :columns="columns" :data="data" />
              </a-tab-pane>
              <a-tab-pane key="3" title="视频">
                <a-table :pagination="{ 'hide-on-single-page': true }" :columns="columns" :data="data" />
              </a-tab-pane>
            </a-tabs>
          </a-space>
        </a-card>
        <a-card class="Workspace-Card flex-1">
          3
        </a-card>
      </div>
    </div>
    <div class="flex flex-col gap-4 max-w-[300px] w-[30%]">
      <a-card class="Workspace-Card flex-1">
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
      <a-card class="Workspace-Card flex-1">
        <p class="Workspace-Headline-Secondary">
          最近访问
        </p>
        <div class="Layout-Right">
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
      <a-card class="Workspace-Card flex-1">
        <p class="Workspace-Headline-Secondary">
          公告
        </p>
        <a-link href="link" class="Workspace-Card-Link">
          查看更多
        </a-link>
        <div class="Workspace-Tag-One">
          <a-tag color="orangered">
            活动
          </a-tag>
          <p>内容最新优惠活动</p>
        </div>
        <div class="Workspace-Tag-One">
          <a-tag color="blue">
            消息
          </a-tag>
          <p>当前产品试用期即将截止</p>
        </div>
        <div class="Workspace-Tag-One">
          <a-tag color="pinkpurple">
            通知
          </a-tag>
          <p>1月新系统升级计划通知</p>
        </div>
        <div class="Workspace-Tag-One">
          <a-tag color="blue">
            消息
          </a-tag>
          <p>新增内容已经通过审核</p>
        </div>
      </a-card>
      <a-card class="Workspace-Card flex-1">
        <p class="Workspace-Headline-Secondary">
          帮助文档
        </p>
        <a-link href="link" class="Workspace-Card-Link">
          查看更多
        </a-link>
        <div class="Workspace-Tag-Two">
          <a-link href="link">
            产品概述
          </a-link>
          <a-link href="link">
            使用指南
          </a-link>
          <a-link href="link">
            接入流程
          </a-link>
          <a-link href="link">
            接口文档
          </a-link>
        </div>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.Workspace-Headline-Primary {
  font-size: 25px;
}

.Workspace-Headline-Secondary {
  font-size: 16px;
}

.Workspace-Tag-One {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 8px;
}

.Workspace-Tag-Two {
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  gap: 8px;
}

.Workspace-Card-Link {
  position: absolute;
  right: 12px;
  top: 12px;
}

.Layout-Right {
  gap: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.Workspace-Grid-Demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
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
