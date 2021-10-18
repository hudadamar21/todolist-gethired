<script setup lang="ts">
  import { ref } from "vue";
  import { selectedSort } from "@/store/listItem";
  import sortIcon from "@/assets/icons/sort-selection-icon.svg";
  import sortIcon1 from "@/assets/icons/sort-selection-icon-1.svg";
  import sortIcon2 from "@/assets/icons/sort-selection-icon-2.svg";
  import sortIcon3 from "@/assets/icons/sort-selection-icon-3.svg";
  import sortIcon4 from "@/assets/icons/sort-selection-icon-4.svg";

  const sortes = ref([
    { icon: sortIcon4, name: 'Terbaru' },
    { icon: sortIcon2, name: 'Terlama' },
    { icon: sortIcon, name: 'A-Z' },
    { icon: sortIcon1, name: 'Z-A' },
    { icon: sortIcon3, name: 'Belum Selesai' },
  ])

  const handleSelect = (sortName: string) => {
    selectedSort.value = sortName
    closeDropdown()
  }

  const dropdownOpen = ref(false)

  const openDropdown = (e: any) => {
    e.stopPropagation()
    dropdownOpen.value = !dropdownOpen.value
  }

  const closeDropdown = () => {
   if(dropdownOpen.value) {
      dropdownOpen.value = false
   }
  }
</script>

<template>
  <div class="relative">
    <button @click="openDropdown" class="h-12 w-12 rounded-full grid place-items-center border border-gray-300" data-cy="todo-sort-button">
      <SortIcon/>
    </button>
    <ul v-if="dropdownOpen" v-click-outside="closeDropdown" class="absolute top-full w-56 bg-white rounded-xl py-2 mt-2 shadow-lg border" data-cy="sort-parent">
      <li 
        v-for="sort of sortes" 
        :key="sort.name"
        @click="handleSelect(sort.name)"
        class="px-5 py-4 flex items-center gap-2 justify-between hover:bg-primary/10 cursor-pointer"
        data-cy="sort-selection"
      >
        <div class="flex items-center gap-2">
          <img :src="sort.icon" :alt="sort.name" data-cy="sort-selection-icon">
          <p data-cy="sort-selection-title">{{ sort.name }}</p>
        </div>
        <CheckIcon v-if="sort.name === selectedSort"  class="text-black/40"/>
      </li>
    </ul>
  </div>
</template>