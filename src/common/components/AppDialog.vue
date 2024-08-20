<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  headerTitle: {
    type: String,
    default: 'Edit Profile'
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

const dialogIsVisible = computed({
  get: () => props.isVisible,
  set: () => emit('close')
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