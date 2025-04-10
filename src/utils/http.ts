// file chuyên dùng để config axios
import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'

//keeptrying
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error: AxiosError) {
        // Các lỗi khác thì sẽ là object theo back-end quy định
        // Tuy nhiên đây là trường hợp các lỗi còn lại thì nó sẽ chỉ có message do axios render
        // Nghĩa là lỗi này sẽ khác với lỗi mã 422
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          // Nếu mà trong data không có message thì hãy hãy message ở ngoài error luôn đi
          const message = data.message || error.message
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
