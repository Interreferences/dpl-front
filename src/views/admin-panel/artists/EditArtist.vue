<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import { ref, onMounted } from 'vue';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { updateArtist } from "@/services/api"; // Импортируем функцию updateArtist
import { useRoute, useRouter } from "vue-router";

const route = useRoute(); // Получаем маршрут
const router = useRouter();
const artistId = ref(route.params.id);
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

  updateArtist(artistId.value, formData)
      .then(response => {
        console.log('Success:', response);
        // Перенаправление на страницу артистов в админ-панели
        router.push('/admin-panel/artists');
      })
      .catch(error => {
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
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full p-4 overflow-y-scroll">
        <h1 class="text-2xl my-4 font-bold md:text-4xl 2xl:my-8 2xl:text-6xl 3xl:text-7xl">Редактировать Артиста</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 3xl:space-y-12">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Псевдоним</label>
            <input type="text" id="name" v-model="name"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                   />
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
            <label for="bio" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Об артисте</label>
            <textarea id="bio" v-model="bio" rows="8"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm xl:text-xl 2xl:text-2xl 2xl:mt-2 3xl:text-4xl"></textarea>
          </div>
          <div>
            <button type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:text-xl 2xl:text-2xl 2xl:py-4 2xl:px-8 3xl:text-4xl 3xl:py-8 3xl:px-8">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
