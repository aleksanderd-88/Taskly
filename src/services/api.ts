import { UserRequestType, UserType } from '@/types/user'
import axios, { AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 60000
})

client.interceptors.request.use(req => {
  return req
}, err => {
  console.log('REQUEST ERROR ==>', err);
  return Promise.reject(err)
})

client.interceptors.response.use(res => {
  return res
}, err => {
  console.log('RESPONSE ERROR ==>', err);
  return Promise.reject(err)
})

export default {
  healthCheck(): Promise<AxiosResponse> {
    return client.get('/health-check')
  },
  users: {
    create(params: UserRequestType<UserType>): Promise<AxiosResponse> {
      return client.post('/users/create', params)
    },
    auth(params: UserRequestType<Pick<UserType, 'email' | 'password'>>): Promise<AxiosResponse> {
      return client.post('/users/auth', params)
    }
  }
}