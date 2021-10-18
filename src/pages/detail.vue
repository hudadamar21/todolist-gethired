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
        <div data-cy="todo-title">
          <h2 @click="editTitleModeOn" v-show="!isEditTitle" class="text-4xl font-bold" >
            {{ title }}
          </h2>
        </div>
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
        <div data-cy="todo-sort-button">
          <TodoSorter v-show="listTodo?.length !== 0"/>
        </div>
        <div data-cy="todo-add-button">
          <AppButton 
          class="bg-primary focus:ring-4 ring-primary/30" 
          @click="openAddModal"
        >
          <PlusIcon/>
          Tambah
        </AppButton>
        </div>
      </div>
    </AppNavbar>
    <div data-cy="todo-empty-state">
      <div v-if="listTodo?.length === 0" class="grid place-items-center" >
        <TodoEmptyState/>
      </div>
    </div>
    <div data-cy="todo-item">
      <div v-if="listTodo" class="grid gap-3">
        <TodoItem
          v-for="todo of listTodo"
          :key="todo.id"      
          v-bind="todo"
        />
      </div>
    </div>
    <div data-cy="modal-delete">
      <DeleteModal
        v-show="deleteModalOpen"
        @cancel="deleteModalOpen = false"
        @delete="deleteTodo"
      />
    </div>
    <div data-cy="modal-add">
      <AddItemModal v-show="addItemModal"/>
    </div>
    <div data-cy="modal-add">
      <EditItemModal v-show="todoId" />
    </div>
  </MainLayout>
</template>