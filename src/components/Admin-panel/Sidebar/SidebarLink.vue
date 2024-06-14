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
  },
  icon: {
    type: String,
    required: true
  }
});
</script>

<template>
  <router-link :to="to">
    <li>
      <li class="flex items-center p-6 text-gray-500 hover:text-black hover:bg-gray-100 h-full text-base md:text-lg xl:text-xl 2xl:text-3xl 3xl:text-5xl">
        <i :class="icon"></i>
        <p class="hidden md:block ml-2 2xl:ml-4 3xl:ml-6">{{ text }}</p>
      </li>
    </li>
  </router-link>
</template>

<style scoped>

</style>