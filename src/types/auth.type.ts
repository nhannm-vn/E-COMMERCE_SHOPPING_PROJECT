// Chứa những file hoặc interface liên quan đến việc login hoặc register
// nghĩa là liên quan đến phần authentication

import { ResponseApi } from './utils.type'

export type Auth = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>

//keep trying
