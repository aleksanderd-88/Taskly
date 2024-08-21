<script lang="ts" setup>
import { type PropType, ref, watch, computed } from 'vue'
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
const selectedRow = ref<TaskType | null>(null)
const editMode = computed(() => taskStore.mode === 'edit')

const setBadgeSeverity = (priority: 'Low' | 'Medium' | 'High') => {
  if ( priority === 'Medium') return 'warn'
  if ( priority === 'High' ) return 'danger'
  return 'success'
}

const onRowSelect = (row: { data: TaskType, type: string }) => {
  taskStore.setTask(row.data, 'edit')
}

watch(() => editMode.value, value => {
  if ( !value )
    selectedRow.value = null
})
</script>

<template>
  <DataTable
    v-model:selection="selectedRow"
    :value="tasks"
    tableStyle="min-width: 50rem"
    size="small"
    selection-mode="single"
    dataKey="_id"
    @row-select="onRowSelect($event)"
  >
    <DataColumn field="title" header="Title">
      <template #body="slotProps">
        <div :title="get(slotProps, 'data.textValue', '')">
          <b>{{ slotProps.data.title }}</b>
        </div>
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
        <PrimeBadge
          :severity="setBadgeSeverity(get(slotProps, 'data.priority', 'Low'))">
        </PrimeBadge>
      </template>
    </DataColumn>

    <DataColumn field="status" header="Status">
      <template #body="slotProps">
        {{ slotProps.data.status }}
        &nbsp;
        <i
          class="pi pi-check-circle"
          title="Task is marked as complete"
          v-if="slotProps.data.status === 'Completed'"
        >
        </i>
      </template>
    </DataColumn>
  </DataTable>
</template>