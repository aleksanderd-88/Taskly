<script lang="ts" setup>
import AppSection from '@/common/components/AppSection.vue';
import { ProjectType } from '@/types/project';
import { computed, PropType, reactive, ref, watch } from 'vue';
import { useTaskStore } from '@/modules/task/store'
import get from 'lodash/get'
import pick from 'lodash/pick'
import { fieldIsEmpty } from '@/libs'
import { EditorLoadEvent } from 'primevue/editor';

const props = defineProps({
  project: {
    type: Object as PropType<ProjectType | null>,
    default: () => ({})
  }
})

const taskStore = useTaskStore()

const initialValues = {
  htmlValue: '',
  textValue: ''
}
const editorKeyValue = ref<string>('')

const input = reactive({ ...initialValues })

const editMode = computed(() => taskStore.mode === 'edit')
const task = computed(() => taskStore.task)

const createTask = async () => {
  if ( fieldIsEmpty(pick(input, ['text'])) ) return

  await taskStore.createTask({
    data: { 
      textValue: get(input, 'textValue', ''),
      htmlValue: get(input, 'htmlValue', ''), 
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

const clearEditor = () => Object.assign(input, { ...initialValues })

const getTextValue = (event: { textValue: string }) => input.textValue = event.textValue

const onLoad = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({
      html: task.value?.htmlValue
    })
  );
}

watch(() => task.value, (value) => {
  if ( value ) {
    editorKeyValue.value = value._id as string
  }
}, { deep: true })
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
        v-model="input.htmlValue"
        @text-change="getTextValue($event)"
        editorStyle="height: 500px"
        @load="onLoad"
        :key="editorKeyValue"
      />
    </template>

    <template #footer>
      <section>
        <PButton
        label="Cancel"
        severity="secondary"
        :style="{ flex: 1 }"
        v-if="editMode"
        @click.stop
      />

      <PButton
        :label="editMode ? 'Update task' : 'Save task'"
        severity="contrast"
        :style="{ flex: 5 }"
        @click="createTask()"
      />
      </section>
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