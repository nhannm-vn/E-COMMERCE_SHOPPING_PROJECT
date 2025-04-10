// file chuyên dùng để config axios
import axios, { AxiosInstance } from 'axios'

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
      function (error) {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
