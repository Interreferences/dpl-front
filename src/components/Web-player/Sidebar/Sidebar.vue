<script setup>

import SidebarLink from "@/components/Admin-panel/Sidebar/SidebarLink.vue";
</script>

<template>
  <nav class="flex h-screen bg-neutral-800 flex-col justify-between shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl z-5">
    <ul>
      <SidebarLink icon="fas fa-home" text="Главная" to="/" />
      <SidebarLink icon="fa-solid fa-user" text="Артисты" to="/artists" />
      <SidebarLink icon="fa-solid fa-music" text="Треки" to="/tracks" />
      <SidebarLink icon="fa-solid fa-compact-disc" text="Релизы" to="/releases" />
    </ul>
  </nav>
</template>