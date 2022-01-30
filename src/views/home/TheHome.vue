<template lang="">
  <div class="min-h-screen flex items-center justify-center flex-col">
    <div class="flex flex-col">
      <div
        class="bg-pink-300 shadow overflow-hidden sm:rounded-lg sm:px-6 animate-bounce"
      >
        <button @click="$router.push('quiz')">Let's Play</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHome",
};
</script>
<style lang=""></style>
