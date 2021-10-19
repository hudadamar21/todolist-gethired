<script setup lang="ts">
import { createTodo } from "@/store/listItem";
import { clearModal, state } from "@/store";
import { useRoute } from "vue-router";
import Modal from "./Modal.vue";

const route = useRoute()

const addTodo = (newTodo: {title: string, priority: string}) => {
  const todo = {
    ...newTodo, 
    is_active: 0, 
    activity_group_id: parseInt(route.params.id as string)
  }
  createTodo(todo).then(data => {
    clearModal()
  }).catch(err => console.log(err))
}

const closeModal = () => {
  state.addItemModal = false
  clearModal()
}
</script>

<template>
  <Modal
    modalTitle="Tambah List Item"
    @close="closeModal"
    @submitTodo="addTodo"
  />
</template>