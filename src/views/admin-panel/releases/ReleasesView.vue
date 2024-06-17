<script setup>
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getReleases} from "@/services/api.js";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";

const releases = ref([]); // Полный список артистов
const displayedReleases = ref([]); // Отображаемая порция артистов
const currentIndex = ref(0); // Текущий индекс
const limit = ref(10); // Количество записей на порцию
const isLoading = ref(false); // Состояние загрузки данных
const initialLoading = ref(true); // Состояние первой загрузки данных
const scrollContainer = ref(null); // Ссылка на элемент прокрутки

const loadAllReleases = async () => {
  try {
    const data = await getReleases();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
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
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <div ref="scrollContainer" class="flex flex-col w-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!initialLoading">
          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">
            <div class="flex flex-row w-6/12">
              <button class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input type="text" placeholder="Поиск" class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5" />
              <button class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <router-link to="/admin-panel/releases/create">
              <div class="rounded-md items-center p-2 flex text-lg flex-row shadow-md text-gray-300 hover:text-neutral-800 xl:text-xl 2xl:text-4xl 2xl:p-4 3xl:text-5xl 3xl:p-6">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2 hidden md:block">Добавить релиз</span>
              </div>
            </router-link>
          </div>
          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Релизы
          </div>
        </div>

        <div class="w-full flex items-center border-b border-gray-300 py-4" v-if="!initialLoading">

          <p class="w-1/5 text-center md:w-1/5 lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">#</p>
          <div class="w-1/5 md:w-1/5 lg:w-1/6 2xl:w-1/12"></div>
          <p class="w-3/5 text-center md:w-2/5 lg:w-1/6 lg:text-left xl:text-xl 2xl:w-2/12  3xl:text-4xl">Название</p>
          <p class="hidden md:block md:w-1/5 lg:w-2/6 xl:text-xl 2xl:w-3/12  3xl:text-4xl">Исполнители</p>
          <p class="hidden 2xl:block 2xl:w-3/12 2xl:text-xl 3xl:text-4xl">Лейбл</p>
          <p class="hidden 2xl:block 2xl:w-1/12 2xl:text-xl 3xl:text-4xl">Опубликовано</p>
          <p class="hidden lg:block lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">Дата релиза</p>
          <p class="hidden 2xl:w-1/12">Тип релиза</p>

        </div>

        <div v-if="displayedReleases.length > 0 && !initialLoading">

          <ReleaseRow v-for="(release, index) in displayedReleases" :key="release.id"
                      :index="index + 1" :id="release.id" :title="release.title"
                      :release-date="release.releaseDate" :published="release.published"
                      :labels="release.labels" :artists="release.artists" :cover="release.cover"
                      :releasesType="release.releasesType"
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