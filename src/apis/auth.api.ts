import http from '../utils/httpt'

export const registerAccount = (body: {
  email: string //
  password: string
}) => http.post('/register', body)
