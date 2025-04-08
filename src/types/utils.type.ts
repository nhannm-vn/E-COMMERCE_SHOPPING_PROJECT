// Chứa những interface tiện ích
//hỗ trợ cho việc khai báo các interface

export interface ResponseApi<Data> {
  message: string
  data?: Data
}
