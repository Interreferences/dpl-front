<script setup>
defineProps({
  title: String,
  message: String
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-300 px-4 py-2 rounded mr-2">Отмена</button>
        <button @click="$emit('confirm')" class="bg-red-600 text-white px-4 py-2 rounded">Удалить</button>
      </div>
    </div>
  </div>
</template>