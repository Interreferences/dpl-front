import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/auth/registration',
      name: 'Registration',
      component: () => import('@/views/auth/RegistrationView.vue')
    },
    {
      path: '/web-player/',
      name: 'IndexWeb-Player',
      component: () => import('@/views/web-player/MainView.vue')
    },
    {
      path: '/web-player/artists',
      name: 'Artists-Player',
      component: () => import('@/views/web-player/artists/ArtistsView.vue')
    },
    {
      path: '/web-player/artists/:id',
      name: 'Artist-Player',
      component: () => import('@/views/web-player/artists/ArtistView.vue')
    },
    {
      path: '/web-player/releases',
      name: 'Releases-Player',
      component: () => import('@/views/web-player/releases/ReleasesView.vue')
    },
    {
      path: '/web-player/releases/:id',
      name: 'Release-Player',
      component: () => import('@/views/web-player/releases/ReleaseView.vue')
    },
    {
      path: '/web-player/tracks',
      name: 'Tracks-Player',
      component: () => import('@/views/web-player/tracks/TracksView.vue')
    },
    {
      path: '/admin-panel/labels',
      name: 'Labels',
      component: () => import('@/views/admin-panel/labels/LabelsView.vue')
    },
    {
      path: '/admin-panel/labels/create',
      name: 'AddLabel',
      component: () => import('@/views/admin-panel/labels/AddLabelView.vue')
    },
    {
      path: '/admin-panel/labels/:id',
      name: 'Label',
      component: () => import('@/views/admin-panel/labels/LabelView.vue')
    },
    {
      path: '/admin-panel/labels/edit/:id',
      name: 'EditLabel',
      component: () => import('@/views/admin-panel/labels/EditLabelView.vue')
    },
    {
      path: '/admin-panel/genres/',
      name: 'Genres',
      component: () => import('@/views/admin-panel/genres/GenresView.vue')
    },
    {
      path: '/admin-panel/genres/edit/:id',
      name: 'EditGenre',
      component: () => import('@/views/admin-panel/genres/EditGenreView.vue')
    },
    {
      path: '/admin-panel/genres/create',
      name: 'AddGenre',
      component: () => import('@/views/admin-panel/genres/AddGenreView.vue')
    },
    {
      path: '/admin-panel/genres/:id',
      name: 'Genre',
      component: () => import('@/views/admin-panel/genres/GenreView.vue')
    },
    {
      path: '/admin-panel/artists/create',
      name: 'AddArtist',
      component: () => import('@/views/admin-panel/artists/AddArtistView.vue')
    },
    {
      path: '/admin-panel/artists',
      name: 'Artists',
      component: () => import('@/views/admin-panel/artists/ArtistsView.vue')
    },
    {
      path: '/admin-panel/artists/:id',
      name: 'Artist',
      component: () => import('@/views/admin-panel/artists/ArtistView.vue')
    },
    {
      path: '/admin-panel/artists/edit/:id',
      name: 'EditArtist',
      component: () => import('@/views/admin-panel/artists/EditArtist.vue')
    },  
    {
      path: '/admin-panel/tracks',
      name: 'Tracks',
      component: () => import('@/views/admin-panel/tracks/TracksView.vue')
    },
    {
      path: '/admin-panel/tracks/create',
      name: 'AddTrack',
      component: () => import('@/views/admin-panel/tracks/AddTrackView.vue')
    },
    {
      path: '/admin-panel/tracks/:id',
      name: 'Track',
      component: () => import('@/views/admin-panel/tracks/TrackView.vue')
    },
    {
      path: '/admin-panel/tracks/edit/:id',
      name: 'EditTrack',
      component: () => import('@/views/admin-panel/tracks/EditTrackView.vue')
    },
    {
      path: '/admin-panel/releases',
      name: 'Releases',
      component: () => import('@/views/admin-panel/releases/ReleasesView.vue')
    },
    {
      path: '/admin-panel/releases/create',
      name: 'AddRelease',
      component: () => import('@/views/admin-panel/releases/AddReleaseView.vue')
    },
    {
      path: '/admin-panel/releases/:id',
      name: 'Release',
      component: () => import('@/views/admin-panel/releases/ReleaseView.vue')
    },
    {
      path: '/admin-panel/releases/edit/:id',
      name: 'EditRelease',
      component: () => import('@/views/admin-panel/releases/EditReleaseView.vue')
    },
  ]
})

export default router