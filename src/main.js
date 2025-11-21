import VChart from "vue-echarts";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .component("v-chart", VChart)
  .mount("#app");
