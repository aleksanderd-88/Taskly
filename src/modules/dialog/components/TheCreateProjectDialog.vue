<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue'
import AppForm from '@/common/components/AppForm.vue'
import { useDialogStore } from '@/modules/dialog/stores'
import { ref, computed, watch, reactive } from 'vue'
import omit from 'lodash/omit'
import { ProjectType } from '@/types/project'
import { useProjectStore } from '@/stores/project'
import AppMemberForm from '@/common/components/AppMemberForm.vue'

const dialogStore = useDialogStore()
const projectStore = useProjectStore()

const initialValues: ProjectType & { recipient: string | null } = {
  name: null,
  recipient: null,
  members: new Array()
}

const input = reactive({ ...initialValues })
const step = ref(1)

const dialogIsVisible = computed(() => dialogStore.dialogIsVisible)

const handleSubmit = () => {
  if ( !input.name ) return
  step.value = 2
}

const addMembers = (recipient: string | null) => {
  if ( !recipient ) return

  input.members = [ ...input.members, recipient ]
  input.recipient = null
}

const resetForm = () => {
  step.value = 1
  Object.assign(input, { ...initialValues })
}

const createProject = async () => {
  if ( step.value !== 2 ) return
  
  await projectStore.createProject({ data: omit(input, ['recipient']) })
  dialogStore.setDialogVisibility(false)
}

watch(() => dialogIsVisible.value, (value: boolean) => {
  if ( !value )
    resetForm()
})
</script>

<template>
  <AppDialog
    :header-title="step === 1 ? 'Create project' : 'Invite member (Optional)'"
    dismissable-mask
  >
    <AppForm :style="{ marginTop: '2rem' }" @on-submit="handleSubmit()">
      <template v-if="step === 1">
        <FloatLabel>
          <InputText id="projectName" v-model="input.name" />
          <label for="projectName">Enter a project name</label>
        </FloatLabel>
      </template>

      <template v-if="step === 2">
        <AppMemberForm
          :input="input.recipient"
          @input="input.recipient = $event"
          @cancel="step = 1"
          @submit="addMembers(input.recipient)"
        />
      </template>

      <PButton 
        :label="step === 1 ? 'Proceed' : 'Create'" 
        severity="contrast" 
        :icon="step === 2 ? 'pi pi-folder-plus' : ''" icon-pos="right"
        type="submit"
        @click.stop="createProject()"
      />
    </AppForm>
  </AppDialog>
</template>