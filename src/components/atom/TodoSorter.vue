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
    <button data-cy="todo-sort-button" @click="openDropdown" class="h-12 w-12 rounded-full grid place-items-center border border-gray-300" >
      <SortIcon/>
    </button>
    <ul data-cy="sort-parent" v-show="dropdownOpen" v-click-outside="closeDropdown" class="absolute top-full w-56 bg-white rounded-xl py-2 mt-2 shadow-lg border" >
      <li
        v-for="sort of sortes"
        :key="sort.name"
        @click="handleSelect(sort.name)"
        class="relative px-5 py-4 flex items-center gap-2 hover:bg-primary/10 cursor-pointer"
        data-cy="sort-selection"
      >
        <div :data-cy="sort.name === selectedSort ? 'sort-selection-selected' : false">
          <img  :src="sort.icon" :alt="sort.name" data-cy="sort-selection-icon">
          <span class="self-start" data-cy="sort-selection-title">{{ sort.name }}</span>
          <CheckIcon
            v-show="sort.name === selectedSort"
            class="absolute top-1/2 -translate-y-1/2 right-5 text-black/40"
          />
        </div>
      </li>
    </ul>
  </div>
</template>