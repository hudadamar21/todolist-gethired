<script setup lang="ts">
  defineProps<{
    disabled?: boolean
  }>()
</script>

<template>
  <button class="app-button" :disabled="disabled">
    <slot/>
  </button>
</template>

<style>
  .app-button {
    @apply px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-xl transition;
  }
</style>