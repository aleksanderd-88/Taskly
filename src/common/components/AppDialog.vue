<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  headerTitle: {
    type: String,
    default: 'Edit Profile'
  }
})

const emit = defineEmits<{
  (event: 'close', value: boolean): void
}>()

const dialogIsVisible = computed({
  get: () => props.isVisible,
  set: (value: boolean) => emit('close', value)
})
</script>

<template>
  <PrimeDialog 
    v-model:visible="dialogIsVisible" 
    modal 
    :header="headerTitle"
  >
    <slot />
  </PrimeDialog>
</template>