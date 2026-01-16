<script setup>
import { ref, onMounted } from "vue";
import audioFile from "../assets/audio/opening.mp3";

defineOptions({
  name: "AudioPlayer",
});

const isPlaying = ref(false);
const audio = ref(null);

onMounted(() => {
  audio.value = new Audio(audioFile);
  audio.value.loop = true;
  audio.value.volume = 0.3; // Set volume to 30%
});

const togglePlay = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};
</script>

<template>
  <button
    @click="togglePlay"
    class="flex items-center gap-2 px-4 py-2 rounded-full bg-simpson-yellow hover:bg-yellow-400 text-zinc-900 font-bold transition-all duration-300 hover:scale-105 shadow-lg"
    :title="isPlaying ? 'Pause Theme' : 'Play Theme'"
  >
    <!-- Music Icon -->
    <svg
      v-if="!isPlaying"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
      />
    </svg>

    <!-- Pause Icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 animate-pulse"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>

    <span class="hidden sm:inline">{{ isPlaying ? "Pause" : "Play" }}</span>
  </button>
</template>
