export type ProjectType = {
  name: string | null
  members: string[]
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export type ProjectRequestType<T> = {
  data: T
}

export type ProjectResponseType = {
  rows: ProjectType[]
  count: number
}