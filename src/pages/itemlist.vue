<script setup lang="ts">
  import { onBeforeMount, ref, toRefs, watch, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ActivityDetail, ListItem } from "@/interface";
  import { state } from "@/store";
  import { updateActivity } from "@/store/activity";
  import { 
    getListItems, 
    listItemData, 
    updateTodo,
    deleteTodo,
    updateListItemState,
    editedTodo
  } from "@/store/listItem";
import TodoEmptyState from "@/components/atom/TodoEmptyState.vue";

  const { deleteModalOpen, addItemModal } = toRefs(state)

  const todoId = ref('')

  const listTodo = computed(() => listItemData.value?.todo_items)

  watch(() => editedTodo.value.todoId, (newval) => {
    todoId.value = newval
  })

  const route = useRoute()
  const router = useRouter()

  const title = ref<string>()
  const isEditTitle = ref(false)

  const openAddModal = (e: any) => {
    e.stopPropagation()
    addItemModal.value = true
  }

  const handleEditTitle = () => {
    updateActivity(route.params.id as string, { title: title.value })
    isEditTitle.value = false
  }

  const handleUpdateActive = ({ id, is_active }:{ id: number, is_active: number }) => {
    updateTodo(id.toString(), { is_active }).then(data => {
      updateListItemState(data as ListItem, 'is_active')
    })
  }

  onBeforeMount(() => {
    getListItems(route.params.id as string)
      .then((data) => title.value = (data as ActivityDetail).title)
      .catch(() => {
        console.log('activity tidak ditemukan');
        router.push('/')
      })
  })

</script> 

<template>
  <MainLayout>
    <AppNavbar>
      <div class="flex items-center gap-5">
        <router-link to="/" data-cy="todo-back-button">
          <ArrowLeft/>
        </router-link>
        <h2 v-if="!isEditTitle" class="text-4xl font-bold" data-cy="todo-title">
          {{ title }}
        </h2>
        <input 
          v-else
          type="text"
          v-model="title"
          class="text-4xl font-bold bg-transparent focus:outline-none border-b border-transparen border-gray-500 w-[80%]"
          data-cy="todo-title"
        >
        <button v-if="!isEditTitle" @click="isEditTitle = true" data-cy="todo-title-edit-button">
          <EditIcon class="w-7 h-7"/>
        </button>
        <button v-else @click="handleEditTitle">
          <CheckIcon class="text-primary w-7 h-7"/>
        </button>
      </div>
      <div class="flex items-center gap-5">
        <TodoSorter v-if="listTodo?.length !== 0"/>
        <AppButton 
          class="bg-primary focus:ring-4 ring-primary/30" 
          @click="openAddModal"
          data-cy="todo-add-button"
        >
          <PlusIcon/>
          Tambah
        </AppButton>
      </div>
    </AppNavbar>

    <div v-if="listTodo?.length === 0" class="grid place-items-center">
      <TodoEmptyState/>
    </div>
    <div v-else class="grid gap-3">
      <TodoItem
        v-for="todo of listTodo"
        :key="todo.id"      
        v-bind="todo"
        @toggleActive="handleUpdateActive"
      />
    </div>
    <DeleteModal
      v-show="deleteModalOpen"
      @cancel="deleteModalOpen = false"
      @delete="deleteTodo"
    />
    <AddItemModal v-if="addItemModal"/>
    <EditItemModal v-if="todoId" />
  </MainLayout>
</template>