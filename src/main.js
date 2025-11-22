import VChart from "vue-echarts";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './styles.css'
createApp(App)
  .use(router)
  .component("v-chart", VChart)
  .mount("#app");
