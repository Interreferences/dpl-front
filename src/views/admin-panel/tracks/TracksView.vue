<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {getTracks, searchTracksByName,} from "@/services/api.js";
import { onBeforeUnmount, onMounted, ref } from "vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import Loader from "@/components/Loader.vue";

const tracks = ref([]); // Полный список треков
const displayedTracks = ref([]); // Отображаемая порция треков
const currentIndex = ref(0); // Текущий индекс
const limit = ref(10); // Количество записей на порцию
const isLoading = ref(false); // Состояние загрузки данных
const initialLoading = ref(true); // Состояние первой загрузки данных
const scrollContainer = ref(null); // Ссылка на элемент прокрутки
const searchQuery = ref(''); // Значение поиска

const loadAllTracks = async () => {
  try {
    const data = await getTracks();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw error;
  }
};

const searchTracks = async () => {
  if (!searchQuery.value) return;
  try {
    const data = await searchTracksByName(searchQuery.value);
    tracks.value = data;
    displayedTracks.value = [];
    currentIndex.value = 0;
    loadMoreTracks();
  } catch (error) {
    console.error('Ошибка при поиске:', error);
  }
};

const resetTracks = async () => {
  searchQuery.value = '';
  try {
    tracks.value = await loadAllTracks();
    displayedTracks.value = [];
    currentIndex.value = 0;
    loadMoreTracks();
  } catch (error) {
    console.error('Ошибка при сбросе:', error);
  }
};

const loadMoreTracks = () => {
  if (isLoading.value || currentIndex.value >= tracks.value.length) return;

  isLoading.value = true;
  const newTracks = tracks.value.slice(currentIndex.value, currentIndex.value + limit.value);
  displayedTracks.value = [...displayedTracks.value, ...newTracks];
  currentIndex.value += limit.value;
  isLoading.value = false;
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
    loadMoreTracks();
  }
};

onMounted(async () => {
  try {
    tracks.value = await loadAllTracks();
    console.log(tracks);
    loadMoreTracks(); // Отображаем первую порцию данных
    scrollContainer.value.addEventListener('scroll', handleScroll);
    initialLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

onBeforeUnmount(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <div ref="scrollContainer" class="flex flex-col w-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!initialLoading">
          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">
            <div class="flex flex-row w-6/12">
              <button @click="resetTracks" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск" class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5" />
              <button @click="searchTracks" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <router-link to="/admin-panel/tracks/create">
              <div class="rounded-md items-center p-2 flex text-lg flex-row shadow-md text-gray-300 hover:text-neutral-800 xl:text-xl 2xl:text-4xl 2xl:p-4 3xl:text-5xl 3xl:p-6">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2 hidden md:block">Добавить трек</span>
              </div>
            </router-link>
          </div>
          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Треки
          </div>
        </div>
        <div class="w-full flex items-center border-b border-gray-300 p-4 3xl:p-6" v-if="!initialLoading">
          <p class="w-1/6 text-center md:w-1/12 xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">#</p>
          <p class="w-3/6 text-center md:w-5/12 xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Название</p>
          <p class="hidden xl:block xl:w-2/12 xl:text-center 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Исполнитель</p>
          <p class="w-2/6 md:w-5/12 xl:w-3/12 2xl:w-2/12 2xl:text-xl 3xl:w-3/12 3xl:text-3xl">Аудио</p>
          <p class="hidden xl:block xl:w-1/12 xl:text-center 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">Прослушиваний</p>
          <p class="hidden md:block md:w-1/12 md:text-center xl:w-1/12 2xl:text-xl 2xl:w-1/12 3xl:w-1/12 3xl:text-3xl"><i class="fa-solid fa-e"></i></p>
          <p class="hidden 3xl:block 3xl:w-1/12 2xl:text-xl 3xl:text-center 3xl:text-3xl">Дата создания</p>
        </div>

        <div v-if="displayedTracks.length > 0 && !initialLoading">
          <TrackRow
              v-for="(track, index) in displayedTracks"
              :key="track.id"
              :index="index"
              :id="track.id"
              :title="track.title"
              :artists="track.artists"
              :listens="track.listens"
              :genre="track.genre"
              :release="track.release"
              :explicit_content="track.explicit_content"
              :createdAt="track.createdAt"
              :audio="track.audio"
          />
        </div>

        <div v-else-if="!initialLoading && displayedTracks.length === 0">
          <p>Нет данных о треках.</p>
        </div>
        <div v-if="isLoading && !initialLoading" class="py-4">
          <Loader />
        </div>
        <div v-if="initialLoading">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

