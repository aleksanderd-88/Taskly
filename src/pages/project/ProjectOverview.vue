<script lang="ts" setup>
import TheTaskForm from '@/modules/task/components/TheTaskForm.vue';
import TheTaskList from '@/modules/task/components/TheTaskList.vue';
</script>

<template>
  <div class="project-overview">
    <main class="project-overview__content">
      <TheTaskList class="project-overview__section" />
      <TheTaskForm class="project-overview__section" />
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