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

const removeMember = (event: string) => {
  members.value = members.value.filter((name) => name !== event)
}
</script>

<template>
  <FloatLabel>
    <InputText id="email" v-model="input" />
    <label for="email">Enter email address</label>
  </FloatLabel>

  <div
    v-if="members.length"
    :style="{ 
      margin: '-1rem 0 0',
      fontSize: '.85rem',
      fontWeight: 'bold',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '.5rem',
    }">
     <PrimeChip
      v-for="name in members"
      :key="name"
      :label="name"
      removable
      @remove="removeMember(name)"
     />
  </div>

  <div :style="{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem',
    marginTop: '-1rem'
  }">
    <PButton size="small" severity="secondary" label="Cancel" @click.stop="$emit('cancel')" />
    <PButton size="small" :disabled="!input" severity="info" label="Add" @click.stop="addMembers()" />
  </div>
</template>