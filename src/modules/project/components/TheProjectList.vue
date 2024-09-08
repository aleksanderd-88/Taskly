<script lang="ts" setup>
import { useProjectStore } from '@/stores/project'
import { computed } from 'vue'
import TheProjectItem from './TheProjectItem.vue'

defineProps({
  replacementText: {
    type: String,
    default: 'Project list is empty'
  }
})

const projectStore = useProjectStore()

const projects = computed(() => projectStore.result?.rows || [])

</script>

<template>
  <div class="project-list">
    <p v-if="!projects.length"><i>{{ replacementText }}</i></p>

    <TheProjectItem
      v-else
      v-for="project in projects"
      :key="project._id"
      :project="project"
    />
  </div>
</template>

<style lang="scss" scoped>
  .project-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>