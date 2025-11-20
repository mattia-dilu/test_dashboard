<template>
  <v-chart :option="chartOptions" style="width: 100%; height: 400px;" />
</template>

<script setup>
import { ref } from 'vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { BarChart } from "echarts/charts"
import { GridComponent, TooltipComponent } from "echarts/components"
import VChart from "vue-echarts"

// Registrazione componenti ECharts
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const chartOptions = ref({
  tooltip: {},
  xAxis: {
    data: ["Lun", "Mar", "Mer", "Gio", "Ven"]
  },
  yAxis: {},
  series: [
    {
      name: "Vendite",
      type: "bar",
      data: [5, 20, 36, 10, 28]
    }
  ]
})
</script>
