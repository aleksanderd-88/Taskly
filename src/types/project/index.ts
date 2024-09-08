export type ProjectType = {
  name: string | null
  description?: string | null
  members: MemberType[]
  _id?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
  isDeleted?: boolean
  owner?: string
}

export type MemberType = {
  _id?: string
  email: string
  verified?: boolean
}