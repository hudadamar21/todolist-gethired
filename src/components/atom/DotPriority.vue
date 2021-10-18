<script setup lang="ts">
  const props = defineProps<{
    priority: string
  }>()

  const getPriorityColor = () => {
    switch (props.priority) {
      case 'very-high':
       return 'bg-red-500' 
      case 'high':
        return 'bg-yellow-500'
      case 'normal':
        return 'bg-green-500'
      case 'low':
        return 'bg-blue-500'
      case 'very-low':
        return 'bg-purple-500'
    }
  }
</script>

<template>
  <div 
    class="rounded-full h-3 w-3" 
    :class="getPriorityColor()"
  >
  </div>
</template>