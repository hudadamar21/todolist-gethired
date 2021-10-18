<script setup lang="ts">
  import { state } from "@/store";
  import { toRefs } from "vue";

  const { alertMessage } = toRefs(state)
</script>

<template>
  <AppHeader/>
  <div class="container py-20 ">
    <slot/>
  </div>
  <div data-cy="modal-information">
    <Alert v-show="alertMessage"/>
  </div>
</template>