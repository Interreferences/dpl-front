<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  index: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  audio: { type: String, required: true },
  createdAt: { type: String, required: true },
  explicit_content: { type: Boolean, required: true },
  release: { type: Object, required: true },
  listens: { type: Number, required: true },
  artists: { type: Array, required: true }
});

const formattedDate = computed(() => {
  const date = new Date(props.createdAt);
  return date.toLocaleString();
});

const audioUrl = computed(() => {
  return `http://188.130.154.92:7000/${props.audio}`;
});
</script>

<template>
  <router-link :to="'/admin-panel/tracks/' + id">
    <div class="w-full flex items-center border-b border-gray-300 hover:bg-gray-100 p-4 3xl:p-6">
      <p class="w-1/6 text-center md:w-1/12 xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">{{ index + 1 }}</p>
      <p class="w-3/6 text-center md:w-5/12 xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">{{ title }}</p>
      <div class="hidden xl:block xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">
        <template v-for="(artist, artistIndex) in artists" :key="artist.id">
          <router-link :to="'/admin-panel/artists/' + artist.id">
            <span class="hover:underline">{{ artist.name }}</span>
          </router-link>
          <span v-if="artistIndex < artists.length - 1">, </span>
        </template>
        <span v-if="artists.length === 0">Unknown Artist</span>
      </div>
      <audio class="w-2/6 overflow-y-scroll md:w-5/12 xl:w-3/12 2xl:w-2/12 2xl:text-xl 3xl:w-3/12 3xl:text-3xl" :src="audioUrl" controls></audio>
      <p class="hidden xl:block xl:w-1/12 xl:text-center 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">{{ listens }}</p>
      <p class="hidden md:block md:w-1/12 md:text-center xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">
        <span v-if="explicit_content">
          <i class="fa-solid fa-e"></i>
        </span>
      </p>
      <p class="hidden 3xl:block 3xl:w-1/12 3xl:text-center 3xl:text-3xl">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>
