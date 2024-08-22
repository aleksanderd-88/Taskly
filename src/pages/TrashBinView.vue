<script lang="ts" setup>
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';
import moment from 'moment'

const projectStore = useProjectStore()

const projects = computed(() => projectStore.result?.rows || [])
</script>

<template>
  <div class="trash-bin">
    <h1>Trash bin</h1>

    <PButton
      severity="secondary"
      icon="pi pi-trash"
      label="Empty trash"
      :style="{ 
          width: '100%', 
          maxWidth: '150px', 
          marginBottom: '1rem' 
        }" 
      />
    
    <DataTable
      :value="projects"
      tableStyle="min-width: 50rem"
      size="small"
      v-if="projects.length"
    >
      <DataColumn field="name" header="Name"></DataColumn>
      <DataColumn field="deletedAt" header="Deleted at">
        <template #body="slotProps">
          {{ moment(new Date(slotProps.data.deletedAt)).format('YYYY-MM-DD HH:MM:ss') }}
        </template>
      </DataColumn>
      
      <DataColumn>
        <template #body>
          <PButton icon="pi pi-undo" text severity="secondary" />
          <PButton icon="pi pi-trash" text severity="secondary" />
        </template>
      </DataColumn>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
  .trash-bin {
    padding: 1rem;

    h1 {
      margin-bottom: 1rem;
    }
  }
</style>