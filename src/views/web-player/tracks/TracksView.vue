<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import {getReleasedTracks, searchTracksByName,} from "@/services/tracks.js";
import {computed, onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import Loader from "@/components/Loader.vue";
import Player from "@/components/Web-player/Player.vue";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const tracks = ref([]);
const displayedTracks = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const tracksPerPage = 10;

onBeforeMount(() => {
  // Проверяем аутентификацию перед доступом к странице
  if (!userStore.requireAuth()) {
    return;
  }
});

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

const paginateTracks = () => {
  const start = (currentPage.value - 1) * tracksPerPage;
  const end = start + tracksPerPage;
  displayedTracks.value = tracks.value.slice(start, end);
};

const loadAllTracks = async () => {
  try {
    isLoading.value = true;
    const data = await getReleasedTracks();
    tracks.value = data;
    totalPages.value = Math.ceil(tracks.value.length / tracksPerPage);
    paginateTracks();
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
  } finally {
    isLoading.value = false;
  }
};

const searchTracks = async () => {
  try {
    isLoading.value = true;
    const data = await searchTracksByName(searchQuery.value);
    tracks.value = data; // Назначаем новые данные поиска переменной tracks
    totalPages.value = Math.ceil(tracks.value.length / tracksPerPage);
    currentPage.value = 1; // Сбрасываем текущую страницу
    paginateTracks();
  } catch (error) {
    console.error('Ошибка при поиске треков:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetTracks = async () => {
  searchQuery.value = '';
  currentPage.value = 1;
  await loadAllTracks();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    paginateTracks();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    paginateTracks();
  }
};

onMounted(async () => {
  await loadAllTracks();
});
</script>
<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!isLoading">
          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">
            <div class="flex flex-row w-6/12">
              <button @click="resetTracks"
                      class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск"
                     class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5"/>
              <button @click="searchTracks"
                      class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col">

          <div v-if="!isLoading" class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
            <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">#</div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="flex flex-col items-center w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">Название</div>
            <div class="invisible items-center xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl">Релиз</div>
            <div class="invisible items-center md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">Прослушиваний</div>
          </div>

          <div v-if="displayedTracks.length > 0 && !isLoading">
            <TrackEl
                v-for="(track, index) in displayedTracks"
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
        <div v-if="isLoading" class="py-4">
          <Loader/>
        </div>
        <div class="flex items-center self-center mt-4 py-12">
          <button @click="previousPage" :disabled="currentPage === 1"
                  class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <span class="mx-12">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
    <Player/>
  </div>
</template>