// Chứa những interface tiện ích
//hỗ trợ cho việc khai báo các interface

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}
