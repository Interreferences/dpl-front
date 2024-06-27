<script setup>
import Header from "@/components/Header/Header.vue";
import { ref } from 'vue';
import { registerUser } from '@/services/auth';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const form = ref({
  login: '',
  nickname: '',
  password: '',
  confirmPassword: ''
});

const errorMessage = ref('');
const successMessage = ref('');

const router = useRouter();

const userStore = useUserStore();

const handleKeydown = (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
};

const submitForm = async () => {
  if (form.value.login.length < 4) {
    errorMessage.value = 'Логин должен содержать не менее 4 символов';
  } else if (form.value.password.length < 4) {
    errorMessage.value = 'Пароль должен содержать не менее 4 символов';
  } else if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Пароли не совпадают';
  } else {
    try {
      const userData = {
        login: form.value.login,
        nickname: form.value.nickname,
        password: form.value.password
      };
      const response = await registerUser(userData);

      userStore.setUser(response.user);

      successMessage.value = 'Регистрация прошла успешно!';
      errorMessage.value = '';
      console.log('Ответ сервера:', response);

      router.push('/web-player/');

    } catch (error) {
      errorMessage.value = error.message || 'Произошла ошибка при регистрации';
      successMessage.value = '';
    }
  }
};
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header/>
    <div class="items-center w-full px-8 md:px-12 xl:px-64 fhd:px-96">
      <h2 class="font-bold m-4 text-center text-2xl md:text-3xl md:m-6 fhd:text-5xl 2xl:text-6xl 2xl:m-12 3xl:text-7xl">
        Регистрация</h2>
      <form @submit.prevent="submitForm">
        <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
        <div v-if="successMessage" class="mb-4 text-green-500">{{ successMessage }}</div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="login">Логин</label>
          <input
              v-model="form.login"
              @keydown="handleKeydown"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="text"
              id="login"
              required
          />
        </div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="nickname">Никнейм</label>
          <input
              v-model="form.nickname"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="text"
              id="nickname"
              required
          />
        </div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="password">Пароль</label>
          <input
              v-model="form.password"
              @keydown="handleKeydown"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="password"
              id="password"
              required
          />
        </div>
        <div class="flex flex-col mb-6 2xl:mb-12">
          <label class="mb-2 md:text-xl fhd:text-2xl 2xl:text-4xl 3xl:text-6xl 3xl:mb-6" for="confirmPassword">Подтвердите
            пароль</label>
          <input
              v-model="form.confirmPassword"
              @keydown="handleKeydown"
              class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 fhd:text-2xl 2xl:p-4 2xl:text-4xl 3xl:text-6xl 3xl:p-6"
              type="password"
              id="confirmPassword"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 md:text-xl fhd:text-2xl 2xl:p-6 2xl:text-4xl 3xl:text-6xl 3xl:p-8">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>
