<script setup lang="ts">
import TheAppLoader from '@/modules/loader/components/TheAppLoader.vue';
import PWABadge from '@/modules/serviceworker/components/PWABadge.vue'
import TheAppToast from '@/modules/toast/components/TheAppToast.vue';
</script>

<template>
  <RouterView />
  <PWABadge />
  <TheAppToast />
  <ConfirmDialog
  :draggable="false"
  :style="{ width: '400px'}"
  />
  <TheAppLoader />
</template>
