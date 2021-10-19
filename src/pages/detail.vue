<script setup lang="ts">
import AddItemModal from "@/components/AddItemModal.vue";
import EditItemModal from "@/components/EditItemModal.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import TodoSorter from "@/components/atom/TodoSorter.vue";
import AppButton from "@/components/atom/AppButton.vue";
import TodoItem from "@/components/TodoItem.vue";
import DeleteModal from "@/components/DeleteModal.vue";

import { ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { state } from "@/store";
import { updateActivity, activityTitle } from "@/store/activity";
import { 
  listItemData,
  editedTodo,
  deleteTodo
} from "@/store/listItem";

const { deleteModalOpen, addItemModal } = toRefs(state)

const todoId = ref('')

watch(() => editedTodo.value.todoId, (newval) => {
  todoId.value = newval
})

const route = useRoute()

const title = ref<string>(activityTitle.value)
const isEditTitle = ref(false)

const openAddModal = (e: any) => {
  e.stopPropagation()
  addItemModal.value = true
}

const editTitleModeOn = (e: any) => {
  e.stopPropagation()
  isEditTitle.value = true
}

const handleEditTitle = () => {
  updateActivity(route.params.id as string, { title: title.value })
  isEditTitle.value = false
}

function handleDelete() {
  deleteTodo()
}

</script> 

<template>
  <MainLayout>
    <AppNavbar>
      <div class="flex items-center gap-5">
        <router-link data-cy="todo-back-button" to="/" >
          <ArrowLeft/>
        </router-link>
        <h2 data-cy="todo-title" @click="editTitleModeOn" v-if="!isEditTitle" class="text-4xl font-bold" >
          {{ title }}
        </h2>
        <input 
          v-else
          type="text"
          v-click-outside="handleEditTitle"
          v-model="title"
          class="input-text"
        />
        <button data-cy="todo-title-edit-button" @click="isEditTitle ? handleEditTitle : editTitleModeOn" >
          <EditIcon class="w-7 h-7"/>
        </button>
      </div>
      <div class="flex items-center gap-5">
        <TodoSorter />
        <AppButton
          data-cy="todo-add-button"
          class="bg-primary focus:ring-4 ring-primary/30" 
          @click="openAddModal"
        >
          <PlusIcon/>
          Tambah
        </AppButton>
      </div>
    </AppNavbar>
    <div v-if="listItemData?.length === 0" class="grid place-items-center" >
      <img src="@/assets/images/todo-empty-state.svg" alt="todo-empty-state" data-cy="todo-empty-state">
    </div>
    <div v-if="listItemData" class="grid gap-3">
      <TodoItem
        v-for="todo of listItemData"
        :key="todo.id"      
        :title="todo.title"
        :id="todo.id"
        :is_active="todo.is_active"
        :priority="todo.priority"
        :activity_group_id="todo.activity_group_id"
        :updated_at="todo.updated_at || ''"
      />
    </div>
    <DeleteModal
      v-if="deleteModalOpen"
      modalName="todo"
      @cancel="deleteModalOpen = false"
      @delete="handleDelete"
    />
    <AddItemModal v-if="addItemModal"/>
    <EditItemModal v-if="todoId" />
  </MainLayout>
</template>


<style>
  .input-text {
    @apply text-4xl font-bold bg-transparent focus:outline-none border-b border-transparent border-gray-500 w-[80%];
  }
</style>