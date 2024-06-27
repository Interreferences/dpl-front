<script setup>
import Header from "@/components/Header/Header.vue";
import { ref } from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {loginUser} from "@/services/auth.js";

const form = ref({
  login: '',
  password: '',
});

const errorMessage = ref('');
const successMessage = ref('');

const router = useRouter();

const userStore = useUserStore();

const submitForm = async () => {
  try {
    const userData = {
      login: form.value.login,
      password: form.value.password
    };
    const response = await loginUser(userData);

    userStore.setUser(response.user);

    errorMessage.value = '';
    console.log('Ответ сервера:', response);

    router.push('/web-player/');

  } catch (error) {
    errorMessage.value = error.message || 'Произошла ошибка при регистрации';
    successMessage.value = '';
  }
};
</script>

<template>

  <div clas="flex flex-row h-screen overflow-hidden">
    <Header />
    <div class="items-center w-full px-8 md:px-12 xl:px-64 fhd:px-96">
      <h2 class="font-bold m-4 text-center text-2xl md:text-3xl md:m-6 fhd:text-5xl 2xl:text-6xl 2xl:m-12 3xl:text-7xl">Вход</h2>
      <form @submit.prevent="submitForm">
        <div v-if="errorMessage" class="text-red-400 self-center">{{ errorMessage }}</div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="login">Логин</label>
          <input
              v-model="form.login"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="text"
              id="login"
              required
          />
        </div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="password">Пароль</label>
          <input
              v-model="form.password"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="password"
              id="password"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 md:text-xl fhd:text-2xl 2xl:p-6 2xl:text-4xl 3xl:text-6xl 3xl:p-8">
          Войти
        </button>
      </form>
    </div>
  </div>


</template>