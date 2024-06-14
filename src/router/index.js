import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WPMainView from "@/views/web-player/MainView.vue";
import APMainView from "@/views/admin-panel/MainView.vue";
import APArtistsView from "@/views/admin-panel/artists/ArtistsView.vue";
import AddArtistView from "@/views/web-player/artists/AddArtistView.vue";

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
    {
      path: '/admin-panel/artists',
      component: APArtistsView
    },
    {
      path: '/admin-panel/artists/create',
      component: AddArtistView
    },
  ]
})

export default router
