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