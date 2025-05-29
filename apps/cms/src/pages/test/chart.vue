<script lang="ts" setup>
import * as echarts from 'echarts'
import VueEchart from 'vue-echarts'

const chart = useTemplateRef('chart')

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
}

onMounted(() => {
  const myechart = echarts.init(chart.value)

  myechart.setOption(option)
})
</script>

<template>
  <div p-4 flex flex-col gap-4 h-full w-full>
    <h1 text-3xl>
      CommonEcharts VS VueEcharts (Pkg)
    </h1>
    <div flex flex-grow gap-4 items-center justify-center>
      <div class="EchartsWrapper">
        <div ref="chart" absolute-layout class="chart" />
      </div>
      <div class="EchartsWrapper">
        <VueEchart class="chart" :option="option" />
        <!-- <div class="chart" /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.EchartsWrapper {
  position: relative;

  width: 500px;
  height: 500px;

  border: 5px solid red;
}
</style>

<route lang="yaml">
  meta:
    needAuth: false
    layout: fullscreen
</route>
