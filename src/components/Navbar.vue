<script setup>
defineOptions({
  name: "AppNavbar",
});
import { ref } from "vue";
import { RouterLink } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b-4 border-simpson-yellow transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <RouterLink
            to="/"
            class="text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300 flex flex-row gap-2"
          >
            <span class="text-simpson-blue drop-shadow-sm">The</span>
            <span class="text-simpson-yellow text-shadow-outline"
              >Simpsons</span
            >
          </RouterLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink
            to="/"
            class="text-zinc-700 dark:text-zinc-300 hover:text-simpson-blue font-bold transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/characters"
            class="text-zinc-700 dark:text-zinc-300 hover:text-simpson-blue font-bold transition-colors"
          >
            Characters
          </RouterLink>
          <RouterLink
            to="/episodes"
            class="text-zinc-700 dark:text-zinc-300 hover:text-simpson-blue font-bold transition-colors"
          >
            Episodes
          </RouterLink>
          <RouterLink
            to="/locations"
            class="text-zinc-700 dark:text-zinc-300 hover:text-simpson-blue font-bold transition-colors"
          >
            Locations
          </RouterLink>
          <div class="flex items-center ml-2">
            <ThemeToggle />
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <ThemeToggle class="mr-2" />
          <button
            @click="toggleMenu"
            class="text-zinc-700 dark:text-zinc-300 hover:text-simpson-yellow focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white dark:bg-zinc-900 border-b border-simpson-yellow"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <RouterLink
            to="/"
            @click="isMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-bold text-zinc-700 dark:text-zinc-300 hover:bg-simpson-yellow hover:text-white transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/characters"
            @click="isMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-bold text-zinc-700 dark:text-zinc-300 hover:bg-simpson-yellow hover:text-white transition-colors"
          >
            Characters
          </RouterLink>
          <RouterLink
            to="/episodes"
            @click="isMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-bold text-zinc-700 dark:text-zinc-300 hover:bg-simpson-yellow hover:text-white transition-colors"
          >
            Episodes
          </RouterLink>
          <RouterLink
            to="/locations"
            @click="isMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-bold text-zinc-700 dark:text-zinc-300 hover:bg-simpson-yellow hover:text-white transition-colors"
          >
            Locations
          </RouterLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.text-shadow-outline {
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
