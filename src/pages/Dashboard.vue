<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import VChart from "vue-echarts";

// chart reference
const chartRef = ref(null);
const option = ref(null);

// initial view state
let initialView = {
  zoom: 1,
  center: [8.9, 44.3]   // center roughly over Liguria
};

onMounted(async () => {
  // carica il geojson LIGHT dal folder public
  const liguria = await fetch("/test_dashboard/liguria_light.geojson")
    .then((r) => r.json());

  // registra la mappa
  echarts.registerMap("liguria", liguria);

  option.value = {
    geo: {
      map: "liguria",
      roam: true,
      zoom: initialView.zoom,
      center: initialView.center,
      itemStyle: {
        areaColor: "#0c1b33",
        borderColor: "#4fb4ff",
        borderWidth: 1.2
      },
      emphasis: {
        itemStyle: {
          areaColor: "#1a355e"
        }
      }
    }
  };
});

function zoomIn() {
  const chart = chartRef.value.chart;
  const current = chart.getOption().geo[0].zoom || 1;
  chart.setOption({ geo: [{ zoom: current * 1.2 }] });
}

function zoomOut() {
  const chart = chartRef.value.chart;
  const current = chart.getOption().geo[0].zoom || 1;
  chart.setOption({ geo: [{ zoom: current / 1.2 }] });
}

function resetView() {
  const chart = chartRef.value.chart;
  chart.setOption({
    geo: [{
      zoom: initialView.zoom,
      center: initialView.center
    }]
  });
}
</script>

<template>
  <div class="page">
    <h2 class="glow">Mappa Regione Liguria</h2>

    <div class="map-container card">
      <!-- Controls -->
      <div class="controls">
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">−</button>
        <button @click="resetView">Reset</button>
      </div>

      <v-chart
        ref="chartRef"
        v-if="option"
        :option="option"
        class="map-chart"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
  color: #c8dbff;
}

.map-container {
  width: 100%;
  max-width: 1200px;
  height: 600px;
  margin: 20px auto;
  padding: 10px;
  position: relative;

  background: rgba(15, 22, 40, 0.6);
  border: 1px solid rgba(100, 140, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.2);
}

.map-chart {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.controls button {
  background: rgba(20, 25, 45, 0.85);
  color: #4fb4ff;
  border: 1px solid #4fb4ff;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.controls button:hover {
  background: rgba(79, 180, 255, 0.25);
}
</style>
