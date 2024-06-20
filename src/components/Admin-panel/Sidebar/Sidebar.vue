<script setup>

import SidebarLink from "@/components/Admin-panel/Sidebar/SidebarLink.vue";
</script>

<template>
  <nav class="flex h-screen bg-neutral-800 flex-col justify-between shadow-sm md:shadow-md lg:shadow-lg xl:shadow-xl 2xl:shadow-2xl z-5">
    <ul>
      <SidebarLink icon="fa-solid fa-user" text="Артисты" to="/admin-panel/artists" />
      <SidebarLink icon="fa-solid fa-music" text="Треки" to="/admin-panel/tracks" />
      <SidebarLink icon="fa-solid fa-compact-disc" text="Релизы" to="/admin-panel/releases" />
      <SidebarLink icon="fa-solid fa-file" text="Лейблы" to="/admin-panel/labels" />
      <SidebarLink icon="fa-solid fa-guitar" text="Жанры" to="/admin-panel/genres" />
    </ul>
  </nav>
</template>