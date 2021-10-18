<script setup lang="ts">
import { state } from "@/store";
import { getEditedTodo } from "@/store/listItem";
import { Priority } from "@/types";
import { ListItem } from "@/interface";
import { updateTodo, updateListItemState } from "@/store/listItem";

const props = defineProps<{
  id: number,
  title: string,
  activity_group_id: number,
  is_active: number | boolean,
  priority: Priority
}>()

const handleDelete = () => {
  console.log('asd');
  
  state.deleteModalOpen = true
  state.modalData = {
    title: props.title,
    todoId: props.id
  }
}

const handleUpdateActive = ({ id, is_active }:{ id: number, is_active: number }) => {
  updateTodo(id.toString(), { is_active }).then(data => {
    updateListItemState(data as ListItem, 'is_active')
  })
}
  
</script>

<template>
  <div data-cy="todo-item" class="grid grid-flow-col items-center justify-between w-full px-7 py-7 rounded-2xl shadow-lg text-lg font-medium bg-white" 
  >
    <div class="flex items-center gap-5">
      <button
        data-cy="todo-item-checkbox"
        @click="handleUpdateActive({ id, is_active: is_active ? 0 : 1})"
        class="w-7 h-7 border-2  grid place-items-center text-white" 
        :class="is_active ? 'bg-primary border-white' : 'border-gray-300'"
        
      >
        <CheckIcon class="w-4 h-4" v-show="is_active" />
      </button>
      <DotPriority :priority="priority" />
      <p 
        data-cy="todo-item-title"
        class="border-2 border-transparent"
        :class="is_active && 'line-through opacity-50 w-max'" 
        
      >
        {{ title }}
      </p>
      <button data-cy="todo-item-edit-button" @click="getEditedTodo(props.id.toString())" >
        <EditIcon class="w-6 h-6" />
      </button>
    </div>
    <button data-cy="todo-item-delete-button" @click="handleDelete" class="text-gray-400" >
      <TrashIcon/>
    </button>
  </div>
</template>