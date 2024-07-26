import { defineStore } from "pinia";
import API from '@/services/api'
import { CreateUserType } from "@/types/user";

export const useUserStore = defineStore('user', () => {

  const createUser = async (params: CreateUserType) => {
    try {
      await API.users.create(params)
    } catch (error) {
      console.log(`Error ==> ${ error }`);
    }
  }

  return {
    createUser
  }
})