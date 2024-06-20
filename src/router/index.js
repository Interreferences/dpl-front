import { createRouter, createWebHistory } from 'vue-router'
import WPMainView from "@/views/web-player/MainView.vue";
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
import APArtistView from "@/views/admin-panel/artists/ArtistView.vue";
import GenreView from "@/views/admin-panel/genres/GenreView.vue";
import LabelView from "@/views/admin-panel/labels/LabelView.vue";
import APReleaseView from "@/views/admin-panel/releases/ReleaseView.vue";
import APTrackView from "@/views/admin-panel/tracks/TrackView.vue";
import WPArtistsView from "@/views/web-player/artists/ArtistsView.vue";
import WPTracksView from "@/views/web-player/tracks/TracksView.vue";
import EditArtist from "@/views/admin-panel/artists/EditArtist.vue";
import EditGenreView from "@/views/admin-panel/genres/EditGenreView.vue";
import EditLabelView from "@/views/admin-panel/labels/EditLabelView.vue";
import EditReleaseView from "@/views/admin-panel/releases/EditReleaseView.vue";
import EditTrackView from "@/views/admin-panel/tracks/EditTrackView.vue";
import WPReleasesView from "@/views/web-player/releases/ReleasesView.vue";
import WPTrackView from "@/views/web-player/tracks/TrackView.vue";
import WPReleaseView from "@/views/web-player/releases/ReleaseView.vue";
import WPArtistView from "@/views/web-player/artists/ArtistView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: WPMainView
    },
    {
      path: '/admin-panel/artists',
      component: APArtistsView
    },
    {
      path: '/admin-panel/tracks/edit/',
      component: EditTrackView,
      props: true
    },
    {
      path: '/admin-panel/artists/create',
      component: AddArtistView
    },
    {
      path: '/admin-panel/artists/edit/',
      component: EditArtist,
      props: true
    },
    {
      path: '/admin-panel/genres/edit/',
      component: EditGenreView,
      props: true
    },
    {
      path: '/admin-panel/labels/edit/',
      component: EditLabelView,
      props: true
    },
    {
      path: '/admin-panel/releases/edit/',
      component: EditReleaseView,
      props: true
    },
    {
      path: '/admin-panel/artists/',
      component: APArtistView
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
      path: '/admin-panel/releases/create',
      component: AddReleaseView
    },
    {
      path: '/admin-panel/releases',
      component: APReleasesView
    },
    {
      path: '/admin-panel/genres/',
      component: GenreView
    },
    {
      path: '/admin-panel/labels/',
      component: LabelView
    },
    {
      path: '/admin-panel/releases/',
      component: APReleaseView
    },
    {
      path: '/admin-panel/tracks/',
      component: APTrackView
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
      path: '/artists',
      component: WPArtistsView
    },
    {
      path: '/tracks',
      component: WPTracksView
    },
    {
      path: '/releases',
      component: WPReleasesView
    },
    {
      path: '/tracks/',
      component: WPTrackView
    },
    {
      path: '/releases/',
      component: WPReleaseView
    },
    {
      path: '/artists/',
      component: WPArtistView
    },
  ]
})

export default router