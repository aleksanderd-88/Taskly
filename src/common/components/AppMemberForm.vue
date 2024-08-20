<script lang="ts" setup>
import { computed, PropType } from 'vue';

const props = defineProps({
  input: {
    type: String as PropType<string | null>,
    default: null
  }
})

const emit = defineEmits<{
  (event: 'input', value: string | null): void
  (event: 'cancel'): void
  (event: 'submit'): void
}>()

const recipient = computed({
  get: () => props.input,
  set: value => emit('input', value)
})
</script>

<template>
  <FloatLabel>
    <InputText id="email" v-model="recipient " />
    <label for="email">Enter email address</label>
  </FloatLabel>

  <div :style="{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
    marginTop: '-1rem'
  }">
    <PButton size="small" severity="secondary" label="Change project name" @click.stop="$emit('cancel')" />
    <PButton size="small" :disabled="!recipient" severity="info" label="Add" @click.stop="$emit('submit')" />
  </div>
</template>