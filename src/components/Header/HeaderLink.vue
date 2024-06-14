<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <router-link :to="to">
    <li class="block text-center text-gray-500 hover:text-black hover:bg-gray-100 p-2">
      <p class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl">
        {{ text }}
      </p>
    </li>
  </router-link>
</template>

<style scoped>
/* Опциональные стили, если необходимо */
</style>
