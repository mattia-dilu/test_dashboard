import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import TimeSeries from '../pages/TimeSeries.vue'
import Prediction from '../pages/Prediction.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/time-series', component: TimeSeries },
  { path: '/prediction', component: Prediction }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
