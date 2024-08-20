<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import AppMemberForm from '@/common/components/AppMemberForm.vue';
import { useDialogStore } from '../stores';
import { computed, ref } from 'vue';

const dialogStore = useDialogStore()

const members = ref<string[]>([])

const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'invite-member')
</script>

<template>
  <AppDialog
    header-title="Invite member"
    :is-visible="dialogIsVisible"
    dismissable-mask
    @close="dialogStore.setDialogVisibility(false)"
  >
    <AppMemberForm
      @cancel="dialogStore.setDialogVisibility(false)"
      @on-submit="members = $event"
    />
  </AppDialog>
</template>