<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue'
import AppForm from '@/common/components/AppForm.vue'
import { useDialogStore } from '@/modules/dialog/stores'
import { ref, computed, watch, reactive } from 'vue'
import { ProjectType } from '@/types/project'
import { useProjectStore } from '@/stores/project'
import AppMemberForm from '@/common/components/AppMemberForm.vue'
import { useRoute, useRouter } from 'vue-router'

const dialogStore = useDialogStore()
const projectStore = useProjectStore()
const route = useRoute()
const router = useRouter()

const initialValues: ProjectType = {
  name: null,
  members: new Array()
}

const input = reactive({ ...initialValues })
const step = ref(1)

const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'create-project')
const dialogMode = computed(() => dialogStore.mode)

const handleSubmit = () => {
  if ( !input.name ) return
  step.value = 2
}

const resetForm = () => {
  step.value = 1
  Object.assign(input, { ...initialValues })
}

const createProject = async () => {
  try {
    if ( step.value !== 2 ) return
    
    await projectStore.createProject({ data: input })
    dialogStore.setDialogVisibility(false)
  
    if ( route.name !== 'projectList' )
      router.push({ name: 'projectList' })
  } catch (error) {
    //- Do nothing
  }
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
    :is-visible="dialogIsVisible"
    @close="dialogStore.setDialogVisibility(false)"
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
        @cancel="step = 1"
        @on-submit="input.members = $event"
      />
      </template>

      <template #footer>
        <PButton 
          :label="step === 1 ? 'Proceed' : 'Create'" 
          severity="contrast" 
          :icon="step === 2 ? 'pi pi-folder-plus' : ''" icon-pos="right"
          type="submit"
          v-if="dialogMode === 'create-project'"
          @click.stop="createProject()"
        />
      </template>
    </AppForm>
  </AppDialog>
</template>