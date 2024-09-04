<script lang="ts" setup>
import AppSection from '@/common/components/AppSection.vue';
import { ProjectType } from '@/types/project';
import { computed, ref, watch, type PropType } from 'vue';
import { type TaskType } from '@/types/task'
import TheTaskTable from './TheTaskTable.vue'
import TheMemberInviteDialog from '@/modules/dialog/components/TheMemberInviteDialog.vue';
import { useDialogStore } from '@/modules/dialog/stores';
import { useProjectStore } from '@/stores/project';
import { get } from 'lodash';
import { useRouter } from 'vue-router';
import AppMemberAvatarGroup from '@/common/components/AppMemberAvatarGroup.vue';
import { useConfirm } from 'primevue/useconfirm';
import TheMemberOverviewDialog from '@/modules/dialog/components/TheMemberOverviewDialog.vue';
import TheEditTextDialog from '@/modules/dialog/components/TheEditTextDialog.vue'

const props = defineProps({
  project: {
    type: Object as PropType<ProjectType | null>,
    default: () => ({})
  },
  taskCount: {
    type: Number,
    default: 0
  },
  tasks: {
    type: Array as PropType<TaskType[]>,
    default: () => ([])
  }
})

const dialogStore = useDialogStore()
const projectStore = useProjectStore()
const confirm = useConfirm()
const router = useRouter()

const editTextDialogHeaderTitle = ref('')

const toggleTieredMenu = (event: any) => {
  tieredMenu.value.toggle(event);
};

const buttons = ref([
  { icon: 'pi-filter' },
  { icon: 'pi-sort-amount-down' },
  { icon: 'pi-table' },
  { 
    icon: 'pi-ellipsis-h',
    ariaHasPopup: 'true',
    ariaControls: 'overlay_tmenu',
    command: toggleTieredMenu
  },
])

const tieredMenu = ref()
const tieredMenuOptions = computed(() => [
  { 
    label: 'Invite member',
    icon: 'pi pi-users',
    command: () => inviteMember()
  },
  { 
    label: 'Delete project',
    icon: 'pi pi-trash',
    command: () => confirmDeleteProject()
  }
])

const confirmDeleteProject = () => {
  return confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete project',
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
    accept: () => deleteProject()
  })
}

const inviteMember = () => dialogStore.setDialogVisibility(true, 'invite-member')

const deleteProject = async () => {
  await projectStore.deleteProject(get(props, 'project._id', ''))
  router.push({ name: 'projectList' })
}

const openMemberOverviewDialog = () => {
  dialogStore.setDialogVisibility(true, 'member-overview')
}

const editText = (headerTitle = '') => {
  editTextDialogHeaderTitle.value = headerTitle
  dialogStore.setDialogVisibility(true, 'edit-text')
}

watch(() => dialogStore.dialogIsVisible, value => {
  if ( !value )
    editTextDialogHeaderTitle.value = ''
})
</script>

<template>
  <AppSection v-if="project" class="task-list">
    <template #header>
      <h1>
        <i class="pi pi-book"></i>

        {{ project?.name }}

        <PButton
          icon="pi pi-pen-to-square"
          severity="secondary"
          size="large"
          text
          @click="editText('Edit title')"
        />
      </h1>

      <p>
        {{ get(project, 'description', '') || 'Description' }}

        <PButton
          icon="pi pi-pen-to-square"
          severity="secondary"
          size="small"
          text
          @click="editText('Edit description')"
        />
      </p>
      
      <AppMemberAvatarGroup
        :project="project"
        :style="{ margin: '1rem 0 0'}"
        @click="openMemberOverviewDialog()"
      />

      <TheMemberOverviewDialog :members="get(project, 'members', [])" />

      <TheEditTextDialog :header-title="editTextDialogHeaderTitle" />

      <section>
        <p>{{ taskCount }} {{ !taskCount || taskCount > 1 ? 'tasks' : 'task' }}</p>

        <div>
          <PButton
            v-for="(button, index) in buttons"
            :key="index" 
            :icon="`pi ${ button.icon }`"
            text
            severity="secondary"
            :aria-haspopup="button.ariaHasPopup"
            :aria-controls="button.ariaControls"
            @click="button.command"
          />

          <TieredMenu 
            ref="tieredMenu"
            id="overlay_tmenu"
            :model="tieredMenuOptions"
            popup
            aria-hidden="false"
          />
        </div>
      </section>
    </template>

    <template #content>
      <TheTaskTable :tasks="tasks" />
      <TheMemberInviteDialog />
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
  .task-list {
    height: 100vh;
    border-right: 1px solid #eee;

    h1 {
      display: flex;
      align-items: center;
      gap: .75rem;
      font-size: 1.75rem;
    }

    p {
      font-size: .8rem;
      margin-top: -.25rem;
    }

    i {
      font-size: 1.5rem;
    }

    section {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: .9rem;
      }
    }
  }
</style>