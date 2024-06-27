<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArtistById } from "@/services/artists.js";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Web-player/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackEl from "@/components/Web-player/TrackEl.vue";
import ReleaseCard from "@/components/Web-player/ReleaseCard.vue";
import Player from "@/components/Web-player/Player.vue";

const artist = ref(null);
const initialLoading = ref(true);

const route = useRoute();
const artistId = route.params.id;

const loadArtist = async (id) => {
  try {
    const data = await getArtistById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

onMounted(async () => {
  try {
    artist.value = await loadArtist(artistId);
    console.log(artist);
    initialLoading.value = false;
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

const bannerUrl = computed(() => {
  return artist.value ? `http://185.159.128.11:5000/${artist.value.banner}` : '';
});

const avatarUrl = computed(() => {
  return artist.value ? `http://185.159.128.11:5000/${artist.value.avatar}` : '';
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <Loader v-if="initialLoading" />
      <div v-else class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="relative h-2/6 w-full">
          <img :src="bannerUrl" alt="Artist Banner" class="object-cover w-full h-full blur-sm" />
          <div class="absolute inset-0 flex justify-start items-center flex-row p-2 2xl:p-6 3xl:p-24">
            <img :src="avatarUrl" alt="Artist Avatar" class="rounded-full w-20 h-20 border-4 border-white md:w-48 md:h-48 2xl:w-80 2xl:h-80 3xl:h-[36rem] 3xl:w-[36rem]" />
            <div>
              <p class="text-white ml-2 font-bold text-2xl md:text-4xl md:ml-4 xl:text-6xl xl:ml-6 2xl:text-8xl 2xl:ml-8 3xl:text-9xl 3xl:ml-12">
                {{ artist.name }}
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

        <div v-if="artist.tracks.length > 0 && !initialLoading">
          <TrackEl
              v-for="(track, index) in artist.tracks"
              :key="track.id"
              :index="index + 1"
              :id="track.id"
              :title="track.title"
              :artists="track.artists"
              :listens="track.listens"
              :release="track.release"
              :explicit_content="track.explicit_content"
              :audio="track.audio"
          />
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Релизы
        </div>
        <div v-if="artist.releases && !initialLoading" class="flex flex-wrap">
          <ReleaseCard v-for="(release) in artist.releases"
                       :id="release.id"
                       :title="release.title"
                       :cover="release.cover"
          />

        </div>

      </div>
    </div>
    <Player/>
  </div>
</template>