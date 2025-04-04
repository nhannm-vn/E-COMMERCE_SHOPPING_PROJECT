// Chứa những file hoặc interface liên quan đến việc login hoặc register
// nghĩa là liên quan đến phần authentication

import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>

//keep trying
//keep trying
//keep trying
