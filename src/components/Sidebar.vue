<template>
  <div class="sidebar">
    <h2 class="logo">EO-DASH</h2>

    <router-link class="item" to="/">📊 Overview</router-link>
    <router-link class="item" to="/time-series">🛰 Time Series</router-link>
    <router-link class="item" to="/prediction">🔮 Prediction</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #0e141f;
  border-right: 1px solid rgba(100, 140, 255, 0.2);
  padding: 20px;
}
.logo {
  color: #4fb4ff;
  margin-bottom: 40px;
}
.item {
  display: block;
  color: #c8dbff;
  margin: 15px 0;
  text-decoration: none;
}
.item:hover {
  color: #4fb4ff;
}
</style>
