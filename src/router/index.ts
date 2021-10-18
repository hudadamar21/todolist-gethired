import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/pages/dashboard.vue";
import ItemList from "@/pages/itemlist.vue";

const routes = [
  { path: '/', component: Dashboard },
  { path: '/detail/:id', component: ItemList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router