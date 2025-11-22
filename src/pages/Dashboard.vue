<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
import VChart from "vue-echarts";

const chartRef = ref(null);
const option = ref(null);

// Stato iniziale per RESET
const initialState = ref(null);

onMounted(async () => {
  const url = "/test_dashboard/liguria_region_light.geojson";
  const geojson = await fetch(url).then(r => r.json());

  echarts.registerMap("liguria", geojson);

  // Fit iniziale: il layoutSize lo amplifico per regioni molto lunghe
  option.value = {
    geo: {
      map: "liguria",
      roam: true,
      layoutCenter: ["50%", "50%"],
      layoutSize: "110%",
      itemStyle: {
        areaColor: "#0c1b33",
        borderColor: "#4fb4ff",
        borderWidth: 1.2
      },
      emphasis: {
        itemStyle: { areaColor: "#1a355e" }
      }
    }
  };

  // Dopo il render iniziale, cattura zoom e centro REALI
  nextTick(() => {
    setTimeout(() => {
      const chart = chartRef.value.chart;
      const geoModel = chart.getModel().getComponent("geo");
      const opt = geoModel.option;

      initialState.value = {
        zoom: opt.zoom,
        center: opt.center
      };
    }, 150);
  });
});

function zoomIn() {
  const chart = chartRef.value.chart;
  const geo = chart.getOption().geo[0];
  chart.setOption({ geo: [{ zoom: geo.zoom * 1.2 }] });
}

function zoomOut() {
  const chart = chartRef.value.chart;
  const geo = chart.getOption().geo[0];
  chart.setOption({ geo: [{ zoom: geo.zoom / 1.2 }] });
}

function resetView() {
  const chart = chartRef.value.chart;
  if (!initialState.value) return;

  chart.setOption({
    geo: [
      {
        zoom: initialState.value.zoom,
        center: initialState.value.center
      }
    ]
  });

  setTimeout(() => chart.resize(), 50);
}
</script>

<template>
  <div class="map-wrapper">
    <div class="map-container">

      <div class="controls">
        <button @click="zoomIn">+</button>
        <button @click="zoomOut">−</button>
        <button @click="resetView">Reset</button>
      </div>

      <div class="chart-wrapper">
        <v-chart
          ref="chartRef"
          v-if="option"
          :option="option"
          class="map-chart"
        />
      </div>

    </div>
  </div>
</template>

<style>
.map-wrapper {
  padding: 20px;
  width: 100%;
}

/* BOX ESTERNO */
.map-container {
  width: 100%;
  max-width: 1100px;
  height: 600px;
  margin: 0 auto;
  position: relative;

  background: rgba(20, 25, 45, 0.7);
  border: 1px solid rgba(80, 100, 200, 0.3);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.2);

  display: flex;
  flex-direction: column;
}

/* CONTENITORE ECHARTS STABILE */
.chart-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

/* CANVAS ECHARTS */
.map-chart {
  position: absolute;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}

/* CONTROLLI */
.controls {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.controls button {
  background: rgba(20, 25, 45, 0.85);
  color: #4fb4ff;
  border: 1px solid #4fb4ff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
.controls button:hover {
  background: rgba(79, 180, 255, 0.25);
}
</style>
