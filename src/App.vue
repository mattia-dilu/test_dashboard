<template>
  <div class="layout">
    <Sidebar />
    <div class="content">
      <HeaderBar />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderBar from './components/HeaderBar.vue'
</script>

<style>
.layout {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
