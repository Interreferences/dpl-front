<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {getArtists, searchArtistsByName} from "@/services/api"; // Импортируем функцию getArtists
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import ArtistRow from "@/components/Admin-panel/ArtistRow.vue";
import Loader from "@/components/Loader.vue";

const artists = ref([]); // Полный список артистов
const displayedArtists = ref([]); // Отображаемая порция артистов
const currentIndex = ref(0); // Текущий индекс
const limit = ref(10); // Количество записей на порцию
const isLoading = ref(false); // Состояние загрузки данных
const initialLoading = ref(true); // Состояние первой загрузки данных
const scrollContainer = ref(null); // Ссылка на элемент прокрутки
const searchQuery = ref(''); // Значение поиска
const loadAllArtists = async () => {
  try {
    const data = await getArtists();
    return data;
  } catch (error) {
    throw error;
  }
};

const searchArtists = async () => {
  if (!searchQuery.value) return;
  try {
    const data = await searchArtistsByName(searchQuery.value);
    artists.value = data;
    displayedArtists.value = [];
    currentIndex.value = 0;
    loadMoreArtists();
  } catch (error) {
    console.error('Ошибка при поиске:', error);
  }
};

const resetArtists = async () => {
  searchQuery.value = '';
  try {
    artists.value = await loadAllArtists();
    displayedArtists.value = [];
    currentIndex.value = 0;
    loadMoreArtists();
  } catch (error) {
    console.error('Ошибка при сбросе:', error);
  }
};

const loadMoreArtists = () => {
  if (isLoading.value || currentIndex.value >= artists.value.length) return;

  isLoading.value = true;
  const newArtists = artists.value.slice(currentIndex.value, currentIndex.value + limit.value);
  displayedArtists.value = [...displayedArtists.value, ...newArtists];
  currentIndex.value += limit.value;
  isLoading.value = false;
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
    loadMoreArtists();
  }
};

// Загружаем всех артистов при монтировании компонента и отображаем первую порцию
onMounted(async () => {
  try {
    artists.value = await loadAllArtists();
    loadMoreArtists(); // Отображаем первую порцию данных
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
              <button @click="resetArtists" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск" class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5" />
              <button @click="searchArtists" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <router-link to="/admin-panel/artists/create">
              <div class="rounded-md items-center p-2 flex text-lg flex-row shadow-md text-gray-300 hover:text-neutral-800 xl:text-xl 2xl:text-4xl 2xl:p-4 3xl:text-5xl 3xl:p-6">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2 hidden md:block">Добавить артиста</span>
              </div>
            </router-link>
          </div>
          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Артисты
          </div>
        </div>
        <div class="w-full flex items-center border-b border-gray-300" v-if="!initialLoading">
          <p class="w-1/5 text-center md:w-2/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">#</p>
          <div class="w-2/5 py-2 md:w-2/12 xl:py-4 2xl:py-8 3x:py-12"></div>
          <p class="w-2/5 md:w-4/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Псевдоним</p>
          <p class="hidden md:block md:w-4/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Дата создания</p>
        </div>
        <div v-if="displayedArtists.length > 0 && !initialLoading">
          <ArtistRow v-for="(artist, index) in displayedArtists" :key="artist.id"
                     :index="index + 1" :id="artist.id" :name="artist.name"
                     :avatar="artist.avatar" :createdAt="artist.createdAt" />
        </div>
        <div v-else-if="!initialLoading && displayedArtists.length === 0">
          <p>Нет данных об артистах.</p>
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