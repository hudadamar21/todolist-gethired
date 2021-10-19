<script setup lang="ts">
  import { ref } from "vue";
  import { editedTodo } from "@/store/listItem";

  defineProps<{lists: string[]}>()

  const emit = defineEmits(['selected'])

  const selected = ref<string>('very-high')

  const dropdownOpen = ref(false)

  const openDropdown = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    dropdownOpen.value = !dropdownOpen.value
  }

  const handleSelect = (e: any, selectedValue: string) => {
    e.preventDefault()
    e.stopPropagation()
    emit('selected', selectedValue)
    selected.value = selectedValue
    editedTodo.value.priority = selectedValue
    dropdownOpen.value = false
  }
</script>

<template>
  <div class="relative" >
    <button 
      data-cy="modal-add-priority-dropdown"
      @click="openDropdown" 
      class="px-5 py-4 w-full rounded-lg border flex items-center justify-between"
    >
      <div class="flex items-center gap-3 capitalize">
        <DotPriority :priority="editedTodo.priority || selected"/>
        {{ editedTodo.priority.replaceAll('-', ' ') || selected.replaceAll('-', ' ') }}
      </div>
      <ArrowDown/>
    </button>
    <ul v-show="dropdownOpen" class="absolute top-full left-0 bg-white rounded-md divide-y border w-full" >
      <li 
        v-for="list of lists"
        :key="list"
        data-cy="modal-add-priority-item"
        @click="handleSelect($event, list)"
        class="px-8 py-4 flex items-center gap-2 cursor-pointer capitalize"
        :class="list === editedTodo.priority
            ? 'bg-primary text-white' 
            : 'hover:bg-primary/20'
        "
        
      >
        <DotPriority :priority="list" />
        {{ list.replaceAll('-', ' ') }}
      </li>
    </ul>
  </div>
</template>