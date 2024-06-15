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
  avatar: {
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

// Формируем URL для изображения
const avatarUrl = computed(() => {
  return `http://localhost:7000/${props.avatar}`;
});
</script>

<template>
  <router-link :to="'/admin-panel/artists/' + id">
    <div class="flex flex-row w-full items-center space-x-4 p-2 border-b border-gray-300">
      <p class="w-1/12">{{ index }}</p>
      <img :src="avatarUrl" alt="Avatar" class="w-3/12 h-16 rounded-full">
      <p class="w-6/12">{{ name }}</p>
      <p class="w-2/12 hidden">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>
