<script lang="ts" setup>
import TheTaskForm from '@/modules/task/components/TheTaskForm.vue';
import TheTaskList from '@/modules/task/components/TheTaskList.vue';
import { useProjectStore } from '@/stores/project';
import { useTaskStore } from '@/modules/task/store';
import { get } from 'lodash';
import { computed } from 'vue';

const projectStore = useProjectStore()
const taskStore = useTaskStore()

const project = computed(() => get(projectStore, 'project', null))
const taskCount = computed(() => get(taskStore, 'result.count', 0))
</script>

<template>
  <div class="project-overview">
    <main class="project-overview__content">
      <TheTaskList class="project-overview__section" :project="project" :task-count="taskCount" />
      <TheTaskForm class="project-overview__section" :project="project" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .project-overview {
    
    &__content {
      display: flex;
    }

    &__section {
      flex: 1;
    }
  }
</style>