<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import {getReleases, searchReleasesByName} from "@/services/releases.js";
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import Loader from "@/components/Loader.vue";
import Player from "@/components/Web-player/Player.vue";
import ReleaseCard from "@/components/Web-player/ReleaseCard.vue";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";

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
  // Проверяем аутентификацию перед доступом к странице
  if (!userStore.requireAuth()) {
    return;
  }
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
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="flex flex-col" v-if="!isLoading">
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

          <div v-if="displayedReleases.length > 0">
            <ReleaseCard v-for="(release) in displayedReleases"
                         :id="release.id"
                         :title="release.title"
                         :release-type="release.releasesType"
                         :cover="release.cover"
            />
          </div>
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
    <Player/>
  </div>
</template>