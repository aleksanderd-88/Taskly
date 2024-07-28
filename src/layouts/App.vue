<script setup lang="ts">
import PWABadge from '@/modules/serviceworker/components/PWABadge.vue'
import TheAppToast from '@/modules/toast/components/TheAppToast.vue';
</script>

<template>
  <RouterView />
  <PWABadge />
  <TheAppToast />
</template>
