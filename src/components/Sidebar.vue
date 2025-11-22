<template>
  <div class="sidebar">

    <div class="logo-box">
      <h2 class="logo">EO-DASH</h2>
      <div class="logo-sub">Earth Observation Suite</div>
    </div>

    <div class="menu">

      <router-link class="item" to="/" exact-active-class="active">
        <i class="ph ph-presentation-chart"></i>
        Overview
      </router-link>

      <router-link class="item" to="/time-series" exact-active-class="active">
        <i class="ph ph-satellite"></i>
        Time Series
      </router-link>

      <router-link class="item" to="/prediction" exact-active-class="active">
        <i class="ph ph-chart-line-up"></i>
        Prediction
      </router-link>

    </div>

  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: rgba(10, 15, 25, 0.8);
  border-right: 1px solid rgba(56, 189, 248, 0.12);
  padding: 25px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(6px);
}

.logo-box {
  margin-bottom: 45px;
}

.logo {
  font-size: 26px;
  color: #38BDF8;
  margin-bottom: 6px;
  text-shadow: 0 0 8px #38BDF8;
}

.logo-sub {
  font-size: 12px;
  color: #9ccff5;
  opacity: 0.7;
  letter-spacing: 0.5px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  color: #c8dbff;
  text-decoration: none;
  font-size: 15px;
  transition: 0.2s ease;
}

.item i {
  font-size: 18px;
}

.item:hover {
  background: rgba(56, 189, 248, 0.15);
  color: #38BDF8;
  transform: translateX(4px);
}

.active {
  background: rgba(56, 189, 248, 0.22);
  color: #38BDF8;
  border-left: 3px solid #38BDF8;
  padding-left: 9px;
}
</style>
