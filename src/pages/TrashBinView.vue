<script lang="ts" setup>
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';
import moment from 'moment'
import { useConfirm } from "primevue/useconfirm"

const projectStore = useProjectStore()
const confirm = useConfirm();

const projects = computed(() => projectStore.result?.rows?.filter(({ isDeleted }) => isDeleted) || [])

const undoDelete = async (ids: string[]) => {
  await projectStore.undoDelete({ data: { ids } })
  await projectStore.listProjects({ data: { filter: { isDeleted: true } }})
}

const hardDelete = async (ids: string[]) => {
  await projectStore.hardDelete({ data: { ids } })
  await projectStore.listProjects({ data: { filter: { isDeleted: true } }})
}

const confirmDelete = (ids: string[], confirmHeader?: string) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: confirmHeader || 'Empty trash bin',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
      size: 'small'
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
      size: 'small'
    },
    accept: () => {
      hardDelete(ids)
    }
});
}
</script>

<template>
  <div class="base-layout">
    <main class="base-layout__content">
      <h1 class="base-layout__headline">Trash bin</h1>

      <PButton
        severity="secondary"
        icon="pi pi-undo"
        label="Undo all"
        :style="{ 
            width: '100%', 
            maxWidth: '150px', 
            marginBottom: '1rem',
            marginRight: '.5rem'
          }"
        :disabled="!projects.length"
        @click="undoDelete(projects.map(({ _id }) => _id as string))"
        />

      <PButton
        severity="secondary"
        icon="pi pi-trash"
        label="Empty trash"
        :style="{ 
            width: '100%', 
            maxWidth: '150px', 
            marginBottom: '1rem' 
          }"
        :disabled="!projects.length"
        @click="confirmDelete(projects.map(({ _id }) => _id as string))"
        />
      
      <DataTable
        :value="projects"
        tableStyle="min-width: 50rem"
        size="small"
        v-if="projects.length"
      >
        <DataColumn field="name" header="Name" style="width: 15%"></DataColumn>
        <DataColumn field="deletedAt" header="Deleted at">
          <template #body="slotProps">
            {{ moment(new Date(slotProps.data.deletedAt)).format('YYYY-MM-DD HH:MM:ss') }}
          </template>
        </DataColumn>
        
        <DataColumn>
          <template #body="slotProps">
            <PButton
              icon="pi pi-undo"
              text
              severity="secondary"
              @click="undoDelete([slotProps.data._id])"
            />

            <PButton
              icon="pi pi-trash"
              text
              severity="secondary"
              @click="confirmDelete([slotProps.data._id], 'Delete item')"
            />
          </template>
        </DataColumn>
      </DataTable>
    </main>

    
    <ConfirmDialog :draggable="false" />
  </div>
</template>