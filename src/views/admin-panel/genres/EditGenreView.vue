<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import { ref } from "vue";
import {updateGenre} from "@/services/genres.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const genreId = ref(route.params.id);
const name = ref('');

const handleSubmit = () => {
  const formData = new FormData();
  formData.append('name', name.value);

  updateGenre(genreId.value, formData)
      .then(response => {
        router.push('/admin-panel/genres');
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
};
</script>

<template>
  <div class="flex flex-col h-screen">

    <Header />

    <div class="flex flex-row overflow-hidden">

      <Sidebar />

      <div class="flex flex-col w-full p-4 overflow-y-scroll">


        <h1 class="text-2xl my-4 font-bold md:text-4xl 2xl:my-8 2xl:text-6xl 3xl:text-7xl">Редактировать Жанр</h1>

        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4 3xl:space-y-12">

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 md:text-2xl 2xl:text-4xl 3xl:text-5xl 3xl:mb-8">Название</label>
            <input type="text" id="name" v-model="name"
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