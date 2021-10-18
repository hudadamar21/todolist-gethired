<script setup lang="ts">
  import { state } from "@/store";
  import { toRefs } from "vue";

  const { alertMessage } = toRefs(state)
  
  const closeAlert = () => {
    state.alertMessage = ''
  }
 </script>

<template>
  <div class="fixed inset-0 bg-black/50 z-50 grid place-items-center" >
    <div 
      v-click-outside="closeAlert" 
      class="w-[500px] bg-white flex items-center gap-5 p-5 rounded-2xl shadow-lg"
      dat-cy="modal-information"  
    >
      <img src="@/assets/icons/alert.svg" alt="alert-icon" data-cy="modal-information-icon">
      <p class="font-medium" data-cy="modal-information-title">{{ alertMessage }}</p>
    </div>
  </div>
</template>