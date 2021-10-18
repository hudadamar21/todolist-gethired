<script setup lang="ts">
  defineProps<{
    disabled?: boolean
  }>()
</script>

<template>
  <button class="px-6 py-3 rounded-full text-white flex justify-center items-center gap-2 font-medium text-xl transition" :disabled="disabled">
    <slot/>
  </button>
</template>