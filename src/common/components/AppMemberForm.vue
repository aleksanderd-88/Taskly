<script lang="ts" setup>
import { computed, ref } from 'vue';
import AppForm from './AppForm.vue';
import { useDialogStore } from '@/modules/dialog/stores';

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'on-submit', value: string[]): void
}>()

const dialogStore = useDialogStore()

const input = ref<string | null>(null)
const members = ref<string[]>([])

const dialogMode = computed(() => dialogStore.mode)

const addMembers = () => {
  if ( !input ) return

  members.value = [ ...members.value, input.value as string ]
  input.value = null
  emit('on-submit', members.value)
}
</script>

<template>
  <AppForm>
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
      <PButton size="small" severity="secondary" label="Cancel" @click.stop="$emit('cancel')" />
      <PButton size="small" :disabled="!input" severity="info" label="Add" @click.stop="addMembers()" />
    </div>

    <template #footer>
      <PButton 
        label="Invite" 
        severity="contrast" 
        type="submit"
        v-if="dialogMode === 'invite-member'"
      />
    </template>
  </AppForm>
</template>