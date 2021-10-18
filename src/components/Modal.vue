<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { editedTodo } from "@/store/listItem";
import { priorityList } from "@/data";

type Priority = 'very-high' | 'high' | 'normal' | 'low' | 'very-low'
const emit = defineEmits(['submitTodo', 'close'])
const props = defineProps<{
  modalTitle: string,
}>()

const formValid = ref(false)
const elAddItemModal = ref<Element | any>(null)
const title = ref<string>(editedTodo.value.title || '')
const priority = ref<Priority>(editedTodo.value.priority.value || 'very-high')

watchEffect(() => {
  if(title.value && priority.value) {
    formValid.value = true
  } else {
    formValid.value = false
  }
})

const handleSelected = (value: Priority) => {
  priority.value = value
}

const closeModal = () => {
  emit('close')
}

const submitTodo = () => {
  emit('submitTodo', { title: title.value, priority: priority.value})
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/50 grid justify-center items-start pt-14 overflow-auto">
    <div v-click-outside="closeModal" ref="elAddItemModal" class="rounded-2xl w-[850px] bg-white" data-cy="modal-add">
      <header class="flex items-center justify-between px-8 py-6 w-full border-b">
        <h1 class="text-xl font-semibold" data-cy="modal-add-title">
          {{ modalTitle }}
        </h1>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-500" data-cy="modal-add-close-button">
          <CrossIcon />
        </button>
      </header>
      <main class="p-8 grid gap-5">
        <div>
          <label class="block font-medium mb-3" for="nama" data-cy="modal-add-name-title">
            Nama List Item
          </label>
          <input 
            class="px-5 py-4 w-full rounded-lg border focus:outline-none focus:ring-1 ring-primary" 
            type="text" 
            id="nama"
            v-model="title"
            placeholder="Tambahkan Nama Activity" 
            data-cy="modal-add-name-input"
          />
        </div>
        <div>
          <label class="block font-medium mb-3" for="priority" data-cy="modal-add-priority-title">
            Priority
          </label>
          <div class="w-1/3" data-cy="modal-add-priority-dropdown">
            <Dropdown
              :lists="priorityList"
              @selected="handleSelected" 
            />
          </div>
        </div>
      </main>
      <footer class="px-8 py-6 border-t flex justify-end">
        <AppButton
          @click="submitTodo"
          class="w-36 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed bg-primary focus:ring-4 ring-primary/30"
          :disabled="!formValid"
          data-cy="modal-add-save-button"
        >
          Simpan
        </AppButton>
      </footer>
    </div>
  </div>
</template>