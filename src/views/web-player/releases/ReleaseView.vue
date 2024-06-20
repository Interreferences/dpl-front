<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { getReleaseById} from "@/services/api"; // Импортируем функцию getArtistById
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import Player from "@/components/Web-player/Player.vue";

const release = ref(null); // Данные артиста
const initialLoading = ref(true); // Состояние первой загрузки данных

const route = useRoute(); // Получаем маршрут
const releaseId = route.params.id; // Извлекаем id из параметров маршрута

const loadRelease = async (id) => {
  try {
    const data = await getReleaseById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

// Загружаем артиста при монтировании компонента
onMounted(async () => {
  try {
    release.value = await loadRelease(releaseId);
    console.log(release);
    initialLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const coverUrl = computed(() => {
  return release.value ? `http://localhost:7000/${release.value.cover}` : '';
});

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
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Треки
        </div>
        <div class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
          <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">#</div>
          <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
          <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
          <div class="flex flex-col items-center w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">Название</div>
          <div class="invisible items-center xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl">Релиз</div>
          <div class="invisible items-center md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">Прослушиваний</div>
        </div>
        <div v-if="release.tracks.length > 0 && !initialLoading">

          <TrackEl
              v-for="(track, index) in release.tracks"
              :key="track.id"
              :index="index"
              :id="track.id"
              :title="track.title"
              :artists="track.artists"
              :listens="track.listens"
              :release="track.release"
              :explicit_content="track.explicit_content"
              :createdAt="track.createdAt"
              :audio="track.audio"
          />
        </div>
      </div>
    </div>
    <Player/>
  </div>
</template>