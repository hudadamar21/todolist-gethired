<script setup lang="ts">
import { state } from "@/store";
const props = defineProps<{
  id: number,
  title: string,
  created_at: string
}>()

const handleClick = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  state.deleteModalOpen = true
  state.modalData = {
    title: props.title,
    activityId: props.id
  }
}
</script>

<template>
  <router-link 
    data-cy="activity-item"
    :to="`/detail/${id}`" 
    class="flex flex-col justify-between bg-white h-60 rounded-xl shadow-lg p-5"
  >
    <h3 data-cy="activity-item-title" class="text-xl font-bold overflow-hidden" >
      {{ title }}
    </h3>
    <div class="flex items-center justify-between">
      <div data-cy="activity-item-date" class="text-black/50 text-sm font-semibold" >
        {{ new Date(created_at).toLocaleDateString() }}
      </div>
      <button
        data-cy="activity-item-delete-button"
        @click="handleClick"
        class="text-gray-500 hover:text-black transition" 
      >
        <TrashIcon/>
      </button>
    </div>
  </router-link>
</template>