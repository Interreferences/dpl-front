<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
});

// Формируем URL для изображения
const coverUrl = computed(() => {
  return `http://188.130.154.92:7000/${props.cover}`;
});
</script>

<template>
  <router-link :to="'/releases/' + id">
    <div class="flex flex-col shadow-md items-center rounded-md p-4 ml-2 mb-4 md:ml-6 md:mb-8 md:shadow-xl border border-gray-100 lg:ml-12 lg:mb-16 2xl:p-8 2xl:ml-[72px] 3xl:ml-[148px] 3xl:mb-24">
      <div class="w-16 h-16 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-80 2xl:h-80 3xl:w-[464px] 3xl:h-[464px]">
        <img :src="coverUrl" alt="Avatar" class="w-full h-full rounded-md object-cover">
      </div>

      <div class="w-12 md:w-24 lg:w-36 2xl:w-64 ">
        <p class="text-center mt-2 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis xl:text-xl 2xl:text-2xl 3xl:text-4xl">{{ title }}</p>
      </div>

    </div>
  </router-link>
</template>