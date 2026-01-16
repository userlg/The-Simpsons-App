<script setup>
import { ref, onMounted } from "vue";
import api, { IMAGE_BASE_URL } from "../services/api";
import Card from "../components/Card.vue";

const locations = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await api.getLocations();

    if (Array.isArray(response.data)) {
      locations.value = response.data;
    } else {
      locations.value = [response.data];
    }
  } catch (err) {
    console.error("Failed to fetch locations:", err);
    error.value = "Failed to load locations. Please try again later.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2
        class="text-3xl font-extrabold tracking-tight text-green-600 dark:text-green-400 sm:text-5xl mb-4 drop-shadow-sm"
      >
        Locations
      </h2>
      <p class="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
        Iconic places from Springfield.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"
      ></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-10 font-bold">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        v-for="loc in locations"
        :key="loc.id"
        :title="loc.name"
        :subtitle="loc.type"
        :image="
          loc.image_path
            ? `${IMAGE_BASE_URL}${loc.image_path}`
            : `https://via.placeholder.com/300x200?text=${encodeURIComponent(loc.name)}`
        "
        :badges="[]"
      />
    </div>
  </div>
</template>
