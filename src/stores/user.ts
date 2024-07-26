import { defineStore } from "pinia";
import API from '@/services/api'
import { CreateUserType } from "@/types/user";

export const useUserStore = defineStore('user', () => {

  const createUser = async (params: CreateUserType) => {
    try {
      const { data } = await API.users.create(params)
      return Promise.resolve(data)
    } catch (error) {
      return null
    }
  }

  return {
    createUser
  }
})