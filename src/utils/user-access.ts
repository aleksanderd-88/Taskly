import { useProjectStore } from "@/stores/project"
import { useUserStore } from "@/stores/user"

const projectStore = useProjectStore()
const userStore = useUserStore()

export const userIsProjectOwner = () => {
  return projectStore.project?.owner === userStore.currentUser?.email
}

export const noPermissionLabel = () => {
  return !userIsProjectOwner() ? 'You dont have permission to perform this action' : ''
}