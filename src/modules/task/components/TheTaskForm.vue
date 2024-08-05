<script lang="ts" setup>
import AppSection from '@/common/components/AppSection.vue';
import { ProjectType } from '@/types/project';
import { PropType, ref } from 'vue';
import { useTaskStore } from '@/modules/task/store'
import get from 'lodash/get'

const props = defineProps({
  project: {
    type: Object as PropType<ProjectType | null>,
    default: () => ({})
  }
})

const taskStore = useTaskStore()

const input = ref('')

const createTask = async () => {
  if ( !input.value ) return

  await taskStore.createTask({
    data: { 
      text: input.value, 
      complete: false, 
      projectId: get(props, 'project._id', '')
    }
  })

  await taskStore.listTasks({
    data: {
      projectId: get(props, 'project._id', '')
    }
  })

  clearEditor()
}

const clearEditor = () => input.value = ''
</script>

<template>
  <AppSection class="task-form" v-if="project">
    <template #header>
      <section>
        <section>
          <PButton 
            icon="pi pi-window-maximize" 
            severity="secondary" 
            text
            size="small"
            disabled
          />
    
          <h1>
            <i class="pi pi-book"></i>
            {{ project?.name }}
          </h1>
        </section>
  
        <section>
          <PButton label="Share" severity="success" disabled />
          <PButton icon="pi pi-ellipsis-h" text severity="secondary" disabled />
        </section>
      </section>
    </template>

    <template #content>
      <PrimeEditor
        v-model="input" 
        editorStyle="height: 500px"
      />
    </template>

    <template #footer>
      <PButton label="Save task" severity="contrast" @click="createTask()" />
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .25rem;

    &:nth-child(1) {
      width: 100%;
      justify-content: unset;
    }

    &:nth-child(2) {
      button {
        &:nth-child(2) {
          flex-shrink: 0;
          margin-left: .75rem;
        }
      }
    }
  }

  h1 {
    font-size: .9rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: .25rem;

    i {
      font-size: .9rem;
    }

    &::before {
      content: "";
      height: 15px;
      width: 1px;
      margin-right: .75rem;
      background-color: #ccc;
      display: block;
    }
  }
</style>