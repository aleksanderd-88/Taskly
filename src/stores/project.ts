import { ProjectRequestType, ProjectResponseType, ProjectType } from "@/types/project";
import { defineStore } from "pinia";
import API from '@/services/api'
import { useToastStore } from "@/modules/toast/stores";
import { get } from "lodash";
import { ref } from "vue";

export const useProjectStore = defineStore('project', () => {

  const result = ref<ProjectResponseType>()

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

  const listProjects = async () => {
    try {
      const { data } = await API.project.list()
      setRows(data)
    } catch (error) {
      useToastStore()
      .setToast({ 
        severity: 'error', 
        summary: 'Error', 
        detail: get(error, 'response.data', 'Failed to list project')
      })
    }
  }

  const setRows = (value: ProjectResponseType) => result.value = value

  return {
    createProject,
    listProjects,
    result
  }
})