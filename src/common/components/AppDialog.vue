<script lang="ts" setup>
import { useDialogStore } from '@/modules/dialog/stores';
import { computed } from 'vue'

defineProps({
  headerTitle: {
    type: String,
    default: 'Edit Profile'
  }
})

const emit = defineEmits<{
  (event: 'close', value: boolean): void
}>()

const dialogStore = useDialogStore()

const dialogIsVisible = computed({
  get: () => dialogStore.dialogIsVisible,
  set: (value) => dialogStore.setDialogVisibility(value)
})
</script>

<template>
  <PrimeDialog 
    v-model:visible="dialogIsVisible" 
    modal 
    :header="headerTitle"
    :draggable="false"
  >
    <slot />
  </PrimeDialog>
</template>