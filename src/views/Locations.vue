<script setup>
import { ref, onMounted, computed } from "vue";
import api, { IMAGE_BASE_URL } from "../services/api";
import Card from "../components/Card.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import ErrorState from "../components/ErrorState.vue";

const locations = ref([]);
const loading = ref(true);
const loadingMore = ref(false);
const error = ref(null);
const currentPage = ref(1);
const hasMore = ref(true);
const searchQuery = ref("");

const filteredLocations = computed(() => {
  if (!searchQuery.value) return locations.value;

  return locations.value.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const fetchLocations = async (page = 1) => {
  try {
    error.value = null;
    const response = await api.getLocations(page);

    if (Array.isArray(response.data)) {
      if (page === 1) {
        locations.value = response.data;
      } else {
        locations.value.push(...response.data);
      }

      hasMore.value = response.data.length === 10;
    } else {
      locations.value =
        page === 1 ? [response.data] : [...locations.value, response.data];
      hasMore.value = false;
    }
  } catch (err) {
    console.error("Failed to fetch locations:", err);
    error.value = "Failed to load locations. Please check your connection.";
    hasMore.value = false;
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const loadMore = async () => {
  loadingMore.value = true;
  currentPage.value++;
  await fetchLocations(currentPage.value);
};

const retry = () => {
  loading.value = true;
  currentPage.value = 1;
  fetchLocations(1);
};

onMounted(() => {
  fetchLocations(1);
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

    <!-- Search Bar -->
    <div v-if="!loading && !error" class="mb-8 max-w-xl mx-auto">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search locations..."
          class="w-full px-4 py-3 pl-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <svg
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p
        v-if="searchQuery"
        class="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center"
      >
        Found {{ filteredLocations.length }} location{{
          filteredLocations.length !== 1 ? "s" : ""
        }}
      </p>
    </div>

    <!-- Loading State (Skeleton) -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <!-- Error State -->
    <ErrorState v-else-if="error" :message="error" @retry="retry" />

    <!-- Content -->
    <div v-else>
      <!-- Locations Grid -->
      <div
        v-if="filteredLocations.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <Card
          v-for="loc in filteredLocations"
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

      <!-- Empty State (Search) -->
      <div v-else class="text-center py-20">
        <div class="text-6xl mb-4">🏛️</div>
        <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          No locations found
        </h3>
        <p class="text-zinc-600 dark:text-zinc-400">
          Try a different search term.
        </p>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore && !searchQuery" class="text-center mt-12">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="bg-green-600 hover:bg-green-700 disabled:bg-zinc-400 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          <span v-if="!loadingMore">Load More</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        </button>
      </div>

      <!-- Item Count -->
      <p
        v-if="!searchQuery"
        class="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4"
      >
        Showing {{ locations.length }} location{{
          locations.length !== 1 ? "s" : ""
        }}
      </p>
    </div>
  </div>
</template>
