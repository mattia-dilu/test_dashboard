<template>
  <div class="page">
    <h2 class="glow">Overview</h2>
    <div class="card">
      <EOChart />
    </div>
  </div>
</template>

<script setup>
import EOChart from '../components/EOChart.vue'
</script>

<style scoped>
.page { padding: 20px; }
</style>
