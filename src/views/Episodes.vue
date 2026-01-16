<script setup>
import { ref, onMounted } from "vue";
import api, { IMAGE_BASE_URL } from "../services/api";
import Card from "../components/Card.vue";

const episodes = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await api.getEpisodes();

    if (Array.isArray(response.data)) {
      episodes.value = response.data;
    } else {
      episodes.value = [response.data];
    }
  } catch (err) {
    console.error("Failed to fetch episodes:", err);
    error.value = "Failed to load episodes. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2
        class="text-3xl font-extrabold tracking-tight text-simpson-pink dark:text-simpson-pink sm:text-5xl mb-4 drop-shadow-sm"
      >
        Episodes
      </h2>
      <p class="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
        Every adventure, every gag.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-simpson-pink"
      ></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-10 font-bold">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="ep in episodes"
        :key="ep.id"
        :title="ep.name"
        :subtitle="`Season ${ep.season} • Episode ${ep.episode_number}`"
        :image="
          ep.image_path
            ? `${IMAGE_BASE_URL}${ep.image_path}`
            : `https://via.placeholder.com/300x169?text=Episode+${ep.id}`
        "
        :badges="[`Air Date: ${ep.airdate || 'N/A'}`]"
      />
    </div>
  </div>
</template>
