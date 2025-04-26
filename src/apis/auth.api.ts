// Folder chứa những thằng liên quan đến api

import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

// Gom thành obj cho tiện dễ xài
const authApi = {
  // register
  registerAccount: (body: {
    email: string //
    password: string
  }) => http.post<AuthResponse>('register', body),
  // login
  login: (body: {
    email: string //
    password: string
  }) => http.post<AuthResponse>('login', body),
  // logout
  logout: () => http.post('logout')
}
