<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  index: { type: Number, required: true },
  id: { type: Number, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  artists: { type: Array, required: true },
  labels: { type: Array, required: true },
  releasesType: { type: Object, required: true },
  releaseDate: { type: String, required: true }
});

const formattedDate = computed(() => {
  const date = new Date(props.createdAt);
  return date.toLocaleString();
});

const coverUrl = computed(() => {
  return `http://localhost:7000/${props.cover}`;
});
</script>

<template>
  <router-link :to="'/admin-panel/releases/' + id">
    <div class="w-full flex items-center border-b border-gray-300 hover:bg-gray-100 py-4">
      <p class="w-1/5 text-center md:w-1/5 lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">{{ index + 1 }}</p>
      <div class="w-1/5 md:w-1/5 lg:w-1/6 2xl:w-1/12">
        <img :src="coverUrl" alt="Avatar" class="w-12 h-12 md:w-24 md:h-24 3xl:w-48 3xl:h-48">
      </div>
      <p class="w-3/5 text-center md:w-2/5 lg:w-1/6 lg:text-left xl:text-xl 2xl:w-2/12 3xl:text-4xl">{{ title }}</p>
      <div class="hidden md:block md:w-1/5 lg:w-2/6 xl:text-xl 2xl:w-3/12 3xl:text-4xl">
        <template v-for="(artist, artistIndex) in artists" :key="artist.id">
          <router-link :to="'/admin-panel/artists/' + artist.id">
            <span class="hover:underline">{{ artist.name }}</span>
          </router-link>
          <span v-if="artistIndex < artists.length - 1">, </span>
        </template>
        <span v-if="artists.length === 0">Unknown Artist</span>
      </div>
      <div class="hidden 2xl:block 2xl:w-3/12 2xl:text-xl 3xl:text-4xl">
        <template v-for="(label, labelIndex) in labels" :key="label.id">
          <span>{{ label.name }}</span>
          <span v-if="labelIndex < labels.length - 1">, </span>
        </template>
        <span v-if="labels.length === 0">Unknown Artist</span>
      </div>
      <p class="hidden lg:block lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">{{ releaseDate }}</p>
      <p class="hidden 2xl:w-1/12 2xl:text-xl 3xl:text-4xl" >{{ releasesType.title }}</p>
    </div>
  </router-link>
</template>