<script setup>
defineOptions({
  name: "ErrorState",
});

defineProps({
  message: {
    type: String,
    default: "Failed to load data. Please try again later.",
  },
  title: {
    type: String,
    default: "Oops! Something went wrong",
  },
});

const emit = defineEmits(["retry"]);

const handleRetry = () => {
  emit("retry");
};
</script>

<template>
  <div class="text-center py-20 max-w-md mx-auto px-6">
    <div class="text-6xl mb-4">😕</div>
    <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-zinc-600 dark:text-zinc-400 mb-6">
      {{ message }}
    </p>
    <button
      @click="handleRetry"
      class="bg-simpson-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg hover:shadow-xl"
    >
      Try Again
    </button>
  </div>
</template>
