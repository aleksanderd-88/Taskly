<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useToastStore } from '../stores';
import { useToast } from 'primevue/usetoast';

const toastStore = useToastStore()
const instance = useToast()

const toast = computed(() => toastStore.toast)

watch(() => toast.value, value => {
  if ( value.detail )
    instance.add({ ...value })
})
</script>

<template>
  <PrimeToast position="bottom-right" group="br" />
</template>