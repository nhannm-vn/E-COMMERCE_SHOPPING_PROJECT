// Chứa những interface tiện ích
//hỗ trợ cho việc khai báo các interface

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

// Giúp loại bỏ undefined trong key
// Cú pháp '-?' sẽ loại bỏ key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
