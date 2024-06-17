<script setup>

import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Admin-panel/Sidebar/Sidebar.vue";
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div>
        Admin Main!
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>