import { defineStore } from "pinia";
import API from '@/services/api'

export const useApiStore = defineStore('api', () => {

  const checkHealth = async () => {
    try {
      const { data } = await API.healthCheck()
      console.log(data);
    } catch (error) {
      console.log(`Error ==> ${ error }`);
    }
  }

  return {
    checkHealth
  }
})