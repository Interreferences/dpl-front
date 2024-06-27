<script setup>
import { computed, defineProps } from "vue";
import { usePlayerStore } from "@/stores/playerStore";
import { incrementViews } from "@/services/tracks.js";

const props = defineProps({
  index: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  audio: { type: String, required: true },
  explicit_content: { type: Boolean, required: true },
  release: { type: Object, required: true },
  listens: { type: Number, required: true },
  artists: { type: Array, required: true },
});

const playerStore = usePlayerStore();

const coverUrl = computed(() => {
  return `http://185.159.128.11:5000/${props.release.cover}`;
});

const play = () => {
  playerStore.playTrack(props);
  incrementViews(props.id);
};
</script>

<template>
  <div class="w-full flex items-center justify-between border-b border-gray-300 hover:bg-gray-100 py-4">
    <div class="invisible md:text-center md:visible w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl">{{ index }}</div>
    <button class="w-1/5 md:w-1/6 xl:w-1/12 2xl:text-2xl 3xl:text-4xl" @click="play">
      <i class="fa-solid fa-play"></i>
    </button>
    <div class="w-1/5 md:w-1/6 xl:w-1/12">
      <img :src="coverUrl" alt="Cover" class="w-12 h-12 2xl:w-36 2xl:h-36" />
    </div>
    <div class="flex flex-col ml-2 w-3/5 md:w-2/6 xl:w-5/12 2xl:text-2xl 3xl:text-4xl">
      <router-link :to="'/web-player/releases/' + release.id">
        <p class="flex items-center hover:underline">
          <span>{{ title }}</span>
          <i v-if="explicit_content" class="fa-solid fa-e text-red-500 ml-2"></i>
        </p>
      </router-link>
      <div class="flex flex-row">
        <template v-for="(artist, artistIndex) in artists" :key="artist.id">
          <router-link :to="'/web-player/artists/' + artist.id">
            <span class="hover:underline">{{ artist.name }}</span>
          </router-link>
          <span v-if="artistIndex < artists.length - 1">, </span>
        </template>
      </div>
      <span v-if="artists.length === 0">Unknown Artist</span>
    </div>

      <div class="invisible xl:visible xl:w-3/12 2xl:text-2xl 3xl:text-4xl hover:underline">
        <router-link :to="'/web-player/releases/' + release.id">
          {{ release.title }}
        </router-link>
      </div>


    <div class="invisible md:visible w-1/6 2xl:text-2xl 3xl:text-4xl">{{ listens }}</div>
  </div>
</template>
