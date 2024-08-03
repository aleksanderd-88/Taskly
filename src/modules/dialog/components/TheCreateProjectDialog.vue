<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue'
import AppForm from '@/common/components/AppForm.vue'
import { useDialogStore } from '@/modules/dialog/stores'
import { ref, computed, watch } from 'vue'

const dialogStore = useDialogStore()

const projectName = ref('')

const dialogIsVisible = computed(() => dialogStore.dialogIsVisible)

watch(() => dialogIsVisible.value, (value: boolean) => {
  if ( !value )
    projectName.value = ''
})
</script>

<template>
  <AppDialog
    :is-visible="dialogIsVisible"
    header-title="Create project"
    dismissable-mask
    @close="dialogStore.setDialogVisibility(false)"
  >
    <AppForm :style="{ marginTop: '2rem' }">
      <FloatLabel>
        <InputText id="projectName" v-model="projectName" />
        <label for="projectName">Enter a project name</label>
      </FloatLabel>

      <PButton label="Create" type="submit" severity="contrast" />
    </AppForm>
  </AppDialog>
</template>