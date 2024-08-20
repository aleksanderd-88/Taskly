<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import AppMemberForm from '@/common/components/AppMemberForm.vue';
import AppForm from '@/common/components/AppForm.vue';
import { useDialogStore } from '../stores';
import { computed, ref } from 'vue';
import { useProjectStore } from '@/stores/project';
import { get } from 'lodash';

const dialogStore = useDialogStore()
const projectStore = useProjectStore()

const members = ref<string[]>([])

const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'invite-member')

const closeDialog = () => {
  dialogStore.setDialogVisibility(false)
  resetForm()
}

const resetForm = () =>  members.value.length = 0

const updateProject = async () => {
  const data = { ...get(projectStore, 'project', null), members: members.value }
  return projectStore.updateProject(get(projectStore, 'project._id', ''), { data })
  .then(() => closeDialog())
  .catch(() => resetForm())
}
</script>

<template>
  <AppDialog
    header-title="Invite member"
    :is-visible="dialogIsVisible"
    dismissable-mask
    @close="closeDialog()"
  >
    <AppForm>
      <AppMemberForm
        @cancel="closeDialog()"
        @on-submit="members = $event"
      />

      <template #footer>
        <PButton 
          label="Invite" 
          severity="contrast" 
          type="submit"
          @click.stop="updateProject()"
          v-if="dialogMode === 'invite-member'"
        />
      </template>
    </AppForm>
  </AppDialog>
</template>