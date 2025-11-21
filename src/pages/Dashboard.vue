<script setup>
import { ref } from "vue";
import * as echarts from "echarts";
import VChart from "vue-echarts";

// Import del GeoJSON ISTAT Liguria
import liguria from "../data/liguria_istat.geojson";

// Registrazione mappa
echarts.registerMap("liguria", liguria);

// Opzioni mappa
const option = ref({
  tooltip: {},
  geo: {
    map: "liguria",
    roam: true,
    itemStyle: {
      areaColor: "#0b0f17",
      borderColor: "#4fb4ff",
      borderWidth: 2
    },
    emphasis: {
      itemStyle: {
        areaColor: "#1a355e"
      }
    }
  }
});
</script>

<template>
  <div class="page">
    <h2 class="glow">Mappa Regione Liguria</h2>

    <!-- IMPORTANTE: qui usiamo il componente registrato -->
    <v-chart :option="option" style="width:100%; height:600px;" />
  </div>
</template>
