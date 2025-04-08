// Chứa những file hoặc interface liên quan đến việc login hoặc register
// nghĩa là liên quan đến phần authentication

import { User } from './user.type'
import { ResponseApi } from './utils.type'

// ResponseApi là interface bao đóng cho tổng thể sẽ có 2 thằng chính là message và data
// AuthResponse là kiểu dữ liệu mà server  trả về cụ thể cho register/login luôn
export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
