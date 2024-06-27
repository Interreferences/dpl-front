<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { getReleases, searchReleasesByName } from "@/services/releases.js";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";
import Loader from "@/components/Loader.vue";
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const releases = ref([]);
const displayedReleases = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const releasesPerPage = 10;

onBeforeMount(() => {
  if (!userStore.isAuthenticated() || !isAdmin.value) {
    router.push('/');
  }
});

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

const paginateReleases = () => {
  const start = (currentPage.value - 1) * releasesPerPage;
  const end = start + releasesPerPage;
  displayedReleases.value = releases.value.slice(start, end);
};

const loadAllReleases = async () => {
  try {
    isLoading.value = true;
    const data = await getReleases();
    releases.value = data.rows;
    console.log(releases);
    console.log(data);
    totalPages.value = Math.ceil(releases.value.length / releasesPerPage);
    paginateReleases();
  } catch (error) {
    console.error('Ошибка при загрузке релизов:', error);
  } finally {
    isLoading.value = false;
  }
};

const searchReleases = async () => {
  try {
    isLoading.value = true;
    const data = await searchReleasesByName(searchQuery.value);
    releases.value = data;
    totalPages.value = Math.ceil(releases.value.length / releasesPerPage);
    currentPage.value = 1;
    paginateReleases();
  } catch (error) {
    console.error('Ошибка при поиске треков:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetReleases = async () => {
  searchQuery.value = '';
  currentPage.value = 1;
  await loadAllReleases();
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    paginateReleases();
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    paginateReleases();
  }
};

onMounted(async () => {
  await loadAllReleases();
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <div class="flex flex-col w-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!isLoading">
          <div class="flex flex-row justify-between p-2 md:p-4 2xl:p-8 w-full">
            <div class="flex flex-row w-6/12">
              <button @click="resetReleases" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <input v-model="searchQuery" type="text" placeholder="Поиск" class="w-20 border-2 border-gray-300 mx-4 rounded-lg px-2 md:w-48 xl:w-64 2xl:w-auto 2xl:mx-8 2xl:text-3xl 3xl:w-3/5" />
              <button @click="searchReleases" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-x 3xl:text-3xl">
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

        <div  v-if="!isLoading" class="w-full flex items-center border-b border-gray-300 py-4">

          <p class="w-1/5 text-center md:w-1/5 lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">#</p>
          <div class="w-1/5 md:w-1/5 lg:w-1/6 2xl:w-1/12"></div>
          <p class="w-3/5 text-center md:w-2/5 lg:w-1/6 lg:text-left xl:text-xl 2xl:w-2/12  3xl:text-4xl">Название</p>
          <p class="hidden md:block md:w-1/5 lg:w-2/6 xl:text-xl 2xl:w-3/12  3xl:text-4xl">Исполнители</p>
          <p class="hidden 2xl:block 2xl:w-3/12 2xl:text-xl 3xl:text-4xl">Лейбл</p>
          <p class="hidden 2xl:block 2xl:w-1/12 2xl:text-xl 3xl:text-4xl">Опубликовано</p>
          <p class="hidden lg:block lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">Дата релиза</p>
          <p class="hidden 2xl:w-1/12">Тип релиза</p>

        </div>

        <div v-if="displayedReleases.length > 0 && !isLoading">

          <ReleaseRow v-for="(release, index) in displayedReleases" :key="release.id"
                      :index="index" :id="release.id" :title="release.title"
                      :release-date="release.releaseDate" :labels="release.labels" :artists="release.artists" :cover="release.cover"
                      :releasesType="release.releasesType"
          />

        </div>

        <div v-else-if="!isLoading && displayedReleases.length === 0">
          <p>Нет данных о релизах.</p>
        </div>
        <div v-if="isLoading">
          <Loader />
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
  </div>
</template>