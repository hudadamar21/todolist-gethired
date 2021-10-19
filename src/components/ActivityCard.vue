<script setup lang="ts">
import { ListItem } from "@/interface";
import { state } from "@/store";
import { activityTitle, showDetailActivity } from "@/store/activity";
import { listItemData } from "@/store/listItem";
import { useRouter } from "vue-router";
const props = defineProps<{
  id: number,
  title: string,
  created_at: string
}>()

const router = useRouter()

function openDetail() {
  showDetailActivity(props.id).then(data => {
    activityTitle.value = data.data.title
    console.log(data.data);
    listItemData.value = data.data.todo_items as ListItem
    router.push(`/detail/${props.id}`)
  })
  .catch(er => {
    console.log(er);
  })
}

const handleClick = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  state.deleteModalOpen = true
  state.modalData = {
    title: props.title,
    activityId: props.id.toString()
  }
}
</script>

<template>
  <div 
    @click="openDetail"
    data-cy="activity-item"
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
  </div>
</template>