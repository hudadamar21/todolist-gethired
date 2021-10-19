<script setup lang="ts">
import { ListItem } from "@/interface";
import { state } from "@/store";
import { showDetailActivity } from "@/store/activity";
import { updateTodo, editedTodo, clearEditedTodo } from "@/store/listItem";
import { useRoute } from "vue-router";
import Modal from "./Modal.vue";

const route = useRoute()

const closeModal = () => {
  clearEditedTodo()
}

const submitUpdateTodo = async (newTodo: {title: string, priority: string}) => {
  if(editedTodo.value.todoId) {
    try {
      await updateTodo(editedTodo.value.todoId, newTodo) as ListItem
      clearEditedTodo()
      showDetailActivity(parseInt(route.params.id as string))
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