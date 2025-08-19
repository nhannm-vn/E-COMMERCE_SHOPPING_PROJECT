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

//-----------------------------------------------------------------------------
// yup sẽ validate các schema cho form hay cho register viết thuần hay hơn nhiều
//có thằng này thì bỏ luôn thằng trên
//
//

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  // _Giá một thằng có cũng không có lỗi
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc') //
    .email('Email không đúng định dạng')
    .max(160, 'Độ dài từ 5 - 160 ký tự')
    .min(5, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string() //
    .required('Password là bắt buộc')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .min(6, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string() //
    .required('Nhập lại password là bắt buộc')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  // Một cái giá trị mà nó matches với một giá trị nào đó: xài oneOf
  //cái array nghĩa là một trong những cái giá trị này
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }), //
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }), //
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

// Tạo một cái user schema
// Tất cả những thằng này đều không có required vì có hay không đều được
export const userSchema = yup.object({
  name: yup
    .string() //
    .max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup
    .string() //
    .max(20, 'Độ dài tối đa là 20 ký tự'),
  avatar: yup
    .string() //
    .max(1000, 'Độ dài tối đa 1000 ký tự'),
  address: yup
    .string() //
    .max(160, 'Độ dài tối đa là 160 ký tự'),
  //*Nếu tách ra từng thằng để validate thì rất mệt
  //thay vì như vậy chỉ cần xài yup.date là xong
  //mình cho giá trị lớn nhất là giá trị hiện tại để không cho nó chọn một ngày trong tương lai
  //*Khi gửi lên server thì phải chuyển thành ISO string
  //*Thằng date() sẽ giúp handle ngày theo đúng tháng nào thì có bao nhiêu ngày
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  //*Thằng này mình sẽ kế thừa bên trên
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: schema.fields['confirm_password'] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >
})

export type UserSchema = yup.InferType<typeof userSchema>

// Trường hợp muốn tái sử dụng schema ở trên mà bỏ bớt thằng nào đó
//const loginShema = schema.omit(['confirm_password'])

//export type LoginSchema = yup.InferType<typeof loginShema>

// Thằng này sẽ thay thế cho không cần định nghĩa form bên kia như thủ công
export type Schema = yup.InferType<typeof schema>
