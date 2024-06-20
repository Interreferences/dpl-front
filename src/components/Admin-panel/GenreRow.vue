<script setup>
import { defineProps, computed } from 'vue';

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
  createdAt: {
    type: String,
    required: true
  }
});

// Функция для форматирования даты
const formattedDate = computed(() => {
  const date = new Date(props.createdAt);
  return date.toLocaleString();
});

</script>

<template>
  <router-link :to="'/admin-panel/genres/' + id">
    <div class="w-full flex items-center border-b border-gray-300 hover:bg-gray-100 py-4 2xl:py-8 3xl:py-16">
      <p class="w-1/5 text-center xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ index }}</p>
      <p class="w-2/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ name }}</p>
      <p class="w-2/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>