export type UserType = {
  username: string | null
  email: string | null
  password: string | null
  authToken?: string
}

export type UserRequestType<T> = {
  data: T
}