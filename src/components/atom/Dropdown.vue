<script setup lang="ts">
  import { ref, computed } from "vue";
  import { Priority } from "@/types";
  import { editedTodo } from "@/store/listItem";

  defineProps<{lists: Priority[]}>()

  const emit = defineEmits(['selected'])

  const selected = ref<Priority>({
    title: 'Very High',
    value: 'very-high'
  })

  const dropdownOpen = ref(false)

  const handleSelect = (e: any, selectedValue: Priority) => {
    e.stopPropagation()
    emit('selected', selectedValue.value)
    selected.value = selectedValue
    editedTodo.value.priority = selectedValue
    dropdownOpen.value = false
  }
</script>

<template>
  <div class="relative">
    <button 
      @click="dropdownOpen = !dropdownOpen" 
      class="px-5 py-4 w-full rounded-lg border flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <DotPriority :priority="editedTodo.priority.value || selected.value"/>
        {{ editedTodo.priority.title || selected.title }}
      </div>
      <ArrowDown/>
    </button>
    <ul v-if="dropdownOpen" class="absolute top-full left-0 bg-white rounded-md divide-y border w-full">
      <li 
        v-for="list of lists"
        :key="list.value"
        @click="handleSelect($event, list)"
        class="px-8 py-4 flex items-center gap-2 cursor-pointer "
        :class="list.value === editedTodo.priority.value
            ? 'bg-primary text-white' 
            : 'hover:bg-primary/20'
        "
        data-cy="modal-add-priority-item"
      >
        <DotPriority :priority="list.value"/>
        {{ list.title}}
      </li>
    </ul>
  </div>
</template>