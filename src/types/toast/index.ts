export type ToastType = {
  detail: string | null
  summary?: string
  severity?: "info" | "success" | "warn" | "error" | "secondary" | "contrast" | undefined
  life?: number
  group?: string
}