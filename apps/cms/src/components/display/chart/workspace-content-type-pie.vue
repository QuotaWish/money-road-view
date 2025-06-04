<script lang="ts" setup>
import * as echarts from 'echarts'
import VueEchart from 'vue-echarts'

const option2 = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮箱' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
    },
  ],
})
</script>

<template>
  <VueEchart w-full h-full :option="option2" />
</template>
