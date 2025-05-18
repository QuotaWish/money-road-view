<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="p-4 flex gap-4 h-full relative">
    <div class="flex flex-1 flex-col" gap-4>
      <div class="p-6"  bg-red flex-1>1</div>
      <div class="flex w-full gap-4 justify-between">
        <div class="p-4 flex-1" bg-red >2</div>
        <div class="p-4 flex-1" bg-red >3</div>
      </div>
    </div>
    <div class="flex flex-col gap-4 max-w-[200px] w-[30%]">
      <div class="p-4 rounded-xl bg-red flex-1">
        1
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        2
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        3
      </div>
      <div class="p-4 rounded-xl bg-red flex-1">
        4
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
