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

export type TaskRequestType<T> = {
  data: T
}

export type TaskResponseType = {
  rows: TaskType[]
  count: number
}