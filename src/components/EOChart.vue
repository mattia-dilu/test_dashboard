<template>
  <v-chart :option="chart" style="height: 350px;" />
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([LineChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

const chart = ref({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['2019', '2020', '2021', '2022', '2023'],
    axisLine: { lineStyle: { color: '#4fb4ff' } },
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#4fb4ff' } },
  },
  series: [
    {
      name: 'NDVI',
      type: 'line',
      smooth: true,
      data: [0.45, 0.48, 0.52, 0.50, 0.55],
      lineStyle: { color: '#4fb4ff', width: 3 },
      areaStyle: { color: 'rgba(79, 180, 255, 0.1)' },
      glow: true
    }
  ]
})
</script>
