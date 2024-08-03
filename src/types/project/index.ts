export type ProjectType = {
  name: string | null
  members: string[]
}

export type ProjectRequestType<T> = {
  data: T
}