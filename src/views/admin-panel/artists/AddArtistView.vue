<script setup>
import {ref, onMounted, onBeforeMount, computed} from 'vue';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { createArtist } from "@/services/artists.js";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";

import {useRouter} from 'vue-router';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore();

onBeforeMount(() => {
  if (!userStore.isAuthenticated() || !isAdmin.value) {
    router.push('/auth/login');
  }
});

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

const name = ref('');
const avatar = ref(null);
const banner = ref(null);
const router = useRouter();

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('avatar', avatar.value);
  formData.append('banner', banner.value);

  createArtist(formData)
      .then(response => {
        console.log('Success:', response.data);
        router.push('/admin-panel/artists');
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
};

onMounted(() => {
  new Dropzone("#avatar-dropzone", {
    url: "/file/post",
    autoProcessQueue: false,
    acceptedFiles: "image/*",
    addRemoveLinks: true,
    init: function () {
      this.on("addedfile", file => {
        avatar.value = file;
      });
    }
  });

  new Dropzone("#banner-dropzone", {
    url: "/file/post",
    autoProcessQueue: false,
    acceptedFiles: "image/*",
    addRemoveLinks: true,
    init: function () {
      this.on("addedfile", file => {
        banner.value = file;
      });
    }
  });
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full p-4 overflow-y-scroll">
        <h1 class="text-2xl my-4 font-bold md:text-4xl 2xl:my-8 2xl:text-6xl 3xl:text-7xl">Добавить Артиста</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 3xl:space-y-12">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Псевдоним</label>
            <input type="text" id="name" v-model="name"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                   required/>
          </div>
          <div>
            <label for="avatar" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Аватар</label>
            <div id="avatar-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 2xl:text-2xl 2xl:mt-2 3xl:text-4xl">
              Перетащите сюда файл или нажмите для выбора
            </div>
          </div>
          <div>
            <label for="banner" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Баннер</label>
            <div id="banner-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 2xl:text-2xl 2xl:mt-2 3xl:text-4xl">
              Перетащите сюда файл или нажмите для выбора
            </div>
          </div>
          <div>
            <button type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:text-xl 2xl:text-2xl 2xl:py-4 2xl:px-8 3xl:text-4xl 3xl:py-8 3xl:px-8">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
