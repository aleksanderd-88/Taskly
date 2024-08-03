import { ProjectRequestType, ProjectType } from "@/types/project";
import { defineStore } from "pinia";
import API from '@/services/api'
import { useToastStore } from "@/modules/toast/stores";
import { get } from "lodash";

export const useProjectStore = defineStore('project', () => {

  const createProject = async (params: ProjectRequestType<ProjectType>) => {
    try {
      await API.project.create(params)
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

  return {
    createProject
  }
})