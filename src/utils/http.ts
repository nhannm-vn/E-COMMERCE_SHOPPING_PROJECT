// file chuyên dùng để config axios
import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

//keeptrying
class Http {
  instance: AxiosInstance
  // Dùng để lưu token khi login thành công phục vụ cho các route cần authentication
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Xử lí cho các request yêu cầu access_token
    this.instance.interceptors.request.use(
      (config) => {
        // Nếu có accessToken thì gáng vào headers còn rôi đã trả không thì cứ trả như bthg
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        // Khi login hoac register thanh cong thi luu token vao LS
        if (url === '/login' || url === '/register' || url === 'login' || url === 'register') {
          // Lưu ý phải đổi thành arrow thì mới thấy this
          this.accessToken = (response.data as AuthResponse).data?.access_token
          saveAccessTokenToLS(this.accessToken)
        } else if (url === '/logout' || url === 'logout') {
          // Khi logout thi se xoa
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return response
      },
      function (error: AxiosError) {
        // Các lỗi khác thì sẽ là object theo back-end quy định
        // Tuy nhiên đây là trường hợp các lỗi còn lại thì nó sẽ chỉ có message do axios render
        // Nghĩa là lỗi này sẽ khác với lỗi mã 422
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          // Nếu mà trong data không có message thì hãy hãy message ở ngoài error luôn đi
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
