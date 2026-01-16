<script setup>
import Hero from "../components/Hero.vue";
</script>

<template>
  <div class="space-y-16 pb-16">
    <Hero />

    <!-- Quick Links / Teasers could go here -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RouterLink
          to="/characters"
          class="group relative rounded-2xl overflow-hidden aspect-video bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <div
            class="absolute inset-0 flex items-center justify-center p-6 text-center"
          >
            <div>
              <h3
                class="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2"
              >
                Characters
              </h3>
              <p class="text-sm text-amber-800 dark:text-amber-200">
                Meet Springfield's finest
              </p>
            </div>
          </div>
          <div
            class="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/0 transition-colors"
          ></div>
        </RouterLink>

        <RouterLink
          to="/episodes"
          class="group relative rounded-2xl overflow-hidden aspect-video bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <div
            class="absolute inset-0 flex items-center justify-center p-6 text-center"
          >
            <div>
              <h3
                class="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2"
              >
                Episodes
              </h3>
              <p class="text-sm text-blue-800 dark:text-blue-200">
                Relive the moments
              </p>
            </div>
          </div>
          <div
            class="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/0 transition-colors"
          ></div>
        </RouterLink>

        <RouterLink
          to="/locations"
          class="group relative rounded-2xl overflow-hidden aspect-video bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
        >
          <div
            class="absolute inset-0 flex items-center justify-center p-6 text-center"
          >
            <div>
              <h3
                class="text-2xl font-bold text-green-900 dark:text-green-100 mb-2"
              >
                Locations
              </h3>
              <p class="text-sm text-green-800 dark:text-green-200">
                Visit the town
              </p>
            </div>
          </div>
          <div
            class="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/0 transition-colors"
          ></div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
