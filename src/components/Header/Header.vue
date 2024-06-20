<script setup>
import HeaderLink from "@/components/Header/HeaderLink.vue";
</script>

<template>
  <header class="flex w-full bg-white flex-row justify-between shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl z-10">
    <router-link to="/">
      <div class="block text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl 3xl:text-9xl items-baseline font-bold p-4">
        InMusic
      </div>
    </router-link>

<!--    <ul class="flex flex-row space-x-4">-->
<!--      <HeaderLink text="Веб-плеер" to="/"  icon="fa-solid fa-headphones" />-->
<!--      <HeaderLink text="Админ-панель" to="/admin-panel/" icon="fa-solid fa-gear" />-->
<!--    </ul>-->
  </header>
</template>

<style scoped>
/* Опциональные стили, если необходимо */
</style>
