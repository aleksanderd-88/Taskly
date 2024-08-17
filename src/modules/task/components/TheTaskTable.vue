<script lang="ts" setup>
import { type PropType } from 'vue'
import { TaskType } from '@/types/task'
import moment from 'moment'
import get from 'lodash/get'
import { useTaskStore } from '../store';

defineProps({
  tasks: {
    type: Array as PropType<TaskType[]>,
    default: () => ([])
  }
})

const taskStore = useTaskStore()

const onRowSelect = (row: { data: TaskType, type: string }) => {
  taskStore.setTask(row.data, 'edit')
}
</script>

<template>
  <DataTable
    :value="tasks"
    tableStyle="min-width: 50rem"
    size="small"
    selection-mode="single"
    dataKey="_id"
    @row-select="onRowSelect($event)"
  >
    <DataColumn field="text" header="Description">
      <template #body="slotProps">
        {{ slotProps.data.textValue }}
      </template>
    </DataColumn>
    
    <DataColumn field="updatedAt" header="Updated">
      <template #body="slotProps">
        {{ moment.duration(moment(get(slotProps, 'data.updatedAt', '')).diff(moment())).humanize(true) }}
      </template>
    </DataColumn>

    <DataColumn field="priority" header="Priority">
      <template #body="slotProps">
        {{ slotProps.data.priority }}
      </template>
    </DataColumn>
  </DataTable>
</template>