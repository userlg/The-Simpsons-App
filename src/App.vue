<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 min-h-screen">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
