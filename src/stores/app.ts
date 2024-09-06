import { defineStore } from "pinia";
import { ref } from "vue";
import API from '@/services/api'
import { useToastStore } from "@/modules/toast/stores";
import { get } from "lodash";

export const useAppStore = defineStore('app', () => {
  const version = ref<{api: string, client: string, apiVersion: string}>({
    api: '',
    client: '',
    apiVersion: ''
  })

  const getVersion = async () => {
    try {
      const { data } = await API.version.get()
      version.value = data
    } catch (error) {
      console.log(`Failed to fetch application version ${ error }`);
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Failed to fetch application version')
      })
      return Promise.reject(error)
    }
  }

  return {
    getVersion,
    version
  }
})