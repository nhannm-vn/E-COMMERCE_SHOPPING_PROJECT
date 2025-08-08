import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

// Kế thừa type user bên kia để định nghĩa cho body gửi lên giúp update user
//mình sẽ kế thừa tuy nhiên mình sẽ omit loại bỏ bớt những thứ không cần thiết
interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  // method giúp lấy thông tin user về
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  // method update profile
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  }
}
