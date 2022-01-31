<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
defineProps<{
  question: { type: String; required: true };
  category: { type: String; required: true };
  optionsAnswers: { type: Array<String>; required: true };
}>();
defineEmits(["select"]);
</script>

<template>
  <div
    class="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:px-6 w-96"
  >
    <h1 class="text-lg">{{ question }}</h1>
    <div class="flex flex-col text-pink-500">
      <button
        v-for="(answer, i) in optionsAnswers"
        :key="i"
        class="py-2 text-center shadow border rounded-full my-2 hover:bg-pink-300 active:bg-violet-600 hover:text-white ease-in duration-300"
        @click="$emit('select', answer)"
        v-text="answer"
      />
    </div>
  </div>
</template>
<style></style>
