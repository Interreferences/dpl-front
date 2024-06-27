<script setup>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
import {computed, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();
const router = useRouter();

const isAdmin = computed(() => {
  return userStore.isAdmin();
});

onBeforeMount(() => {
  if (!userStore.isAuthenticated() || !isAdmin.value) {
    router.push('/auth/login');
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="flex flex-row overflow-hidden">
      <Sidebar/>
      <div class="flex flex-col w-full h-full overflow-y-scroll">
        <div class="flex flex-col items-center md:flex-row md:justify-between md:p-6">
          <div class="text-2xl mt-6 font-bold text-center xl:text-4xl 2xl:text-6xl 3xl:text-7xl">
            Панель управления
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
