<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import VChart from "vue-echarts";

// reference al chart
const chartRef = ref(null);
const option = ref(null);

let initialView = {
  zoom: 1,
  center: [8.9, 44.3]
};

onMounted(async () => {
  const url = import.meta.env.BASE_URL + "liguria_region_light.geojson";
  console.log("Loading GeoJSON from:", url);

  const liguria = await fetch(url).then(r => r.json());

  echarts.registerMap("liguria", liguria);

  option.value = {
    geo: {
      map: "liguria",
      roam: true,
      zoom: 1,
      // centro approssimato su Liguria in lon/lat
      center: [8.9, 44.3],
      itemStyle: {
        areaColor: "#0c1b33",
        borderColor: "#4fb4ff",
        borderWidth: 1
      },
      emphasis: {
        itemStyle: {
          areaColor: "#1a355e"
        }
      }
    }
  };
});


// zoom e controlli
function zoomIn() {
  const chart = chartRef.value.chart;
  const current = chart.getOption().geo[0].zoom;
  chart.setOption({ geo: [{ zoom: current * 1.2 }] });
}

function zoomOut() {
  const chart = chartRef.value.chart;
  const current = chart.getOption().geo[0].zoom;
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
   

    <div class="map-container">
      <div class="controls">
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">−</button>
        <button @click="resetView">Reset</button>
      </div>

      <v-chart v-if="option" ref="chartRef" :option="option" class="map-chart" />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}

.map-container {
  width: 90%;
  max-width: 800px;
  height: 450px;
  margin: 0 auto;
  position: relative;

  /* background come sidebar */

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
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
}

.controls button {
  background: rgba(20, 25, 45, 0.85);
  color: #4fb4ff;
  border: 1px solid #4fb4ff;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}
.controls button:hover {
  background: rgba(79, 180, 255, 0.25);
}
</style>
