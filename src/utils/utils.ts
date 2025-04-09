import axios from 'axios'

// utils này sẽ giúp check xem có phải lỗi của axios hay không
export function isAxiosError(error: unknown) {
  return axios.isAxiosError(error)
}
