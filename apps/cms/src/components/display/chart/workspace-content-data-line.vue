<script lang="ts" setup>
import * as echarts from 'echarts'
import VueEchart from 'vue-echarts'

const option = ref({
  title: {
    text: '用户容量趋势',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter(params: any) {
      const date = params[0].name
      const value = params[0].value.toLocaleString()
      const percent = (params[0].value / 39048 * 100).toFixed(0)
      return `${date}<br />用户容量: ${value}<br />占比: ${percent}%`
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [
      '2021-03-09',
      '2021-03-10',
      '2021-03-11',
      '2021-03-12',
      '2021-03-13',
      '2021-03-14',
      '2021-03-15',
      '2021-03-16',
    ],
  },
  yAxis: {
    type: 'value',
    name: '用户容量',
    axisLabel: {
      formatter: '{value}',
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '用户容量',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: '#5470C6',
      },
      itemStyle: {
        color: '#5470C6',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
          { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
        ]),
      },
      data: [16000, 22000, 29000, 39048, 32000, 25000, 18000, 12000],
      markPoint: {
        data: [
          {
            name: '峰值',
            type: 'max',
            valueDim: 'y',
            coord: ['2021-03-12', 39048],
            symbolSize: 60,
            label: {
              formatter: '39,048',
              position: 'top',
              color: '#d74b4b',
            },
          },
        ],
      },
    },
  ],
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100,
  }],
  graphic: [{
    type: 'text',
    right: 20,
    bottom: 20,
    style: {
      text: '数据来源: 内容数据（百万日）',
      fontSize: 12,
      fill: '#999',
    },
  }],
})
</script>

<template>
  <VueEchart w-full h-full :option="option" />
</template>
