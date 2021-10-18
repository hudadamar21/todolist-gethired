<script setup lang="ts">
  import { toRefs, onBeforeMount } from "vue";
  import { state } from "@/store";
  import { getActivities, activities, addActivity, removeActivity } from "@/store/activity";

  const { deleteModalOpen } = toRefs(state)

  onBeforeMount(() => getActivities())

  const createActivity = async () => {
    await addActivity({ title: 'New Activity' })
  }

</script>

<template>
  <MainLayout>
    <AppNavbar>
      <h2 class="text-4xl font-bold" data-cy="activity-title">
        Activity
      </h2>
      <AppButton 
        class="bg-primary focus:ring-4 ring-primary/30" 
        @click="createActivity"
        data-cy="activity-add-button"
      >
        <PlusIcon/>
        Tambah
      </AppButton>
    </AppNavbar>
    <main class="pt-2">
      <div data-cy="activity-empty-state">
        <div v-if="activities.length === 0" class="grid place-items-center" >
          <ActivityEmptyState/>
        </div>
      </div>
      <div data-cy="activity-item">
        <div v-if="activities" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ActivityCard 
            v-for="activity of activities"
            :key="activity.id"
            v-bind="activity"
            class="mb-3"
          />
        </div>
      </div>
    </main>
    <div data-cy="modal-delete">
      <DeleteModal
        v-show="deleteModalOpen"
        @cancel="deleteModalOpen = false"
        @delete="removeActivity"
      />
    </div>
  </MainLayout>
</template>