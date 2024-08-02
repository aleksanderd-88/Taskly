import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore('dialog', () => {

  const dialogIsVisible = ref(false)

  const setDialogVisibility = (value: boolean) => dialogIsVisible.value = value
  
  return {
    dialogIsVisible,
    setDialogVisibility
  }
})