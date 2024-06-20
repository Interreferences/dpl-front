<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import { onMounted, ref } from "vue";
import Dropzone from "dropzone";
import Multiselect from 'vue-multiselect';
import {getArtists, getGenres, updateTrack} from "@/services/api.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute(); // Получаем маршрут
const router = useRouter();
const trackId = ref(route.params.id);

const title = ref('');
const audioFile = ref(null); // For storing the file
const text = ref('');
const clip = ref('');
const explicit_content = ref(false); // Initialize as false
const genreId = ref('');
const artistIds = ref([]);

const genres = ref([]);
const artists = ref([]);

const loading = ref(true); // Add a loading state

const baseUrl = 'http://localhost:7000/';

const customLabel = ({ name, avatar }) => {
  return `<img src="${baseUrl}${avatar}" alt="${name}" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 50%;"> ${name}`;
};

const loadAllGenres = async () => {
  try {
    const data = await getGenres();
    return data;
  } catch (error) {
    console.error('Error loading genres:', error);
    throw error;
  }
};

const loadAllArtists = async () => {
  try {
    const data = await getArtists();
    return data;
  } catch (error) {
    console.error('Error loading artists:', error);
    throw error;
  }
};

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('audio', audioFile.value);
  formData.append('genreId', parseInt(genreId.value));
  formData.append('text', text.value);
  formData.append('clip', clip.value);
  formData.append('explicit_content', explicit_content.value);

  const artistIdsArray = artistIds.value.map(artist => artist.id);
  artistIdsArray.forEach(id => {
    formData.append('artistIds', id);
  });

  updateTrack(trackId.value, formData)
      .then(response => {
        console.log('Success:', response.data);
        router.push('/admin-panel/tracks');
      })
      .catch(error => {
        console.error('Error:', error);
      });
};

onMounted(async () => {
  try {
    genres.value = await loadAllGenres();
    artists.value = await loadAllArtists();
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false; // Set loading to false after data is fetched
  }

  new Dropzone('#audio-dropzone', {
    url: '/file/post', // Specify the correct URL or remove if not used
    autoProcessQueue: false,
    acceptedFiles: 'audio/*',
    addRemoveLinks: true,
    init: function () {
      this.on('addedfile', file => {
        audioFile.value = file;
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
        <h1 class="text-2xl my-4 font-bold md:text-4xl 2xl:my-8 2xl:text-6xl 3xl:text-7xl">Редактировать Трек</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 3xl:space-y-12">
          <div>
            <label for="title"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Название</label>
            <input type="text" id="title" v-model="title"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                   />
          </div>
          <div>
            <label for="genre"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Жанр</label>
            <select id="genre" v-model="genreId"
                    class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                    >
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
            </select>
          </div>

          <div>
            <label for="artists"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Артисты</label>
            <multiselect
                v-model="artistIds"
                :options="artists"
                :multiple="true"
                track-by="id"
                :custom-label="customLabel"
                placeholder="Выберите артистов"
                class="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
            >
              <template #option="{ option }">
                <div class="flex items-center w-full m-2 hover:bg-gray-100">
                  <img :src="`${baseUrl}${option.avatar}`" alt="" class="rounded-full w-8 h-8 mr-2">
                  <span class="w-full">{{ option.name }}</span>
                </div>
              </template>
              <template #tag="{ option, remove }" class="p-2">
        <span
            class="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-indigo-100 text-indigo-800 w-full">
            {{ option.name }}
            <button type="button" class="ml-2 text-indigo-500 hover:text-indigo-600" @click="remove(option)">
                &times;
            </button>
        </span>
              </template>
            </multiselect>
          </div>

          <div>
            <label for="audio"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Аудио
              файл</label>
            <div id="audio-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 2xl:text-2xl 2xl:mt-2 3xl:text-4xl">
              Перетащите сюда файл или нажмите для выбора
            </div>
          </div>
          <div>
            <label for="text"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Текст
              песни</label>
            <textarea id="text" v-model="text" rows="16"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm xl:text-xl 2xl:text-2xl 2xl:mt-2 3xl:text-4xl">
            </textarea>
          </div>
          <div class="flex flex-row items-baseline">
            <label for="explicit_content"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8 mr-8">
              Explicit content
            </label>
            <input type="checkbox" id="explicit_content" v-model="explicit_content"
                   class="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8"/>
          </div>
          <div>
            <label for="clip"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Видеоклип</label>
            <input type="text" id="clip" v-model="clip"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
            />
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