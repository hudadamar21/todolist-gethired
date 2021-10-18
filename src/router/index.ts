import { createRouter, createWebHistory } from 'vue-router'
import dashboard from "@/pages/dashboard.vue";
import detail from "@/pages/detail.vue";

const routes = [
  { path: '/', component: dashboard },
  { path: '/detail/:id', component: detail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router