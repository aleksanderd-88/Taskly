export type TaskType = {
  _id?: string
  text: string
  complete: boolean
  userIds?: string[]
  projectId: string
}

export type TaskRequestType<T> = {
  data: T
}

export type TaskResponseType = {
  rows: TaskType[]
  count: number
}