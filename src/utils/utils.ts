import axios, { AxiosError } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
// Type Predicate
// utils này sẽ giúp check xem có phải lỗi của axios hay không
// mình còn muốn sau khi chạy func này thì error của mình nó sẽ chuyển thành type nhất định
// nghĩa là khi chạy func thì error unknown thành kiểu nhất định luôn
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

// còn function này sẽ check xem có phải là lỗi 422 không
// EntityError phải thỏa là AxiosError và có status là 422

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status == HttpStatusCode.UnprocessableEntity
}
