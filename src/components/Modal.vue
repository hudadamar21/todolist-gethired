<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { editedTodo } from "@/store/listItem";
import { priorityList } from "@/data";
import AppButton from "./atom/AppButton.vue";
import Dropdown from "./atom/Dropdown.vue";
const emit = defineEmits(['submitTodo', 'close'])
const props = defineProps<{
  modalTitle: string,
}>()

const formValid = ref(false)
const elAddItemModal = ref<Element | any>(null)
const title = ref<string>(editedTodo.value.title || '')
const priority = ref<string>(editedTodo.value.priority || 'very-high')

watchEffect(() => {
  if(title.value && priority.value) {
    formValid.value = true
  } else {
    formValid.value = false
  }
})

const handleSelected = (value: string) => {
  priority.value = value
}

const closeModal = () => {
  emit('close')
}

const submitTodo = () => {
  if(title.value && priority.value) {
    emit('submitTodo', { title: title.value, priority: priority.value})
  } else {
    console.log('form required');
  }
}
</script>

<template>
  <div data-cy="modal-add" class="fixed inset-0 z-50 bg-black/50 grid justify-center items-start pt-14 overflow-auto">
    <div v-click-outside="closeModal" ref="elAddItemModal" class="rounded-2xl w-[850px] bg-white">
      <div class="flex items-center justify-between px-8 py-6 w-full border-b">
        <h1 data-cy="modal-add-title" class="text-xl font-semibold" >
          {{ modalTitle }}
        </h1>
        <button data-cy="modal-add-close-button" @click="closeModal" class="text-gray-400 hover:text-gray-500" >
          <CrossIcon />
        </button>
      </div>
      <form @submit.prevent class="p-8">
        <label data-cy="modal-add-name-title" class="block font-medium mb-3" for="nama" >
          Nama List Item
        </label>
        <div data-cy="modal-add-name-input">
          <input 
            class="px-5 py-4 w-full rounded-lg border focus:outline-none focus:ring-1 ring-primary" 
            type="text" 
            id="nama"
            v-model="title"
            placeholder="Tambahkan Nama Activity" 
          />
        </div>
        <label data-cy="modal-add-priority-title" class="block font-medium mb-3 mt-5" for="priority" >
          Priority
        </label>
        <div class="w-1/3">
          <Dropdown
            :lists="priorityList"
            @selected="handleSelected" 
          />
        </div>
      </form>
      <div class="px-8 py-6 border-t flex justify-end">
        <AppButton
          data-cy="modal-add-save-button"
          @click="submitTodo"
          type="submit"
          class="w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed bg-primary focus:ring-4 ring-primary/30"
          :disabled="!formValid"
        >
          Simpan
        </AppButton>
      </div>
    </div>
  </div>
</template>