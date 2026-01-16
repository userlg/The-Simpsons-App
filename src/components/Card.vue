<script setup>
defineOptions({
  name: "SimpsonCard",
});
defineProps({
  image: String,
  title: String,
  subtitle: String,
  badges: Array,
});
</script>

<template>
  <div
    class="group relative bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-zinc-100 dark:border-zinc-700 hover:-translate-y-1"
  >
    <!-- Image -->
    <div
      v-if="image"
      class="w-full h-64 overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center"
    >
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        @error="
          $event.target.src =
            'https://placehold.co/600x400/eab308/ffffff?text=Simpsons'
        "
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3
        class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors mb-2"
      >
        {{ title }}
      </h3>
      <p
        v-if="subtitle"
        class="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2"
      >
        {{ subtitle }}
      </p>

      <!-- Badges -->
      <div v-if="badges && badges.length" class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="badge in badges"
          :key="badge"
          class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        >
          {{ badge }}
        </span>
      </div>
    </div>
  </div>
</template>
