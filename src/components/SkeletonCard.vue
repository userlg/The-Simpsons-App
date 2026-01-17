<script setup>
defineOptions({
  name: "SkeletonCard",
});
</script>

<template>
  <div
    class="animate-pulse bg-white dark:bg-zinc-800 rounded-2xl shadow-md overflow-hidden border border-zinc-100 dark:border-zinc-700"
  >
    <!-- Image skeleton -->
    <div class="w-full h-64 bg-zinc-300 dark:bg-zinc-700"></div>

    <!-- Content skeleton -->
    <div class="p-6 space-y-3">
      <!-- Title -->
      <div class="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
      <!-- Subtitle -->
      <div class="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
      <!-- Badges -->
      <div class="flex gap-2 pt-2">
        <div class="h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full w-16"></div>
        <div class="h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full w-16"></div>
      </div>
    </div>
  </div>
</template>
