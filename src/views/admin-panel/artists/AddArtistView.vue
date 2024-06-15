<script setup>
import { ref, onMounted } from 'vue';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { createArtist } from "@/services/api"; // Импортируем функцию createArtist
import router from '@/router'; // Импортируем Vue Router
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

const name = ref('');
const avatar = ref(null);
const banner = ref(null);
const bio = ref('');

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('avatar', avatar.value);
  formData.append('banner', banner.value);
  formData.append('bio', bio.value);

  createArtist(formData)
      .then(response => {
        console.log('Success:', response.data);
        // Перенаправление на страницу артистов в админ-панели
        router.push('/admin-panel/artists');
      })
      .catch((error) => {
        console.error('Error:', error);
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
  <div class="flex flex-col w-full overflow-y-hidden">
    <Header/>
    <div class="flex flex-row">
      <Sidebar/>
      <div class="flex flex-col w-full p-4 h-screen overflow-auto">
        <h1 class="text-2xl mb-4">Добавить Артиста</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Псевдоним</label>
            <input type="text" id="name" v-model="name"
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   required/>
          </div>
          <div>
            <label for="avatar" class="block text-sm font-medium text-gray-700">Аватар</label>
            <div id="avatar-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500">
              Перетащите сюда файл или нажмите для выбора
            </div>
          </div>
          <div>
            <label for="banner" class="block text-sm font-medium text-gray-700">Баннер</label>
            <div id="banner-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500">
              Перетащите сюда файл или нажмите для выбора
            </div>
          </div>
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Об артисте</label>
            <textarea id="bio" v-model="bio" rows="4"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required></textarea>
          </div>
          <div>
            <button type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
