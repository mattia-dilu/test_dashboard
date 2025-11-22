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
  animation: true,
  animationDuration: 1200,
  animationEasing: "cubicOut",
  animationDurationUpdate: 800,
  animationEasingUpdate: "cubicOut",
tooltip: {
    trigger: "item",
    backgroundColor: "rgba(10,20,40,0.9)",
    borderColor: "#38BDF8",
    borderWidth: 1,
    textStyle: { color: "#38BDF8" },
    formatter: params => {
      const codice = params.data?.properties?.PRO_COM;
      const nome = COMUNI[codice] || "Comune sconosciuto";

      return `<b>${nome}</b><br>Codice ISTAT: ${codice}`;
    }
  },
  geo: {
    map: "liguria",
    roam: true,

    // Fit iniziale
    layoutCenter: ["50%", "50%"],
    layoutSize: "120%",

    // Zoom iniziale animato
    zoom: 0.8,

    itemStyle: {
      areaColor: "rgba(10,15,25,0.3)",
      borderColor: "#7dd3fc",     // neon più moderno
      borderWidth: 1,
      shadowBlur: 15,
      shadowColor: "rgba(56,189,248,0.6)"
    },
    emphasis: {
      itemStyle: {
        areaColor: "#0f2747"      // hover elegante
      }
    }

  }

  
};

setTimeout(() => {
  const chart = chartRef.value.chart;

  chart.setOption({
    geo: [{
      zoom: 1.0,
      itemStyle: { areaColor: "#0c1b33" }
    }]
  });

  // ⭐ SALVA LO STATO DEFINITIVO DOPO LO ZOOM FINALE
  setTimeout(() => {
    const geoModel = chart.getModel().getComponent("geo");
    const opt = geoModel.option;

    initialState.value = {
      zoom: opt.zoom,
      center: opt.center
    };
  }, 150);

}, 300);

 
});


setTimeout(() => {
  const chart = chartRef.value.chart;
  chart.setOption({
    geo: [{
      zoom: 1.0,
      itemStyle: {
        areaColor: "#0c1b33"   // colore finale
      }
    }]
  });
}, 300);

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
  <div class="map-header">
      <div class="map-title">TERRITORY MONITORING</div>
      <div class="map-line"></div>
      <div class="map-subtitle">Earth Observation • Geospatial AI • Analytics</div>
    </div>

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

  background: rgba(10, 15, 25, 0.6);
  border: 1px solid rgba(80, 120, 200, 0.15);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.2);
backdrop-filter: blur(4px);
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
  
  background: rgba(10, 20, 40, 0.7);
  border-color: #38BDF8;
  color: #38BDF8;
  border: 1px solid #4fb4ff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
.controls button:hover {
  background: rgba(79, 180, 255, 0.25);
}
/* HEADER CENTRATO */
.map-header {
  text-align: center;
  margin-bottom: 30px;
}

/* TITOLO CENTRALE */
.map-title {
  font-size: 26px;
  color: #d8eaff;
  font-weight: 600;
  text-shadow: 0 0 12px rgba(56,189,248,0.35);
  letter-spacing: 1px;
}

/* LINEA CON GLOW AL CENTRO E DISSOLVENZA AI LATI */
.map-line {
  margin: 12px auto 12px auto;
  width: 80%;
  height: 3px;
  background: radial-gradient(
    circle at center,
    #38bdf8 0%,
    #38bdf8 35%,
    rgba(56,189,248,0.25) 60%,
    rgba(56,189,248,0.05) 85%,
    transparent 100%
  );
  filter: blur(0.8px);
}

/* SOTTOTITOLO CENTRALE */
.map-subtitle {
  font-size: 13px;
  opacity: 0.75;
  color: #9ccff5;
  letter-spacing: 1px;
}


</style>
