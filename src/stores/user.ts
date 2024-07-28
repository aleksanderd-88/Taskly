import { defineStore } from "pinia";
import API from '@/services/api'
import { UserRequestType, UserType } from "@/types/user";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { get } from "lodash";
import { useToastStore } from "@/modules/toast/stores";

export const useUserStore = defineStore('user', () => {

  const router = useRouter()

  const currentUser = ref<UserType | null>(null)
  const userIsLoggedIn = computed(() => JSON.parse(localStorage.getItem('__@taskly/user__') as string))

  const createUser = async (params: UserRequestType<UserType>) => {
    try {
      const { data } = await API.users.create(params)
      return Promise.resolve(data)
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Something went wrong' 
      })
      return null
    }
  }
  
  const authUser = async (params: UserRequestType<Pick<UserType, 'email' | 'password' | 'otp'>>) => {
    try {
      const { data } = await API.users.auth(params)

      setUser(data)

      return Promise.resolve(data)
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Something went wrong' 
      })
      return null
    }
  }
  
  const getUser = async (params: UserRequestType<{ authToken: string }>) => {
    try {
      const { data } = await API.users.get(params)

      setUser(data)

      return Promise.resolve(data)
    } catch (error) {
      return null
    }
  }
  
  const resendOtp = async (params: UserRequestType<{ email: string }>) => {
    try {
      const { data } = await API.users.resendOtp(params)
      return Promise.resolve(data)
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Something went wrong')
      })
      return null
    }
  }

  const setUser = (user: UserType | null) => {
    currentUser.value = user
    localStorage.setItem('__@taskly/user__', JSON.stringify(currentUser.value))
  }

  const logoutUser = () => {
    localStorage.removeItem('__@taskly/user__')
    router.replace({ name: 'start' })
  }

  watch(() => userIsLoggedIn.value, async value => {
    if ( userIsLoggedIn.value ) {
      setUser(value)
      await getUser({ data: { authToken: get(value, 'authToken', '') } })
    }
  }, { immediate: true })

  return {
    createUser,
    setUser,
    authUser,
    getUser,
    currentUser,
    logoutUser,
    resendOtp
  }
})