<script setup>
import { ref, onMounted } from "vue";
import api, { IMAGE_BASE_URL } from "../services/api";
import Card from "../components/Card.vue";

const characters = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await api.getCharacters();

    // Now simplified thanks to interceptor
    if (Array.isArray(response.data)) {
      characters.value = response.data;
    } else {
      // Just in case
      characters.value = [response.data];
    }
  } catch (err) {
    console.error("Failed to fetch characters:", err);
    error.value = "Failed to load characters. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2
        class="text-3xl font-extrabold tracking-tight text-simpson-blue dark:text-simpson-yellow sm:text-5xl mb-4 drop-shadow-sm"
      >
        Characters
      </h2>
      <p class="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
        The faces of Springfield.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-simpson-yellow"
      ></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-10 font-bold">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <Card
        v-for="char in characters"
        :key="char.id"
        :title="char.name"
        :subtitle="char.occupation"
        :image="
          char.portrait_path
            ? `${IMAGE_BASE_URL}${char.portrait_path}`
            : 'https://via.placeholder.com/300?text=No+Image'
        "
        :badges="[char.status, char.gender].filter(Boolean)"
      />
    </div>
  </div>
</template>
