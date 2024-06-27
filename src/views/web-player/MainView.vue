<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Player from "@/components/Web-player/Player.vue";
import {onBeforeMount, computed, onMounted, ref} from 'vue';
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';
import ArtistCard from "@/components/Web-player/ArtistCard.vue";
import Loader from "@/components/Loader.vue";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import {getReleasedTracks, getTopTracks} from "@/services/tracks.js";
import {getArtists} from "@/services/artists.js";

const userStore = useUserStore();
const router = useRouter();

const tracks = ref([]);
const artists = ref([]);
const displayedTracks = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const tracksPerPage = 10;

onBeforeMount(() => {
  if (!userStore.requireAuth()) {
    return;
  }
});

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

const loadTracks = async () => {
  try {
    const data = await getTopTracks();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw error;
  }
};

const loadAllArtists = async (page = 1, limit = 10) => {
  try {
    isLoading.value = true;
    const data = await getArtists(page, limit);
    artists.value = data.artists;
    console.log(artists);
    totalPages.value = data.maxPages;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadAllArtists(currentPage.value);
  try {
    tracks.value = await loadTracks();
    console.log(tracks);
    isLoading.value = false;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="flex flex-col items-center md:flex-row md:justify-between md:p-6 md:items-baseline">

          <div v-if="userStore.isAuthenticated()"
               class="text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Добро пожаловать, {{ userStore.user.nickname }}!
          </div>

          <router-link v-if="isAdmin" to="/admin-panel/artists">
            <div class="flex items-center flex-row text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
              <i class="fa-solid fa-gear mr-2"></i>
              <p>Управление</p>
            </div>
          </router-link>
        </div>

        <div class="text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">Популярные треки</div>

        <div class="flex flex-col">
          <div v-if="!isLoading" class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
            <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">#</div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="flex flex-col items-center w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">Название</div>
            <div class="invisible items-center xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl">Релиз</div>
            <div class="invisible items-center md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">Прослушиваний</div>
          </div>
          <div v-if="tracks.length > 0 && !isLoading">
            <TrackEl
                v-for="(track, index) in tracks"
                :key="track.id"
                :index="index + 1"
                :id="track.id"
                :title="track.title"
                :artists="track.artists"
                :listens="track.listens"
                :release="track.release"
                :explicit_content="track.explicit_content"
                :audio="track.audio"
            />
          </div>
        </div>
        <div class="text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">Артисты</div>
        <div class="flex flex-wrap">
          <ArtistCard v-for="artist in artists"
                      :key="artist.id"
                      :id="artist.id"
                      :avatar="artist.avatar"
                      :name="artist.name" />
        </div>
        <div v-if="isLoading" class="py-4">
          <Loader />
        </div>
      </div>
    </div>
    <Player/>
  </div>
</template>
