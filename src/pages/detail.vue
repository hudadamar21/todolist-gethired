<script setup lang="ts">
  import { onBeforeMount, ref, toRefs, watch, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ActivityDetail } from "@/interface";
  import { state } from "@/store";
  import { updateActivity } from "@/store/activity";
  import { 
    getListItems, 
    listItemData, 
    deleteTodo,
    editedTodo
  } from "@/store/listItem";

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

  const editTitleModeOn = (e: any) => {
    e.stopPropagation()
    isEditTitle.value = true
  }

  const handleEditTitle = () => {
    updateActivity(route.params.id as string, { title: title.value })
    isEditTitle.value = false
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
        <h2 data-cy="todo-title" @click="editTitleModeOn" v-show="!isEditTitle" class="text-4xl font-bold" >
          {{ title }}
        </h2>
        <input 
          v-show="isEditTitle"
          type="text"
          v-click-outside="handleEditTitle"
          v-model="title"
          class="text-4xl font-bold bg-transparent focus:outline-none border-b border-transparen border-gray-500 w-[80%]"
        />
        <button @click="isEditTitle ? handleEditTitle : editTitleModeOn" data-cy="todo-title-edit-button">
          <EditIcon class="w-7 h-7"/>
        </button>
      </div>
      <div class="flex items-center gap-5">
        <TodoSorter v-show="listTodo?.length !== 0"/>
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
    <div data-cy="todo-empty-state" v-if="listTodo?.length === 0" class="grid place-items-center" >
      <img src="@/assets/images/TodoEmptyState.svg" alt="Todo Empty State">
    </div>
    <TodoItem
      v-if="listTodo" class="mb-3"
      v-for="todo of listTodo"
      :key="todo.id"      
      v-bind="todo"
    />
    <DeleteModal
      v-show="deleteModalOpen"
      @cancel="deleteModalOpen = false"
      @delete="deleteTodo"
    />
    <AddItemModal v-show="addItemModal"/>
    <EditItemModal v-show="todoId" />
  </MainLayout>
</template>