<script lang="ts" setup>
defineOptions({
  name: 'Workspace',
})
</script>

<template>
  <div class="p-4 flex gap-4 h-full relative">
    <div class="flex flex-1 flex-col" gap-4>
      <div class="p-6" bg-red flex-1>
        <P class="titleone">MONEYROAD</P>
        <a-row class="grid-demo" justify="space-between">
          <a-col :span="4">
            <div>col - 4</div>
          </a-col>
          <a-col :span="4">
            <div>col - 4</div>
          </a-col>
          <a-col :span="4">
            <div>col - 4</div>
          </a-col>
          <a-col :span="4">
            <div>col - 4</div>
          </a-col>
        </a-row>
      </div>
      <div class="flex w-full h-[40%] gap-6 justify-between">
        <div class="p-4 flex-1" bg-red>2</div>
        <div class="p-4 flex-1" bg-red>3</div>
      </div>
    </div>
    <div class="flex flex-col gap-4 max-w-[300px] w-[30%]">
      <div class="p-4 rounded-xl bg-red flex-1">
        <p class="titleright">快捷入口</p>
        <div class="layoutright">
          <a-button type="primary" class="i-carbon:book">内容管理</a-button>
          <a-button type="primary">内容统计</a-button>
          <a-button type="primary">高级管理</a-button>
          <a-button type="primary">线上推广</a-button>
          <a-button type="primary">内容投放</a-button>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        <p class="titleright">最近访问</p>
        <div class="layoutright">
          <a-button type="primary">数据统计</a-button>
          <a-button type="primary">内容管理</a-button>
          <a-button type="primary">高级管理</a-button>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        公告
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        帮助文档
      </div>
    </div>
  </div>
</template>

<style scoped>
.titleone {
  font-size: 25px;
}

.titleright {
  font-size: 20px;
}

.layoutright {
  gap: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.grid-demo {
  background-color: var(--color-fill-2);
  margin-bottom: 40px;
}

.grid-demo:last-child {
  margin-bottom: 0px;
}

.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}

.grid-demo .arco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}

.grid-demo .arco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

<route lang="yaml">
  meta:
    title: 工作台
</route>
