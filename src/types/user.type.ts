// File này sẽ dùng để chứa interface định nghĩa cho User
// mình sẽ định nghĩa xem một user sẽ trả về những gì

type Role = 'User' | 'Admin'
export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string // ISO 8601
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
