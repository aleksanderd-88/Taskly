import { ToastType } from "@/types/toast";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore('toast', () => {
  const toast = ref<ToastType>({
    summary: 'Info',
    severity: 'info',
    detail: null,
    group: 'br',
    life: 5000
  })

  const setToast = (params: ToastType) => {
    toast.value = { ...toast.value, ...params }
  }

  return {
    toast,
    setToast
  }
})