import { ProjectType } from "@/types/project";
import { defineStore } from "pinia";
import API from '@/services/api'
import { useToastStore } from "@/modules/toast/stores";
import { get } from "lodash";
import { ref, watch } from "vue";
import { useUserStore } from "./user";
import { ApiRequestType, ApiResponseType } from "@/types/api";

export const useProjectStore = defineStore('project', () => {

  const result = ref<ApiResponseType<ProjectType[]> | null>(null)
  const project = ref<ProjectType | null>(null)
  const userStore = useUserStore()

  const createProject = async (params: ApiRequestType<ProjectType>) => {
    try {
      await API.project.create(params)
      await listProjects()
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Successfully created project'
      })
      return Promise.resolve(true)
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Failed to create project')
      })
      return Promise.reject(error)
    }
  }

  const updateProject = async (id: string, params: ApiRequestType<Partial<ProjectType>>) => {
    try {
      await API.project.update(id, params)
      await listProjects()
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Project updated'
      })
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Failed to update project')
      })
      return Promise.reject(error)
    }
  }

  const listProjects = async (params?: ApiRequestType<Record<string, unknown>>) => {
    try {
      const { data } = await API.project.list(params)
      setRows(data)
    } catch (error) {
      console.log(`Error ==> ${ error }`);
    }
  }

  const getProject = async (id: string) => {
    try {
      const { data } = await API.project.getProject(id)
      setProject(data)
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      return Promise.reject(error)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await API.project.delete(id)
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Project deleted'
      })
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Failed to delete project'
      })
      return Promise.reject(error)
    }
  }

  const undoDelete = async (params: ApiRequestType<{ ids: string[] }>) => {
    try {
      await API.project.undoDelete(params)
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Project(s) updated'
      })
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      return Promise.reject(error)
    }
  }

  const hardDelete = async (params: ApiRequestType<{ ids: string[] }>) => {
    try {
      await API.project.hardDelete(params)
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Project(s) deleted'
      })
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Failed to delete project(s)'
      })
      return Promise.reject(error)
    }
  }

  const verifyInvitationToken = async (params: ApiRequestType<{ projectId: string, token: string }>) => {
    try {
      const { data } = await API.project.verifyToken(params)
      setProject(data)
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'The token has expired'
      })
      return Promise.reject(error)
    }
  }

  const verifyMember = async (params: ApiRequestType<{ token: string }>) => {
    try {
      await API.project.verifyMember(params)
    } catch (error) {
      console.log(`Error ==> ${ error }`);
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: `${ get(error, 'response.data', 'Verification failed') }`
      })
      return Promise.reject(error)
    }
  }

  const setRows = (value: ApiResponseType<ProjectType[]> | null) => result.value = value
  const setProject = (value: ProjectType) => project.value = value

  watch(() => userStore.currentUser, value => {
    if ( !value )
      setRows(null)
  })

  return {
    createProject,
    listProjects,
    result,
    getProject,
    project,
    updateProject,
    deleteProject,
    undoDelete,
    hardDelete,
    verifyInvitationToken,
    verifyMember
  }
})