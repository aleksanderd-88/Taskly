import { ProjectRequestType, ProjectResponseType, ProjectType } from "@/types/project";
import { defineStore } from "pinia";
import API from '@/services/api'
import { useToastStore } from "@/modules/toast/stores";
import { get } from "lodash";
import { ref } from "vue";

export const useProjectStore = defineStore('project', () => {

  const result = ref<ProjectResponseType>()
  const project = ref<ProjectType | null>(null)

  const createProject = async (params: ProjectRequestType<ProjectType>) => {
    try {
      await API.project.create(params)
      await listProjects()
      useToastStore()
      .setToast({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Successfully created project'
      })
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Failed to create project')
      })
    }
  }

  const updateProject = async (id: string, params: ProjectRequestType<Partial<ProjectType>>) => {
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

  const listProjects = async (params?: ProjectRequestType<{filter: any}>) => {
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

  const undoDelete = async (params: ProjectRequestType<{ ids: string[] }>) => {
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

  const hardDelete = async (params: ProjectRequestType<{ ids: string[] }>) => {
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

  const setRows = (value: ProjectResponseType) => result.value = value
  const setProject = (value: ProjectType) => project.value = value

  return {
    createProject,
    listProjects,
    result,
    getProject,
    project,
    updateProject,
    deleteProject,
    undoDelete,
    hardDelete
  }
})