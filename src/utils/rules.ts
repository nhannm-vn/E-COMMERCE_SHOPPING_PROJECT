// File này chứa các rules validate cho form

import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

//tách ra để cho dễ đọc và có thể tái sử dụng
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function' //
        ? // value ở đây khi validate thì nó sẽ lấy của chính ô luôn. Nghĩa là nếu callback return về boolean thì là chạy. Còn nếu sai điều kiện thì nó sẽ trả về câu chửi
          (value: string) => {
            if (value === getValues('password')) {
              return true
            } else {
              return 'Nhập lại password không khớp'
            }
          }
        : undefined
  }
})

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required()
  })
  .required()
