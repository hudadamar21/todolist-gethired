<script setup lang="ts">
  import { toRefs, onMounted } from "vue";
  import { state } from "@/store";
  import { getActivities, activities, addActivity } from "@/store/activity";

  const { deleteModalOpen } = toRefs(state)

  onMounted(() => {
    getActivities().then(data => {
      activities.value = data.data.data
    })
  })

  const createActivity = () => {
    addActivity('New Activity').then(data => {
      activities.value.unshift(data.data)
    })
  }

</script>

<template>
  <MainLayout>
    <AppNavbar>
      <h2 data-cy="activity-title" class="text-4xl font-bold" >
        Activity
      </h2>
      <AppButton
        data-cy="activity-add-button"
        class="bg-primary focus:ring-4 ring-primary/30" 
        @click="createActivity"
      >
        <PlusIcon/>
        Tambah
      </AppButton>
    </AppNavbar>
    <main class="pt-2">
      
      
      <div v-if="activities.length === 0" class="grid place-items-center" >
        <img src="@/assets/images/activty-empty-state.svg" alt="activity-empty-state" data-cy="activity-empty-state">
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ActivityCard 
          v-for="activity of activities"
          :key="activity.id"
          v-bind="activity"
          class="mb-3"
        />
      </div>
    </main>
    <DeleteModal
      v-if="deleteModalOpen"
      modalName="activity"
      @cancel="deleteModalOpen = false"
    />
  </MainLayout>
</template>