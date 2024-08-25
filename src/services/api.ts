import { useUserStore } from '@/stores/user'
import { ProjectRequestType, ProjectResponseType, ProjectType } from '@/types/project'
import { TaskRequestType, TaskResponseType, TaskType } from '@/types/task'
import { UserRequestType, UserType } from '@/types/user'
import axios, { AxiosResponse } from 'axios'
import get from 'lodash/get'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 60000
})

client.interceptors.request.use(req => {
  const currentUser = useUserStore().currentUser
  if ( get(currentUser, 'authToken', null) )
    req.headers.Authorization = `Bearer ${ currentUser?.authToken }`
  return req
}, err => {
  console.log('REQUEST ERROR ==>', err);
  return Promise.reject(err)
})

client.interceptors.response.use(res => {
  return res
}, err => {
  console.log('RESPONSE ERROR ==>', err);
  const statusCode = get(err, 'response.status', 0)
  if ( [401, 403].includes(statusCode) )
    useUserStore().logoutUser()
  
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
    },
    get(params: UserRequestType<{ authToken: string }>): Promise<AxiosResponse> {
      return client.patch('/users/get', params)
    },
    resendOtp(params: UserRequestType<{ email: string }>): Promise<AxiosResponse> {
      return client.post('/users/resend-otp', params)
    }
  },
  project: {
    create(params: ProjectRequestType<ProjectType>): Promise<AxiosResponse> {
      return client.post('/projects/create', params)
    },
    list(params?: ProjectRequestType<{ filter: any }>): Promise<AxiosResponse<ProjectResponseType>> {
      return client.patch('/projects/list', params)
    },
    getProject(id: string): Promise<AxiosResponse<ProjectType>> {
      return client.get(`/projects/${ id }/get`)
    },
    update(id: string, params: ProjectRequestType<Partial<ProjectType>>): Promise<AxiosResponse<ProjectType>> {
      return client.patch(`/projects/${ id }/update`, params)
    },
    delete(id: string): Promise<AxiosResponse> {
      return client.delete(`/projects/${ id }/delete`)
    },
    undoDelete(params: ProjectRequestType<{ ids: string[] }>): Promise<AxiosResponse> {
      return client.patch(`/projects/undo-delete`, params)
    }
  },
  task: {
    create(params: TaskRequestType<TaskType>): Promise<AxiosResponse> {
      return client.post('/tasks/create', params)
    },
    list(params: TaskRequestType<Pick<TaskType, 'projectId'>>): Promise<AxiosResponse<TaskResponseType>> {
      return client.patch('/tasks/list', params)
    },
    get(id: string): Promise<AxiosResponse<TaskType>> {
      return client.get(`/tasks/${ id }/get`)
    },
    update(id: string, params: TaskRequestType<TaskType>): Promise<AxiosResponse<TaskType>> {
      return client.patch(`/tasks/${ id }/update`, params)
    }
  }
}