export type UserType = {
  username: string | null
  email: string | null
  password: string | null
  authToken?: string
  accountIsVerified?: boolean
}

export type UserRequestType<T> = {
  data: T
}