import { defineStore } from "pinia";
import { ref } from "vue";

type ActionType = 'create-project' | 'invite-member' | 'member-overview' | 'edit-text' | ''

export const useDialogStore = defineStore('dialog', () => {

  const dialogIsVisible = ref(false)
  const mode = ref<ActionType>('')

  const setDialogVisibility = (value: boolean, action: ActionType = 'create-project') => {
    dialogIsVisible.value = value
    mode.value = action
  }
  
  return {
    dialogIsVisible,
    setDialogVisibility,
    mode
  }
})