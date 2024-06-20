import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/web-player/MainView.vue')
    },
    {
      path: '/admin-panel/artists',
      component: () => import('@/views/admin-panel/artists/ArtistsView.vue')
    },
    {
      path: '/admin-panel/tracks/edit/:id',
      component: () => import('@/views/admin-panel/tracks/EditTrackView.vue'),
      props: true
    },
    {
      path: '/admin-panel/artists/create',
      component: () => import('@/views/admin-panel/artists/AddArtistView.vue')
    },
    {
      path: '/admin-panel/artists/edit/:id',
      component: () => import('@/views/admin-panel/artists/EditArtist.vue'),
      props: true
    },
    {
      path: '/admin-panel/genres/edit/:id',
      component: () => import('@/views/admin-panel/genres/EditGenreView.vue'),
      props: true
    },
    {
      path: '/admin-panel/labels/edit/:id',
      component: () => import('@/views/admin-panel/labels/EditLabelView.vue'),
      props: true
    },
    {
      path: '/admin-panel/releases/edit/:id',
      component: () => import('@/views/admin-panel/releases/EditReleaseView.vue'),
      props: true
    },
    {
      path: '/admin-panel/artists/:id',
      component: () => import('@/views/admin-panel/artists/ArtistView.vue')
    },
    {
      path: '/admin-panel/genres',
      component: () => import('@/views/admin-panel/genres/GenresView.vue')
    },
    {
      path: '/admin-panel/genres/create',
      component: () => import('@/views/admin-panel/genres/AddGenreView.vue')
    },
    {
      path: '/admin-panel/labels/create',
      component: () => import('@/views/admin-panel/labels/AddLabelView.vue')
    },
    {
      path: '/admin-panel/labels',
      component: () => import('@/views/admin-panel/labels/LabelsView.vue')
    },
    {
      path: '/admin-panel/releases/create',
      component: () => import('@/views/admin-panel/releases/AddReleaseView.vue')
    },
    {
      path: '/admin-panel/releases',
      component: () => import('@/views/admin-panel/releases/ReleasesView.vue')
    },
    {
      path: '/admin-panel/genres/:id',
      component: () => import('@/views/admin-panel/genres/GenreView.vue')
    },
    {
      path: '/admin-panel/labels/:id',
      component: () => import('@/views/admin-panel/labels/LabelView.vue')
    },
    {
      path: '/admin-panel/releases/:id',
      component: () => import('@/views/admin-panel/releases/ReleaseView.vue')
    },
    {
      path: '/admin-panel/tracks/:id',
      component: () => import('@/views/admin-panel/tracks/TrackView.vue')
    },
    {
      path: '/admin-panel/tracks',
      component: () => import('@/views/admin-panel/tracks/TracksView.vue')
    },
    {
      path: '/admin-panel/tracks/create',
      component: () => import('@/views/admin-panel/tracks/AddTrackView.vue')
    },
    {
      path: '/artists',
      component: () => import('@/views/web-player/artists/ArtistsView.vue')
    },
    {
      path: '/tracks',
      component: () => import('@/views/web-player/tracks/TracksView.vue')
    },
    {
      path: '/releases',
      component: () => import('@/views/web-player/releases/ReleasesView.vue')
    },
    {
      path: '/tracks/:id',
      component: () => import('@/views/web-player/tracks/TrackView.vue')
    },
    {
      path: '/releases/:id',
      component: () => import('@/views/web-player/releases/ReleaseView.vue')
    },
    {
      path: '/artists/:id',
      component: () => import('@/views/web-player/artists/ArtistView.vue')
    },
  ]
})

export default router
