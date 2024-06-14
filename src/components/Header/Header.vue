<script setup>
import HeaderLink from "@/components/Header/HeaderLink.vue";
</script>

<template>
  <div class="flex w-full bg-white flex-row justify-between p-2 shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl">
    <router-link to="/">
      <div class="block font-bold text-center p-2 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl">
        InMusic
      </div>
    </router-link>

    <ul class="flex flex-row space-x-4">
      <HeaderLink text="Главная" to="/" />
      <HeaderLink text="Веб-плеер" to="/web-player/" />
      <HeaderLink text="Админ-панель" to="/admin-panel/" />
    </ul>
  </div>
</template>

<style scoped>
/* Опциональные стили, если необходимо */
</style>
