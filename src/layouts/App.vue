<script setup lang="ts">
import PWABadge from '@/modules/serviceworker/components/PWABadge.vue'
import TheNavbar from '@/modules/bar/components/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <RouterView />
  <PWABadge />
</template>
