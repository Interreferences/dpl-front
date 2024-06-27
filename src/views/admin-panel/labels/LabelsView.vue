<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {getLabels, searchLabelsByName} from "@/services/labels.js";
import LabelRow from "@/components/Admin-panel/LabelRow.vue";
import Loader from "@/components/Loader.vue";
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const labels = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

onBeforeMount(() => {
  if (!userStore.isAuthenticated() || !isAdmin.value) {
    router.push('/auth/login');
  }
});

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

const loadAllLabels = async (page = 1, limit = 10) => {
  try {
    isLoading.value = true;
    const data = await getLabels(page, limit);
    labels.value = data.labels;
    totalPages.value = data.maxPages;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  } finally {
    isLoading.value = false;
  }
};

const searchLabels = async () => {
  try {
    isLoading.value = true;
    const data = await searchLabelsByName(searchQuery.value, currentPage.value);
    labels.value = data.labels;
    totalPages.value = Math.ceil(data.total / 10);
  } catch (error) {
    console.error('Ошибка при поиске лейблов:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetLabels = async () => {
  searchQuery.value = '';
  currentPage.value = 1;
  await loadAllLabels(currentPage.value);
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    await loadAllLabels(currentPage.value);
  }
};

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    await loadAllLabels(currentPage.value);
  }
};

onMounted(async () => {
  await loadAllLabels(currentPage.value);
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
        <div v-if="!isLoading" class="w-full flex items-center border-b border-gray-300 py-4 2xl:py-8">
          <p class="w-1/5 text-center xl:text-2xl 2xl:text-4xl 3xl:text-5xl">#</p>
          <p class="w-2/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Название</p>
        </div>
        <div v-if="labels.length > 0 && !isLoading">
          <LabelRow v-for="(label, index) in labels" :key="label.id" :index="index + 1" :id="label.id"
                    :name="label.name"/>
        </div>
        <div v-else-if="!isLoading && labels.length === 0">
          <p>Нет данных о лейблах</p>
        </div>
        <div v-if="isLoading" class="py-4">
          <Loader/>
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
  </div>
</template>
