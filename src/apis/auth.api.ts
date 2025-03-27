import { AuthResponse } from '../types/auth.type'
import http from '../utils/httpt'

export const registerAccount = (body: {
  email: string //
  password: string
}) => http.post<AuthResponse>('/register', body)
