export type TaskType = {
  _id?: string
  textValue: string
  complete: boolean
  userIds?: string[]
  projectId: string
  priority?: string
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