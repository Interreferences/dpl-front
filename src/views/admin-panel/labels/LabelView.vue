<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {deleteLabel, getLabelById} from "@/services/api"; // Импортируем функцию getArtistById
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";
import Modal from "@/components/Admin-panel/Modal.vue";

const label = ref(null); // Данные артиста
const initialLoading = ref(true); // Состояние первой загрузки данных
const showDeleteModal = ref(false);

const route = useRoute(); // Получаем маршрут
const router = useRouter();
const labelId = route.params.id; // Извлекаем id из параметров маршрута

const loadLabel = async (id) => {
  try {
    const data = await getLabelById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  try {
    label.value = await loadLabel(labelId);
    console.log(label);
    initialLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const handleDeleteLabel = async () => {
  try {
    await deleteLabel(labelId);
    router.push('/admin-panel/labels'); // Перенаправляем пользователя после удаления
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <Loader v-if="initialLoading" />
      <div v-else class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="w-full bg-blue-900 p-12 flex justify-between items-start">
          <p class="text-white ml-2 font-bold text-2xl md:text-4xl md:ml-4 xl:text-6xl xl:ml-6 2xl:text-8xl 2xl:ml-8 3xl:text-9xl 3xl:ml-12">
            {{ label.name }}
          </p>
          <div class="flex items-start">
            <button @click="showDeleteModal = true" class="mt-2 px-2 py-2 bg-red-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
              <i class="fa-solid fa-trash"></i>
            </button>
            <router-link :to="`/admin-panel/labels/edit/${labelId}`">
              <button class="mt-2 px-2 py-2 bg-orange-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </router-link>
          </div>
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Релизы
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


        <div v-if="label.releases && !initialLoading">

          <ReleaseRow v-for="(release, index) in label.releases" :key="release.id"
                      :id="release.id" :title="release.title" :release-date="release.releaseDate"
                      :published="release.published" :releasesType="release.releasesType" :labels="release.labels"
                      :artists="release.artists" :cover="release.cover" :index="index" />
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showDeleteModal"
         title="Подтвердите удаление"
         message="Вы уверены, что хотите удалить этого артиста? Это действие не может быть отменено."
         @cancel="showDeleteModal = false"
         @confirm="handleDeleteLabel" />
</template>