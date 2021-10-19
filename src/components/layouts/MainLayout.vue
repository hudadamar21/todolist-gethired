<script setup lang="ts">
  import { state } from "@/store";
  import { toRefs } from "vue";
import AppHeader from "../AppHeader.vue";
import Alert from "../atom/Alert.vue";

  const { alertMessage } = toRefs(state)
</script>

<template>
  <AppHeader/>
  <div class="container py-20 ">
    <slot/>
  </div>
  <Alert v-show="alertMessage"/>
</template>