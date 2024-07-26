import { defineStore } from "pinia";
import API from '@/services/api'
import { CreateUserType, UserType } from "@/types/user";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {

  const currentUser = ref<UserType | null>(null)

  const createUser = async (params: CreateUserType) => {
    try {
      const { data } = await API.users.create(params)

      setUser(data)

      return Promise.resolve(data)
    } catch (error) {
      return null
    }
  }

  const setUser = (user: UserType) => {
    currentUser.value = user
    localStorage.setItem('__@taskly/user__', JSON.stringify(currentUser.value))
  }

  return {
    createUser,
    setUser
  }
})