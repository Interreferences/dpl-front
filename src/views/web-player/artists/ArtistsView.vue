<script setup>
import {ref, onMounted, onBeforeUnmount, onBeforeMount, computed} from 'vue';
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import Player from "@/components/Web-player/Player.vue";
import {getArtists, searchArtistsByName} from "@/services/artists.js";
import ArtistCard from "@/components/Web-player/ArtistCard.vue";
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const artists = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

onBeforeMount(() => {
  if (!userStore.requireAuth()) {
    return;
  }
});

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

const searchArtists = async () => {
  try {
    isLoading.value = true;
    const data = await searchArtistsByName(searchQuery.value, currentPage.value);
    artists.value = data.artists;
    totalPages.value = Math.ceil(data.total / 10);
  } catch (error) {
    console.error('Ошибка при поиске лейблов:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetArtists = async () => {
  searchQuery.value = '';
  currentPage.value = 1;
  await loadAllArtists(currentPage.value);
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    await loadAllArtists(currentPage.value);
  }
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    await loadAllArtists(currentPage.value);
  }
};

onMounted(async () => {
  await loadAllArtists(currentPage.value);
});


</script>
<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <div class="flex flex-col w-full h-full overflow-y-scroll">

        <div class="flex flex-col" v-if="!isLoading">
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
          </div>
        </div>
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
        <div class="flex items-center self-center mt-4 py-12">
          <button @click="previousPage" :disabled="currentPage === 1" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <span class="mx-12">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="rounded-full px-2 text-gray-300 shadow-md hover:text-neutral-800 xl:px-4 2xl:text-2xl 2xl:p-6 2xl:shadow-xl 3xl:text-3xl">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
    <Player />
  </div>
</template>