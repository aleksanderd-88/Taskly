<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'on-submit', value: string[]): void
}>()

const input = ref<string | null>(null)
const members = ref<string[]>([])

const addMembers = () => {
  if ( !input ) return

  members.value = [ ...members.value, input.value as string ]
  input.value = null
  emit('on-submit', members.value)
}
</script>

<template>
  <FloatLabel>
    <InputText id="email" v-model="input" />
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
    <PButton size="small" :disabled="!input" severity="info" label="Add" @click.stop="addMembers()" />
  </div>
</template>