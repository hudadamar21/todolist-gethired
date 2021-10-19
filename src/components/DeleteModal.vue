<script setup lang="ts">
import { toRefs } from "vue";
const emit = defineEmits(['cancel', 'delete'])
import { state } from "@/store";
const { modalData } = toRefs(state)
import AppButton from "./atom/AppButton.vue";

const props = defineProps<{
  modalName: string
}>()

</script>

<template>
  <div data-cy="modal-delete" class="fixed inset-0 z-50 bg-black/40 grid place-items-center">
    <div class="w-[500px] p-10 grid place-items-center gap-10 bg-white shadow-lg rounded-2xl">
      <div data-cy="modal-delete-icon"><DangerIcon/></div>
      <p data-cy="modal-delete-title" class="text-xl w-full text-center" >
        Apakah anda yakin menghapus activity 
        <span class="font-bold">“{{ modalData.title }}”?</span> 
      </p>
      <div class="flex items-center justify-center gap-5 w-full px-10">
        <AppButton 
          data-cy="modal-delete-cancel-button"
          class="w-1/2 bg-gray-100 focus:ring-4 ring-gray-200 text-black/80 " 
          @click="emit('cancel')"
        >
          Batal
        </AppButton>
        <AppButton 
          data-cy="modal-delete-confirm-button"
          class="w-1/2 flex justify-center bg-primary-red focus:ring-4 ring-primary-red/30" 
          @click="$emit('delete')"
        >
          Hapus
        </AppButton>
      </div>
    </div>
  </div>
</template>