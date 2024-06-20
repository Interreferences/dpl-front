<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArtistById, deleteArtist } from "@/services/api"; // Импортируем функцию deleteArtist
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TrackRow from "@/components/Admin-panel/TrackRow.vue";
import ReleaseRow from "@/components/Admin-panel/ReleaseRow.vue";
import Modal from "@/components/Admin-panel/Modal.vue"; // Импортируем модальное окно

const artist = ref(null); // Данные артиста
const initialLoading = ref(true); // Состояние первой загрузки данных
const showDeleteModal = ref(false); // Состояние показа модального окна

const route = useRoute(); // Получаем маршрут
const router = useRouter();
const artistId = route.params.id; // Извлекаем id из параметров маршрута

const loadArtist = async (id) => {
  try {
    const data = await getArtistById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

// Загружаем артиста при монтировании компонента
onMounted(async () => {
  try {
    artist.value = await loadArtist(artistId);
    console.log(artist);
    initialLoading.value = false; // Завершаем начальную загрузку
  } catch (error) {
    console.error('Ошибка при загрузке:', error);
  }
});

// Вычисляемое свойство для URL аватара
const bannerUrl = computed(() => {
  return artist.value ? `http://188.130.154.92:7000/${artist.value.banner}` : '';
});

const avatarUrl = computed(() => {
  return artist.value ? `http://188.130.154.92:7000/${artist.value.avatar}` : '';
});

// Функция для удаления артиста
const handleDeleteArtist = async () => {
  try {
    await deleteArtist(artistId);
    router.push('/admin-panel/artists'); // Перенаправляем пользователя после удаления
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-row overflow-hidden">
      <Sidebar />
      <Loader v-if="initialLoading" />
      <div v-else class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="relative h-2/6 w-full">
          <img :src="bannerUrl" alt="Artist Banner" class="object-cover w-full h-full blur-sm" />
          <div class="absolute inset-0 flex justify-start items-center flex-row p-2 2xl:p-6 3xl:p-24">
            <img :src="avatarUrl" alt="Artist Avatar" class="rounded-full w-20 h-20 border-4 border-white md:w-48 md:h-48 2xl:w-80 2xl:h-80 3xl:h-[36rem] 3xl:w-[36rem]" />
            <div>
              <p class="text-white ml-2 font-bold text-2xl md:text-4xl md:ml-4 xl:text-6xl xl:ml-6 2xl:text-8xl 2xl:ml-8 3xl:text-9xl 3xl:ml-12">
                {{ artist.name }}
              </p>
            </div>
            <div class="absolute top-0 right-0 p-2">
              <button @click="showDeleteModal = true" class="mt-2 px-2 py-2 bg-red-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
                <i class="fa-solid fa-trash"></i>
              </button>
              <router-link :to="`/admin-panel/artists/edit/${artistId}`">
                <button class="mt-2 px-2 py-2 bg-orange-600 text-white rounded mr-4 text-xs md:text-lg 2xl:text-2xl 2xl:px-4 3xl:text-4xl 3xl:px-6 3xl:py-4">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Треки
        </div>
        <div class="w-full flex items-center border-b border-gray-300 p-4 3xl:p-6" v-if="!initialLoading">
          <p class="w-1/6 text-center md:w-1/12 xl:w-1/12 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">#</p>
          <p class="w-3/6 text-center md:w-5/12 xl:w-2/12 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Название</p>
          <p class="hidden xl:block xl:w-2/12 xl:text-center 2xl:w-2/12 2xl:text-xl 3xl:w-2/12 3xl:text-3xl">Исполнитель</p>
          <p class="w-2/6 md:w-5/12 xl:w-3/12 2xl:w-2/12 2xl:text-xl 3xl:w-3/12 3xl:text-3xl">Аудио</p>
          <p class="hidden xl:block xl:w-1/12 xl:text-center 2xl:w-1/12 2xl:text-xl 3xl:w-1/12 3xl:text-3xl">Прослушиваний</p>
          <p class="hidden md:block md:w-1/12 md:text-center xl:w-1/12 2xl:text-xl 2xl:w-1/12 3xl:w-1/12 3xl:text-3xl">EC</p>
          <p class="hidden 3xl:block 3xl:w-1/12 2xl:text-xl 3xl:text-center 3xl:text-3xl">Дата создания</p>
        </div>
        <div v-if="artist.tracks.length > 0 && !initialLoading">
          <TrackRow v-for="(track, index) in artist.tracks" :key="track.id"
                    :index="index" :id="track.id" :title="track.title" :artists="track.artists"
                    :listens="track.listens" :genre="track.genre" :release="track.release"
                    :explicit_content="track.explicit_content" :createdAt="track.createdAt" :audio="track.audio" />
        </div>
        <div class="text-2xl font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
          Релизы
        </div>

        <div class="w-full flex items-center border-b border-gray-300 py-4" v-if="!initialLoading">
          <p class="w-1/5 text-center md:w-1/5 lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">#</p>
          <div class="w-1/5 md:w-1/5 lg:w-1/6 2xl:w-1/12"></div>
          <p class="w-3/5 text-center md:w-2/5 lg:w-1/6 lg:text-left xl:text-xl 2xl:w-2/12 3xl:text-4xl">Название</p>
          <p class="hidden md:block md:w-1/5 lg:w-2/6 xl:text-xl 2xl:w-3/12 3xl:text-4xl">Исполнители</p>
          <p class="hidden 2xl:block 2xl:w-3/12 2xl:text-xl 3xl:text-4xl">Лейбл</p>
          <p class="hidden 2xl:block 2xl:w-1/12 2xl:text-xl 3xl:text-4xl">Опубликовано</p>
          <p class="hidden lg:block lg:w-1/6 xl:text-xl 2xl:w-1/12 3xl:text-4xl">Дата релиза</p>
          <p class="hidden 2xl:w-1/12">Тип релиза</p>
        </div>

        <div v-if="artist.releases && !initialLoading">
          <ReleaseRow v-for="(release, index) in artist.releases" :key="release.id"
                      :id="release.id" :title="release.title" :release-date="release.releaseDate"
                      :published="release.published" :releasesType="release.releasesType" :labels="release.labels"
                      :artists="release.artists" :cover="release.cover" :index="index" />
        </div>
      </div>
    </div>
  </div>

  <Modal v-if="showDeleteModal"
         title="Подтвердите удаление"
         message="Вы уверены, что хотите удалить этого артиста? Это действие не может быть отменено."
         @cancel="showDeleteModal = false"
         @confirm="handleDeleteArtist" />
</template>