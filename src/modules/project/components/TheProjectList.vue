<script lang="ts" setup>
import { useProjectStore } from '@/stores/project'
import { computed } from 'vue'
import TheProjectItem from './TheProjectItem.vue'

const projectStore = useProjectStore()

const projects = computed(() => projectStore.result?.rows)

</script>

<template>
  <div class="project-list">
    <TheProjectItem
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