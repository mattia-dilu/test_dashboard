<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title">Earth Observation</h1>
    </div>

    <div class="status-box">
      <div class="status-led"></div>
      <span class="status-text">SYSTEM ONLINE</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 18px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(10, 15, 25, 0.6);
  backdrop-filter: blur(6px);

  border-bottom: 1px solid rgba(56, 189, 248, 0.15);
}

/* TITLE */
.title-box {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 32px;
  color: #d8eaff;
  margin: 0;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 13px;
  color: #9ccff5;
  opacity: 0.7;
  margin-top: 3px;
  letter-spacing: 0.7px;
}

/* STATUS BOX */
.status-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;

  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.28);
  border-radius: 6px;

  font-size: 14px;
}

/* ANIMATED LED */
.status-led {
  width: 10px;
  height: 10px;
  background: #2bff88;
  border-radius: 50%;

  box-shadow: 0 0 10px #2bff88;

  animation: pulse 2.4s infinite ease-in-out;
opacity: 0.85;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 6px #2bff88;
  }
  50% {
    transform: scale(1.25);
    box-shadow: 0 0 16px #2bff88;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 6px #2bff88;
  }
}

.status-text {
  color: #c8ffdf;
  letter-spacing: 1px;
  font-weight: 600;
}
</style>
