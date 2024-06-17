import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WPMainView from "@/views/web-player/MainView.vue";
import APMainView from "@/views/admin-panel/MainView.vue";
import APArtistsView from "@/views/admin-panel/artists/ArtistsView.vue";
import AddArtistView from "@/views/admin-panel/artists/AddArtistView.vue";
import APGenresView from "@/views/admin-panel/genres/GenresView.vue";
import AddGenreView from "@/views/admin-panel/genres/AddGenreView.vue";
import AddLabelView from "@/views/admin-panel/labels/AddLabelView.vue";
import APLabelsView from "@/views/admin-panel/labels/LabelsView.vue";
import APTracksView from "@/views/admin-panel/tracks/TracksView.vue";
import AddTrackView from "@/views/admin-panel/tracks/AddTrackView.vue";
import AddReleaseView from "@/views/admin-panel/releases/AddReleaseView.vue";
import APReleasesView from "@/views/admin-panel/releases/ReleasesView.vue";

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
    {
      path: '/admin-panel/genres',
      component: APGenresView
    },
    {
      path: '/admin-panel/genres/create',
      component: AddGenreView
    },
    {
      path: '/admin-panel/labels/create',
      component: AddLabelView
    },
    {
      path: '/admin-panel/labels',
      component: APLabelsView
    },
    {
      path: '/admin-panel/tracks',
      component: APTracksView
    },
    {
      path: '/admin-panel/tracks/create',
      component: AddTrackView
    },
    {
      path: '/admin-panel/releases/create',
      component: AddReleaseView
    },
    {
      path: '/admin-panel/releases',
      component: APReleasesView
    },
  ]
})

export default router
