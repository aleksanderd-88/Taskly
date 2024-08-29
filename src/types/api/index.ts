export type ApiRequestType<T> = {
  data: T
}

export type ApiResponseType<T> = {
  rows: T
  count: number
}