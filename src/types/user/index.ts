export type UserType = {
  username: string | null
  email: string | null
  password: string | null
}

export type UserRequestType<T> = {
  data: T
}