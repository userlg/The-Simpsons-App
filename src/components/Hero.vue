<script setup>
defineOptions({
  name: "HeroSection",
});
</script>

<template>
  <div
    class="relative overflow-hidden bg-white dark:bg-zinc-900 isolate pt-24 pb-16"
  >
    <!-- Gradient Blobs -->
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-simpson-yellow to-simpson-pink opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      ></div>
    </div>

    <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center bg-transparent">
      <h1
        class="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl mb-6 animate-fade-in-up"
      >
        Welcome to
        <span class="text-simpson-yellow drop-shadow-md text-shadow-black"
          >Springfield</span
        >
      </h1>
      <p
        class="mt-4 text-xl leading-8 text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto animate-fade-in-up delay-100 font-medium"
      >
        Explore every character, episode, and iconic location from the world's
        favorite family.
      </p>
      <div
        class="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up delay-200"
      >
        <RouterLink
          to="/characters"
          class="rounded-full bg-simpson-blue px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-600 hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-simpson-blue"
        >
          Meet the Cast
        </RouterLink>
        <RouterLink
          to="/episodes"
          class="text-base font-bold leading-6 text-zinc-900 dark:text-white hover:text-simpson-pink transition-colors"
        >
          Watch Episodes <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>

    <!-- Second Blob -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-simpson-pink to-simpson-blue opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.text-shadow-black {
  text-shadow: 2px 2px 0 #000;
}

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
