<script setup>

import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="flex flex-col w-full">
        <div class="flex flex-col p-4
                    md:flex-row md:justify-between
                    xl:justify-start">

          <div class="flex flex-row justify-between
                      md:w-full md:mr-10
                      ">

            <button class="p-2 items-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs">
              <i class="fa-solid fa-angle-left"></i>
            </button>

            <input type="text" placeholder="Поиск..."
                   class="border w-36 border-gray-300 rounded-md
                          md:w-48
                          lg:w-80">

            <button class="p-2 items-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs">
              <i class="fa-solid fa-search"></i>
            </button>

          </div>

          <div class="flex flex-row justify-between mt-6
                      md:mt-auto md:w-full
                      ">
            <!-- Текст "Артисты" -->
            <div class="text-black font-bold text-xl">
              Артисты
            </div>

            <!-- Кнопка "Добавить артиста" -->
            <router-link to="/admin-panel/artists/create">
              <button class="border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-bold p-2 rounded flex items-center text-xs">
                <i class="fa-solid fa-plus"></i>
                <span class="hidden md:block ml-2">Добавить артиста</span>
              </button>
            </router-link>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>