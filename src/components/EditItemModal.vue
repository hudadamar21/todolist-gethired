<script setup lang="ts">
import { ListItem } from "@/interface";
import { state } from "@/store";
import { updateTodo, editedTodo, clearEditedTodo, getListItems } from "@/store/listItem";
import { Priority } from "@/types";
import { useRoute } from "vue-router";

const route = useRoute()

const closeModal = () => {
  clearEditedTodo()
}

const submitUpdateTodo = async (newTodo: {title: string, priority: Priority}) => {
  if(editedTodo.value.todoId) {
    try {
      await updateTodo(editedTodo.value.todoId, newTodo) as ListItem
      clearEditedTodo()
      getListItems(route.params.id as string)
      state.alertMessage = 'Todo berhasil diupdate'
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template>
  <Modal
    modalTitle="Edit To Do"
    @close="closeModal"
    @submitTodo="submitUpdateTodo"
  />
</template>