<script setup>
import { ref, onMounted } from 'vue';
import { getArtists } from "@/services/api"; // Импортируем функцию getArtists
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import ArtistRow from "@/components/Admin-panel/ArtistRow.vue";

const artists = ref([]); // Список артистов

// Загружаем список артистов при монтировании компонента
onMounted(async () => {
  try {
    // Вызываем функцию для получения списка артистов
    const data = await getArtists();
    artists.value = data; // Обновляем значение списка артистов
    console.log(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
  }
});
</script>

<template>
  <div class="flex flex-col w-full">
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="flex flex-col w-full">
        <div class="flex flex-col">


          <div class="flex flex-row justify-between">

            <router-link to="/admin-panel/artists/create">
              <div class="rounded-md items-center p-2 flex text-lg flex-row shadow-md">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2 hidden md:block">Добавить артиста</span>
              </div>
            </router-link>
          </div>

          <div class="text-lg font-bold">
            Арстисты
          </div>

        </div>


        <div class="flex flex-row w-full items-center space-x-4 p-2 border-b border-gray-300">
          <p class="w-1/12">#</p>
          <p class="w-3/12">Аватар</p>
          <p class="w-6/12">Псевдоним</p>
          <p class="w-2/12 hidden">Дата создания</p>
        </div>

        <div v-if="artists.length > 0">
          <ArtistRow v-for="(artist, index) in artists" :key="artist.id"
                     :index="index + 1" :id="artist.id" :name="artist.name"
                     :avatar="artist.avatar" :createdAt="artist.createdAt" />
        </div>
        <div v-else>
          <p>Нет данных об артистах.</p>
        </div>


      </div>
    </div>

  </div>
</template>
