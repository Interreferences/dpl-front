<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import Player from "@/components/Web-player/Player.vue";
import {getLastArtists, getReleasedTracks, getTopTracks} from "@/services/api.js";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import ArtistCard from "@/components/Web-player/ArtistCard.vue";

const tracks = ref([]);
const artists = ref([]);
const isLoading = ref(true);

const loadTracks = async () => {
  try {
    const data = await getTopTracks();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw error;
  }
};

const loadArtists = async () => {
  try {
    const data = await getLastArtists();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw error;
  }
};

onMounted(async () => {
  try {
    tracks.value = await loadTracks();
    artists.value = await loadArtists();
    console.log(tracks);
    isLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

</script>
<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <Loader v-if="isLoading" />
      <div v-else class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Добро пожаловать!
        </div>

        <div class="text-2xl p-6 font-bold text-left xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Артисты
        </div>

        <div class="flex flex-wrap">
          <ArtistCard v-for="(artist, index) in artists"
                      :key="artist.id"
                      :id="artist.id"
                      :avatar="artist.avatar"
                      :name="artist.name" />
        </div>

        <div class="text-2xl p-6 font-bold text-left xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Треки
        </div>

        <div class="flex flex-col">

          <div class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
            <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">#</div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="flex flex-col items-center w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">Название</div>
            <div class="invisible items-center xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl">Релиз</div>
            <div class="invisible items-center md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">Прослушиваний</div>
          </div>

          <div v-if="tracks.length > 0">
            <TrackEl
                v-for="(track, index) in tracks"
                :key="track.id"
                :index="index + 1"
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
    </div>
    <Player />
  </div>
</template>