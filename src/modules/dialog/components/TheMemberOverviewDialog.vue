<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import { computed, PropType, ref } from 'vue';
import { useDialogStore } from '../stores';
import { useProjectStore } from '@/stores/project'
import { MemberType } from '@/types/project';
import { get } from 'lodash';
import { useConfirm } from 'primevue/useconfirm';

const props = defineProps({
  members: {
    type: Array as PropType<MemberType[]>,
    default: () => ([])
  }
})

const dialogStore = useDialogStore()
const confirm = useConfirm()
const projectStore = useProjectStore()

const headerTitle = ref('Members')

const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'member-overview')
const project = computed(() => projectStore.project)

const confirmDeleteMember= (id: string) => {
  dialogStore.setDialogVisibility(false)
  
  return confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete member',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
      size: 'small'
    },
    acceptProps: {
      label: 'Yes',
      severity: 'danger',
      size: 'small'
    },
    accept: () => deleteMember(id)
  })
}

const deleteMember = async (id: string) => {
  try {
  const modifiedMembers = get(props, 'members', []).filter(member => member._id !== id)
  await projectStore
    .updateProject(
      get(projectStore, 'project._id', '') as string,
      { data: { ...get(projectStore, 'project', null), members: modifiedMembers } }
    )
  await projectStore.getProject(get(projectStore, 'project._id', '') as string)
  dialogStore.setDialogVisibility(false)
 } catch (error) {
    //- Do nothing
 }
}
</script>

<template>
  <AppDialog
    :is-visible="dialogIsVisible"
    :header-title="headerTitle"
    dismissable-mask
    @close="dialogStore.setDialogVisibility(false)"
    :style="{ width: '400px' }"
  >
    <ul class="member-overview">
      <li class="member-overview__item">
        <i class="pi pi-user"></i>
        {{ get(project, 'owner', '') }}
        (Owner)
      </li>

      <li
        v-for="member in members"
        :key="member._id"
        class="member-overview__item"
      >
        <i class="pi pi-user"></i>
        <p>
          {{ member.email }}
        </p>

        <PButton
          class="member-overview__action-btn"
          icon="pi pi-trash"
          severity="secondary"
          aria-hidden="false"
          text
          @click="confirmDeleteMember(member._id as string)"
        />
      </li>
    </ul>
  </AppDialog>
</template>

<style lang="scss" scoped>
  .member-overview {
    list-style: none;
    padding: 0;

    &__item {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: .8rem;

      &:first-child {
        color: #64748b;
      }
    }

    &__action-btn {
      margin-left: auto;
    }
  }
</style>