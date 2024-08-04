<script lang="ts" setup>
import TheSidebar from '@/modules/bar/components/TheSidebar.vue';
import TheCreateProjectDialog from '@/modules/dialog/components/TheCreateProjectDialog.vue';
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

projectStore.listProjects()
</script>

<template>
  <div class="base-layout">
    <main class="base-layout__content base-layout__content--left-padding">
      <TheSidebar />
      <TheCreateProjectDialog />
      <RouterView />
    </main>
  </div>
</template>