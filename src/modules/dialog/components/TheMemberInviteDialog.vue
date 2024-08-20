<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import AppMemberForm from '@/common/components/AppMemberForm.vue';
import { useDialogStore } from '../stores';
import { computed } from 'vue';

const dialogStore = useDialogStore()

const dialogMode = computed(() => dialogStore.mode)
</script>

<template>
  <AppDialog v-if="dialogMode === 'invite-member'">
    <AppMemberForm
      @cancel="dialogStore.setDialogVisibility(false)"
      @on-submit=""
    >
      <template #footer>
        <PButton 
          label="Invite" 
          severity="contrast" 
          type="submit"
        />
      </template>
    </AppMemberForm>
  </AppDialog>
</template>