<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import {getReleasedTracks, getReleases, searchReleasesByName, searchTracksByName,} from "@/services/api.js";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Loader from "@/components/Loader.vue";
import Player from "@/components/Web-player/Player.vue";
import ReleaseCard from "@/components/Web-player/ReleaseCard.vue";


const releases = ref([]); // Полный список треков
const displayedReleases = ref([]); // Отображаемая порция треков
const currentIndex = ref(0); // Текущий индекс
const limit = ref(10); // Количество записей на порцию
const isLoading = ref(false); // Состояние загрузки данных
const initialLoading = ref(true); // Состояние первой загрузки данных
const scrollContainer = ref(null); // Ссылка на элемент прокрутки
const searchQuery = ref(''); // Значение поиска

const loadAllReleases = async () => {
  try {
    const data = await getReleases();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw error;
  }
};

const searchReleases = async () => {
  if (!searchQuery.value) return;
  try {
    const data = await searchReleasesByName(searchQuery.value);
    releases.value = data;
    displayedReleases.value = [];
    currentIndex.value = 0;
    loadMoreTracks();
  } catch (error) {
    console.error('Ошибка при поиске:', error);
  }
};

const resetReleases = async () => {
  searchQuery.value = '';
  try {
    releases.value = await loadAllReleases();
    displayedReleases.value = [];
    currentIndex.value = 0;
    loadMoreReleases();
  } catch (error) {
    console.error('Ошибка при сбросе:', error);
  }
};

const loadMoreReleases = () => {
  if (isLoading.value || currentIndex.value >= releases.value.length) return;

  isLoading.value = true;
  const newReleases = releases.value.slice(currentIndex.value, currentIndex.value + limit.value);
  displayedReleases.value = [...displayedReleases.value, ...newReleases];
  currentIndex.value += limit.value;
  isLoading.value = false;
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
    loadMoreReleases();
  }
};

onMounted(async () => {
  try {
    releases.value = await loadAllReleases();
    console.log(releases);
    loadMoreReleases(); // Отображаем первую порцию данных
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
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div ref="scrollContainer" class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!initialLoading">
          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">
            <div class="flex flex-row w-6/12">
              <button @click="resetReleases"
                      class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск"
                     class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5"/>
              <button @click="searchReleases"
                      class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">

          <div v-if="displayedReleases.length > 0 && !initialLoading">
            <ReleaseCard v-for="(release, index) in displayedReleases"
                         :id="release.id"
                         :title="release.title"
                         :release-type="release.releasesType"
                         :cover="release.cover"
            />
          </div>
        </div>
      </div>
    </div>
    <Player/>
  </div>
</template>