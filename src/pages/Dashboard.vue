<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import VChart from "vue-echarts";

const option = ref(null);

onMounted(async () => {
  // carica il geojson dalla cartella public
  const liguria = await fetch("/test_dashboard/liguria_istat.geojson")
    .then((r) => r.json());

  // registra la mappa
  echarts.registerMap("liguria", liguria);

  // opzioni mappa
  option.value = {
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
  };
});
</script>

<template>
  <div class="page">
    <h2 class="glow">Mappa Regione Liguria</h2>

    <v-chart v-if="option" :option="option" style="width:100%; height:600px;" />
  </div>
</template>
