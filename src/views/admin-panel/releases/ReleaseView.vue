<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {deleteRelease, getReleaseById} from "@/services/releases.js";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";
import Modal from "@/components/Admin-panel/Modal.vue";

const release = ref(null);
const initialLoading = ref(true);
const showDeleteModal = ref(false);

const router = useRouter();
const route = useRoute();
const releaseId = route.params.id;

const loadRelease = async (id) => {
  try {
    const data = await getReleaseById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  try {
    release.value = await loadRelease(releaseId);
    console.log(release);
    initialLoading.value = false;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const coverUrl = computed(() => {
  return release.value ? `http://185.159.128.11:5000/${release.value.cover}` : '';
});

const handleDeleteRelease = async () => {
  try {
    await deleteRelease(releaseId);
    router.push('/admin-panel/releases');
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
        <div class="h-2/6 w-full bg-rose-800">
          <div class="flex justify-start items-center flex-row p-2 2xl:p-6 3xl:p-24 w-full">
            <img :src="coverUrl" alt="Release Cover" class="rounded-full w-20 h-20 border-4 border-white md:w-48 md:h-48 2xl:w-80 2xl:h-80 3xl:h-[36rem] 3xl:w-[36rem]" />
            <div class="flex justify-between w-full items-start">
              <p class="text-white ml-2 font-bold text-2xl md:text-4xl md:ml-4 xl:text-6xl xl:ml-6 2xl:text-8xl 2xl:ml-8 3xl:text-9xl 3xl:ml-12">
                {{ release.title }}
              </p>
              <div class="flex top-0 items-start">
                <button @click="showDeleteModal = true" class="mt-2 px-2 py-2 bg-red-600 text-white rounded text-xs md:text-lg 2xl:text-2xl 3xl:text-4xl">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <router-link :to="`/admin-panel/releases/edit/${releaseId}`">
                  <button class="mt-2 ml-4 px-2 py-2 bg-orange-600 text-white rounded text-xs md:text-lg 2xl:text-2xl 3xl:text-4xl">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </router-link>
              </div>
            </div>
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
        </div>
        <div v-if="release.tracks.length > 0 && !initialLoading">
          <TrackRow v-for="(track, index) in release.tracks" :key="track.id"
                    :index="index" :id="track.id" :title="track.title" :artists="track.artists"
                    :listens="track.listens" :genre="track.genre" :release="track.release"
                    :explicit_content="track.explicit_content" :createdAt="track.createdAt" :audio="track.audio" />
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showDeleteModal"
         title="Подтвердите удаление"
         message="Вы уверены, что хотите удалить этот релиз? Это действие не может быть отменено."
         @cancel="showDeleteModal = false"
         @confirm="handleDeleteRelease" />
</template>