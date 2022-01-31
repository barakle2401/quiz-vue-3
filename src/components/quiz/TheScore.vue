<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
const route = useRoute();
const router = useRouter();

const scoreStr = computed(() => {
  return `Your score is ${route.params.score} / ${route.params.totalQuestions}`;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center flex-col">
    <div class="flex flex-col">
      <div
        class="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:px-6 mb-12 border-pink-300 border-2"
      >
        <h1 class="courier" v-text="scoreStr"></h1>
      </div>
      <div
        class="bg-pink-300 shadow overflow-hidden sm:rounded-lg sm:px-6 animate-bounce"
      >
        <button @click="router.push('/quiz')">Play again</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.courier {
  font-family: "Courier New", Courier, monospace;
}
</style>
