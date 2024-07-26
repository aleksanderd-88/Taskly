export type UserType = {
  username: string | null
  email: string | null
  password: string | null
}

export type CreateUserType = {
  data: UserType
}