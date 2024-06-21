import { type Error } from './types'

export const normalizeErrorResponse = (error: any): Error => ({
  description: error?.errorDescription,
  key: error?.errorKey,
  message: error?.errorMessage,
  status: error?.errorStatus,
  hasError: !!error?.hasError
})
