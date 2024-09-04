<script lang="ts" setup>
import { useDialogStore } from '@/modules/dialog/stores'
import { useProjectStore } from '@/stores/project'
import { computed, ref, watch } from 'vue'
import AppDialog from '@/common/components/AppDialog.vue'
import AppForm from '@/common/components/AppForm.vue'
import get from 'lodash/get'
import omit from 'lodash/omit'

const props = defineProps({
  headerTitle: {
    type: String,
    default: ''
  }
})

const dialogStore = useDialogStore()
const projectStore = useProjectStore()

const input = ref('')

const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'edit-text')

const closeDialog = () => {
  dialogStore.setDialogVisibility(false)
  resetInput()
}

const resetInput = () => input.value = ''

const updateText = async (title = '') => {
  try {
    let data: { name?: string, description?: string } = { name: input.value }

    if ( title === 'Edit description' )
      data = { description: input.value }

    await projectStore.updateProject(
      get(projectStore, 'project._id', '') as string,
      { data: { ...omit(get(projectStore, 'project', null), ['members']), ...data } }
    )

    await projectStore.getProject(get(projectStore, 'project._id', '') as string)

    closeDialog()
  } catch (error) {
    //- Do nothing
  }
}

watch(() => props.headerTitle, value => {
  if ( value === 'Edit description' )
    return input.value = get(projectStore, 'project.description', '')

  input.value = get(projectStore, 'project.name', '')
})
</script>

<template>
  <AppDialog
    :header-title="headerTitle"
    :is-visible="dialogIsVisible"
    dismissable-mask
    @close="closeDialog()"
  >
    <AppForm :style="{marginTop: '1.25rem'}">
      <FloatLabel>
        <InputText id="inputText" v-model="input" />
        <label for="inputText">Enter your text here ...</label>
      </FloatLabel>

      <template #footer>
        <PButton 
          label="Save" 
          severity="contrast" 
          type="submit"
          @click.stop="updateText(headerTitle)"
        />
      </template>
    </AppForm>
  </AppDialog>
</template>