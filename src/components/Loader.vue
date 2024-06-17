<template>
  <div class="flex flex-col items-center place-content-center w-full h-screen py-4 z-8">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 2xl:w-32 2xl:h-32 2xl:border-16 2xl:border-t-16 3xl:w-64 3xl:h-64 3xl:border-24"></div>
    <span class="2xl:mt-8 2xl:text-2xl 3xl:mt-8 3xl:text-3xl">Загрузка...</span>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
