import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WPMainView from "@/views/web-player/MainView.vue";
import APMainView from "@/views/admin-panel/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/web-player/',
      component: WPMainView
    },
    {
      path: '/admin-panel/',
      component: APMainView
    },
  ]
})

export default router
