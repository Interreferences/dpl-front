<script setup>
import Dropzone from "dropzone";
import Loader from "@/components/Loader.vue";
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {onMounted, ref} from "vue";
import {getArtists} from "@/services/artists.js";
import {getLabels} from "@/services/labels.js";
import {getTracksWithoutReleases} from "@/services/tracks.js";
import {updateRelease} from "@/services/releases.js";
import Multiselect from "vue-multiselect";
import {useRoute, useRouter} from "vue-router";

const route = useRoute(); // Получаем маршрут
const router = useRouter();
const releaseId = ref(route.params.id);

const title = ref('');
const cover = ref(null);
const releaseDate = ref('');
const artistIds = ref([]);
const labelIds = ref([]);
const trackIds = ref([]);

const labels = ref([]);
const artists = ref([]);
const tracksWithoutReleases = ref([]);

const baseUrl = 'http://185.159.128.11:5000/';

const customLabel = ({ name, avatar }) => {
  return `<img src="${baseUrl}${avatar}" alt="${name}" style="width: 30px; height: 30px; margin-right: 10px; border-radius: 50%;"> ${name}`;
};

const loadAllLabels = async () => {
  try {
    const data = await getLabels();
    return data;
  } catch (error) {
    console.error('Error loading labels:', error);
    throw error;
  }
};

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('cover', cover.value);
  formData.append('releaseDate', releaseDate.value);

  const artistIdsArray = artistIds.value.map(artist => artist.id);
  artistIdsArray.forEach(id => {
    formData.append('artistIds', id);
  });

  const trackIdsArray = trackIds.value.map(track => track.id);
  trackIdsArray.forEach(id => {
    formData.append('trackIds', id);
    console.log(formData.trackIds);
  });

  const labelIdsArray = labelIds.value.map(label => label.id);
  labelIdsArray.forEach(id => {
    formData.append('labelIds', id);
  });

  updateRelease(releaseId.value, formData)
      .then(response => {
        console.log('Success:', response.data);
        router.push('/admin-panel/releases');
      })
      .catch(error => {
        console.error('Error:', error)
      });
};

const loadAllTracksWithoutReleases = async () => {
  try {
    const data = await getTracksWithoutReleases();
    return data;
  } catch (error) {
    console.error('Error loading tracks:', error);
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

onMounted(async () => {
  try {
    labels.value = await loadAllLabels();
    console.log(labels);
    artists.value = await loadAllArtists();
    console.log(artists);
    tracksWithoutReleases.value = await loadAllTracksWithoutReleases();
    console.log(tracksWithoutReleases);
  } catch (error) {
    console.error('Error loading data:', error);
  }

  new Dropzone("#cover-dropzone", {
    url: "/file/post",
    autoProcessQueue: false,
    acceptedFiles: "image/*",
    addRemoveLinks: true,
    init: function () {
      this.on("addedfile", file => {
        cover.value = file;
      });
    }
  });

});

</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <div class="flex flex-col w-full p-4 overflow-y-scroll z-2">
        <h1 class="text-2xl my-4 font-bold md:text-4xl 2xl:my-8 2xl:text-6xl 3xl:text-7xl">Редактировать Релиз</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 3xl:space-y-12">

          <div>
            <label for="title"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Название</label>
            <input type="text" id="title" v-model="title"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                   />
          </div>

          <div>
            <label for="cover" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Обложка</label>
            <div id="cover-dropzone"
                 class="dropzone mt-1 block w-full p-4 border-2 border-dashed border-gray-300 rounded-md text-gray-500 2xl:text-2xl 2xl:mt-2 3xl:text-4xl">
              Перетащите сюда файл или нажмите для выбора
            </div>
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
            <label for="releaseDate"
                   class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Дата релиза</label>
            <input type="date" id="releaseDate" v-model="releaseDate"
                   class="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
                   required/>
          </div>

          <div>
            <label for="labels" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Лейблы</label>
            <multiselect
                v-model="labelIds"
                :options="labels"
                :multiple="true"
                track-by="id"
                label="name"
                placeholder="Выберите лейблы"
                class="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
            />
          </div>

          <!-- Поле с выбором треков -->
          <div>
            <label for="tracks" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Треки</label>
            <multiselect
                v-model="trackIds"
                :options="tracksWithoutReleases"
                :multiple="true"
                track-by="id"
                label="title"
                placeholder="Выберите треки"
                class="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 md:text-xl md:p-2 2xl:text-2xl 2xl:p-4 3xl:text-4xl 3xl:p-8"
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