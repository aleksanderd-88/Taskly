<script lang="ts" setup>
import AppSection from '@/common/components/AppSection.vue';
import { ProjectType } from '@/types/project';
import { computed, ref, type PropType } from 'vue';
import { type TaskType } from '@/types/task'
import TheTaskTable from './TheTaskTable.vue'
import TheMemberInviteDialog from '@/modules/dialog/components/TheMemberInviteDialog.vue';
import { useDialogStore } from '@/modules/dialog/stores';
import { useProjectStore } from '@/stores/project';
import { get } from 'lodash';
import { useRouter } from 'vue-router';
import AppMemberAvatarGroup from '@/common/components/AppMemberAvatarGroup.vue';

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
const router = useRouter()

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
    command: () => deleteProject()
  }
])

const inviteMember = () => dialogStore.setDialogVisibility(true, 'invite-member')
const deleteProject = async () => {
  await projectStore.deleteProject(get(props, 'project._id', ''))
  router.push({ name: 'projectList' })
}
</script>

<template>
  <AppSection v-if="project" class="task-list">
    <template #header>
      <h1>
        <i class="pi pi-book"></i>
        {{ project?.name }}
      </h1>
      
      <AppMemberAvatarGroup :project="project" :style="{ margin: '1rem 0 0'}" />

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