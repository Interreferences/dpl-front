<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
});

const avatarUrl = computed(() => {
  return `http://185.159.128.11:5000/${props.avatar}`;
});
</script>

<template>
  <router-link :to="'/admin-panel/artists/' + id">
    <div class="w-full flex items-center border-b border-gray-300 hover:bg-gray-100">
      <p class="w-1/5 text-center md:w-2/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ index }}</p>
      <div class="w-2/5 py-2 md:w-2/12 xl:py-4 2xl:py-8 3x:py-12">
        <img :src="avatarUrl" alt="Avatar"
             class="w-16 h-16 rounded-full xl:w-32 xl:h-32 2xl:w-64 2xl:h-64 3xl:w-96 3xl:h-96">
      </div>
      <p class="w-2/5 md:w-4/12 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ name }}</p>
    </div>
  </router-link>
</template>
