<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {getLabels, searchLabelsByName} from "@/services/api.js";
import LabelRow from "@/components/Admin-panel/LabelRow.vue";
import Loader from "@/components/Loader.vue";

const labels = ref([]);
const displayedLabels = ref([]); // Отображаемая порция лейблов
const currentIndex = ref(0); // Текущий индекс
const limit = ref(10); // Количество записей на порцию
const isLoading = ref(false); // Состояние загрузки данных
const initialLoading = ref(true); // Состояние первой загрузки данных
const scrollContainer = ref(null); // Ссылка на элемент прокрутки
const searchQuery = ref(''); // Значение поиска

const loadAllLabels = async () => {
  try {
    const data = await getLabels();
    return data;
  } catch (error) {
    throw error;
  }
};

const searchLabels = async () => {
  if (!searchQuery.value) return;
  try {
    const data = await searchLabelsByName(searchQuery.value);
    labels.value = data;
    displayedLabels.value = [];
    currentIndex.value = 0;
    loadMoreLabels();
  } catch (error) {
    console.error('Ошибка при поиске:', error);
  }
};

const resetLabels = async () => {
  searchQuery.value = '';
  try {
    labels.value = await loadAllLabels();
    displayedLabels.value = [];
    currentIndex.value = 0;
    loadMoreLabels();
  } catch (error) {
    console.error('Ошибка при сбросе:', error);
  }
};

const loadMoreLabels = () => {
  if (isLoading.value || currentIndex.value >= labels.value.length) return;

  isLoading.value = true;
  const newLabels = labels.value.slice(currentIndex.value, currentIndex.value + limit.value);
  displayedLabels.value = [...displayedLabels.value, ...newLabels];
  currentIndex.value += limit.value;
  isLoading.value = false;
};

const handleScroll = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
    loadMoreLabels();
  }
};

onMounted(async () => {
  try {
    labels.value = await loadAllLabels();
    loadMoreLabels(); // Отображаем первую порцию данных
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

      <div ref="scrollContainer" class="flex flex-col w-full overflow-y-scroll" :ref="scrollContainer">

        <div class="flex flex-col" v-if="!initialLoading">

          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">

            <div class="flex flex-row w-6/12">

              <button @click="resetLabels" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск" class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5" />
              <button @click="searchLabels" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>

            </div>

            <router-link to="/admin-panel/labels/create">
              <div class="rounded-md items-center p-2 flex text-lg flex-row shadow-md text-gray-300 hover:text-neutral-800 xl:text-xl 2xl:text-4xl 2xl:p-4 3xl:text-5xl 3xl:p-6">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2 hidden md:block">Добавить лейбл</span>
              </div>
            </router-link>

          </div>

          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Лейблы
          </div>

        </div>

        <div class="w-full flex items-center border-b border-gray-300 py-4 2xl:py-8" v-if="!initialLoading">

          <p class="w-1/5 text-center xl:text-2xl 2xl:text-4xl 3xl:text-5xl">#</p>
          <p class="w-2/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Название</p>
          <p class="w-2/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Дата создания</p>

        </div>

        <div v-if="displayedLabels.length > 0 && !initialLoading">

          <LabelRow v-for="(label, index) in displayedLabels" :key="label.id"
                    :index="index + 1" :id="label.id" :createdAt="label.createdAt" :name="label.name" />
        </div>

        <div v-else-if="!initialLoading && displayedLabels.length === 0">
          <p>Нет данных о лейблах</p>
        </div>
        <div v-if="isLoading && !initialLoading" class="py-4">
          <Loader />
        </div>

      </div>

    </div>

  </div>
</template>