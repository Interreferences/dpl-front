<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute} from 'vue-router';
import {deleteTrack, getTrackById} from "@/services/tracks.js";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";
import ArtistRow from "@/components/Admin-panel/ArtistRow.vue";
import router from "@/router/index.js";
import Modal from "@/components/Admin-panel/Modal.vue";

const track = ref(null);
const initialLoading = ref(true);
const showDeleteModal = ref(false);

const route = useRoute();
const trackId = route.params.id;

const loadTrack = async (id) => {
  try {
    const data = await getTrackById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  try {
    track.value = await loadTrack(trackId);
    console.log(track);
    initialLoading.value = false;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const handleDeleteTrack = async () => {
  try {
    await deleteTrack(trackId);
    router.push('/admin-panel/tracks');
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
        <div class="h-2/6 w-full bg-neutral-600">
          <div class="inset-0 flex justify-between items-center flex-row p-2 2xl:p-6 3xl:p-24">
            <div class="items-center">
              <p class="text-white ml-2 font-bold text-2xl md:text-4xl md:ml-4 xl:text-6xl xl:ml-6 2xl:text-8xl 2xl:ml-8 3xl:text-9xl 3xl:ml-12">
                {{ track.title }}
              </p>
            </div>
            <div class="top-0 right-0">
              <button @click="showDeleteModal = true" class="mt-2 px-2 py-2 bg-red-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
                <i class="fa-solid fa-trash"></i>
              </button>
              <router-link :to="`/admin-panel/tracks/edit/${trackId}`">
                <button class="mt-2 px-2 py-2 bg-orange-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <div>

          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Трек
          </div>

          <div class="w-full flex items-center border-b border-gray-300 p-4 3xl:p-6" v-if="!initialLoading">
            <p class="w-1/6 text-center md:w-1/12 xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">#</p>
            <p class="w-3/6 text-center md:w-5/12 xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Название</p>
            <p class="hidden xl:block xl:w-2/12 xl:text-center 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Исполнитель</p>
            <p class="w-2/6 md:w-5/12 xl:w-3/12 2xl:w-2/12 2xl:text-xl 3xl:w-3/12 3xl:text-3xl">Аудио</p>
            <p class="hidden xl:block xl:w-1/12 xl:text-center 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">Прослушиваний</p>
            <p class="hidden md:block md:w-1/12 md:text-center xl:w-1/12 2xl:text-xl 2xl:w-1/12 3xl:w-1/12 3xl:text-3xl"><i class="fa-solid fa-e"></i></p>
            <p class="hidden 3xl:block 3xl:w-1/12 2xl:text-xl 3xl:text-center 3xl:text-3xl">Дата создания</p>
          </div>

          <TrackRow
              v-if="track"
              :index=0
              :id="track.id"
              :title="track.title"
              :artists="track.artists"
              :listens="track.listens"
              :genre="track.genre"
              :release="track.release"
              :explicit_content="track.explicit_content"
              :createdAt="track.createdAt"
              :audio="track.audio"
          />


        </div>


        <div>
          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Артисты
          </div>

          <div class="w-full flex items-center border-b border-gray-300" v-if="!initialLoading">
            <p class="w-1/5 text-center md:w-2/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">#</p>
            <div class="w-2/5 py-2 md:w-2/12 xl:py-4 2xl:py-8 3x:py-12"></div>
            <p class="w-2/5 md:w-4/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Псевдоним</p>
            <p class="hidden md:block md:w-4/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">Дата создания</p>
          </div>

            <ArtistRow v-for="(artist, index) in track.artists" :key="artist.id"
                       :index="index + 1" :id="artist.id" :name="artist.name"
                       :avatar="artist.avatar" :createdAt="artist.createdAt" />

        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showDeleteModal"
         title="Подтвердите удаление"
         message="Вы уверены, что хотите удалить этого артиста? Это действие не может быть отменено."
         @cancel="showDeleteModal = false"
         @confirm="handleDeleteTrack" />
</template>
