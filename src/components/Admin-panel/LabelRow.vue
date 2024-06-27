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
});

</script>

<template>
  <router-link :to="'/admin-panel/labels/' + id">
    <div class="w-full flex items-center border-b border-gray-300 hover:bg-gray-100 py-4 2xl:py-8 3xl:py-16">
      <p class="w-1/5 text-center xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ index }}</p>
      <p class="w-4/5 xl:text-2xl 2xl:text-4xl 3xl:text-5xl">{{ name }}</p>
    </div>
  </router-link>
</template>