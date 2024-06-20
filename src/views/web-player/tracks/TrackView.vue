<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute} from 'vue-router';
import {getTrackById} from "@/services/api"; // Импортируем функцию getArtistById
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import ArtistRow from "@/components/Admin-panel/ArtistRow.vue";
import ArtistCard from "@/components/Web-player/ArtistCard.vue";
import Player from "@/components/Web-player/Player.vue";

const track = ref(null); // Данные артиста
const initialLoading = ref(true); // Состояние первой загрузки данных

const route = useRoute(); // Получаем маршрут
const trackId = route.params.id; // Извлекаем id из параметров маршрута

const loadTrack = async (id) => {
  try {
    const data = await getTrackById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const getYouTubeVideoId = (url) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('v');
};

// Загружаем артиста при монтировании компонента
onMounted(async () => {
  try {
    track.value = await loadTrack(trackId);
    console.log(track);
    initialLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const formattedText = computed(() => {
  return track.value ? track.value.text.replace(/\n/g, '<br>') : '';
});
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
          </div>
        </div>

        <div class="flex flex-col">

          <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Трек
          </div>

          <div class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
            <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">#</div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl"></div>
            <div class="flex flex-col items-center w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">Название</div>
            <div class="invisible items-center xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl">Релиз</div>
            <div class="invisible items-center md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">Прослушиваний</div>
          </div>

          <TrackEl v-if="track"
                   :id="track.id"
                   :title="track.title"
                   :artists="track.artists"
                   :listens="track.listens"
                   :release="track.release"
                   :explicit_content="track.explicit_content"
                   :created-at="track.createdAt"
                   :audio="track.audio"
                   :index="1"
          />

        </div>


        <div class="flex flex-col">
          <div class="text-2xl m-4 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Артисты
          </div>
          <div class="flex flex-wrap">
            <ArtistCard v-for="(artist, index) in track.artists" :key="artist.id"
                        :id="artist.id" :avatar="artist.avatar" :name="artist.name" />
          </div>

        </div>

        <div v-if="track.clip">
          <div class="text-2xl m-4 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Клип
          </div>
          <iframe
              :src="`https://www.youtube.com/embed/${getYouTubeVideoId(track.clip)}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-96"
          ></iframe>
        </div>
        <div class="text-2xl m-4 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Текст
        </div>
        <div>
          <p class="text-center xl:text-xl 2xl:text-2xl 3xl:text-4xl" v-html="formattedText"></p>
        </div>
      </div>
    </div>
    <Player/>
  </div>
</template>
