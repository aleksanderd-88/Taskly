<script lang="ts" setup>
import TheProjectList from '@/modules/project/components/TheProjectList.vue';
</script>

<template>
  <div class="base-layout">
    <main class="base-layout__content">
      <h1 class="base-layout__headline">Workspaces</h1>

      <TheProjectList replacement-text="You are not a member of any workspace" />
    </main>
  </div>
</template>