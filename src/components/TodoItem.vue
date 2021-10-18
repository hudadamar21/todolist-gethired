<script setup lang="ts">
import { ref, watch } from "vue";
import { state } from "@/store";
import { getEditedTodo } from "@/store/listItem";
import { Priority } from "@/types";

const props = defineProps<{
  id: number,
  title: string,
  activity_group_id: number,
  is_active: number | boolean,
  priority: Priority
}>()

const handleEdit = () => {
  getEditedTodo(props.id.toString())
}

const handleDelete = () => {
  state.deleteModalOpen = true
  state.modalData = {
    title: props.title,
    todoId: props.id
  }
}
  
</script>

<template>
  <div class="grid grid-flow-col items-center justify-between w-full px-7 py-7 rounded-2xl shadow-lg text-lg font-medium bg-white" data-cy="todo-item"
  >
    <div class="flex items-center gap-5">
      <button
        @click="$emit('toggleActive', { id, is_active: is_active ? 0 : 1})"
        class="w-7 h-7 border-2  grid place-items-center text-white" 
        :class="is_active ? 'bg-primary border-white' : 'border-gray-300'"
        data-cy="todo-item-checkbox"
      >
        <CheckIcon class="w-4 h-4" v-show="is_active" />
      </button>
      <DotPriority :priority="priority" data-cy="todo-item-priority-indicator" />
      <p 
        class="border-2 border-transparent"
        :class="is_active && 'line-through opacity-50 w-max'" 
        data-cy="todo-item-title"
      >
        {{ title }}
      </p>
      <button @click="handleEdit" data-cy="todo-item-edit-button">
        <EditIcon class="w-6 h-6" />
      </button>
    </div>
    <button @click="handleDelete" class="text-gray-400" data-cy="todo-item-delete-button">
      <TrashIcon/>
    </button>
  </div>
</template>