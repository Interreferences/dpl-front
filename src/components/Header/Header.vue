<script setup>
import HeaderLink from "@/components/Header/HeaderLink.vue";
import {useUserStore} from "@/stores/user.js";
import {computed} from 'vue';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const isLoggedIn = computed(() => !!userStore.user);

const logout = () => {
  userStore.clearUser();
  router.push('/auth/login/'); // Переход на главную страницу после выхода
};
</script>

<template>
  <header
      class="flex w-full bg-white flex-row justify-between shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl z-10">
      <div class="block text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl 3xl:text-9xl items-baseline font-bold p-4">
        InMusic
      </div>

    <ul class="flex flex-row space-x-4">

      <HeaderLink v-if="isLoggedIn" text="Веб-плеер" to="/web-player/" icon="fa-solid fa-headphones"/>

      <li v-if="isLoggedIn" @click="logout" class="flex items-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 h-full text-base md:text-lg xl:text-xl 2xl:text-3xl 3xl:text-5xl">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p class="hidden md:block ml-2 2xl:ml-4 3xl:ml-6">Выйти</p>
      </li>

      <template v-if="!isLoggedIn">
        <HeaderLink text="Войти" to="/auth/login" icon="fa-solid fa-sign-in-alt"/>
        <HeaderLink text="Зарегистрироваться" to="/auth/registration" icon="fa-solid fa-user-plus"/>
      </template>
    </ul>
  </header>
</template>
