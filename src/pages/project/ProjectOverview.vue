<script lang="ts" setup>
import TheTaskForm from '@/modules/task/components/TheTaskForm.vue';
import TheTaskList from '@/modules/task/components/TheTaskList.vue';
import { useProjectStore } from '@/stores/project';
import { get } from 'lodash';
import { computed } from 'vue';

const projectStore = useProjectStore()

const project = computed(() => get(projectStore, 'project', null))
</script>

<template>
  <div class="project-overview">
    <main class="project-overview__content">
      <TheTaskList class="project-overview__section" :project="project" />
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