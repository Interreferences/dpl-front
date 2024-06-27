<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {deleteGenre, getGenreById} from "@/services/genres.js";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import Modal from "@/components/Admin-panel/Modal.vue";

const genre = ref(null);
const initialLoading = ref(true);
const showDeleteModal = ref(false);

const router = useRouter();
const route = useRoute();
const genreId = route.params.id;

const loadGenre = async (id) => {
  try {
    const data = await getGenreById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  try {
    genre.value = await loadGenre(genreId);
    initialLoading.value = false;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const handleDeleteGenre = async () => {
  try {
    await deleteGenre(genreId);
    router.push('/admin-panel/genres');
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
        <div class="w-full bg-green-900 p-12 flex justify-between items-start">
          <p class="text-white font-bold text-2xl md:text-4xl xl:text-6xl 2xl:text-8xl 3xl:text-9xl 3xl:ml-12">
            {{ genre.name }}
          </p>
          <div class="flex items-start">
            <button @click="showDeleteModal = true" class="mt-2 px-2 py-2 bg-red-600 text-white rounded text-xs md:text-lg 2xl:text-2xl 3xl:text-4xl">
              <i class="fa-solid fa-trash"></i>
            </button>
            <router-link :to="`/admin-panel/genres/edit/${genreId}`">
              <button class="mt-2 ml-4 px-2 py-2 bg-orange-600 text-white rounded text-xs md:text-lg 2xl:text-2xl 3xl:text-4xl">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </router-link>
          </div>
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Треки
        </div>
        <div class="w-full flex items-center border-b border-gray-300 p-4 3xl:p-6" v-if="!initialLoading">
          <p class="w-1/6 text-center md:w-1/12 xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">#</p>
          <p class="w-3/6 text-center md:w-5/12 xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Название</p>
          <p class="hidden xl:block xl:w-2/12 xl:text-center 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Исполнитель</p>
          <p class="w-2/6 md:w-5/12 xl:w-3/12 2xl:w-2/12 2xl:text-xl 3xl:w-3/12 3xl:text-3xl">Аудио</p>
          <p class="hidden xl:block xl:w-1/12 xl:text-center 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">Прослушиваний</p>
          <p class="hidden md:block md:w-1/12 md:text-center xl:w-1/12 2xl:text-xl 2xl:w-1/12 3xl:w-1/12 3xl:text-3xl">EC</p>
          <p class="hidden 3xl:block 3xl:w-1/12 2xl:text-xl 3xl:text-center 3xl:text-3xl">Дата создания</p>
        </div>
        <div v-if="genre.tracks && genre.tracks.length > 0 && !initialLoading">
          <TrackRow v-for="(track, index) in genre.tracks" :key="track.id"
                    :index="index" :id="track.id" :title="track.title" :artists="track.artists"
                    :listens="track.listens" :genre="track.genre" :release="track.release"
                    :explicit_content="track.explicit_content" :createdAt="track.createdAt" :audio="track.audio" />
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showDeleteModal"
         title="Подтвердите удаление"
         message="Вы уверены, что хотите удалить этот жанр? Это действие не может быть отменено."
         @cancel="showDeleteModal = false"
         @confirm="handleDeleteGenre" />
</template>