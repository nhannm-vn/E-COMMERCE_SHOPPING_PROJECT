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

// Khi bạn viết AxiosError<FormError>, thì FormError chính là generic
// type dùng để định nghĩa kiểu dữ liệu của error.response.data trong lỗi mà Axios trả về.

// **** Func giúp chuyển đổi các con số về đúng dạng theo UI
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

// Func tính % giảm giá
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
