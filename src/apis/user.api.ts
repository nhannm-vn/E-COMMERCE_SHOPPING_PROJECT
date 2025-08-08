import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

// Kế thừa type user bên kia để định nghĩa cho body gửi lên giúp update user
//mình sẽ kế thừa tuy nhiên mình sẽ omit loại bỏ bớt những thứ không cần thiết
interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

//***Dù có gửi password lên update hay gì đi nữa thì nó cũng trả về type User thôi

const userApi = {
  // method giúp lấy thông tin user về
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  // method update profile
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  // method upload avatar
  //**Lưu ý khi sử dụng method update avatar thì cần truyền thêm một content-header
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
