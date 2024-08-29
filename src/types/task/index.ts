export type TaskType = {
  _id?: string
  textValue: string
  status: string | null
  userIds?: string[]
  projectId: string
  priority: string | null
  htmlValue?: string
  title: string
  updatedAt?: string
}