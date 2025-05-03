import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

// Khai báo interface cho prop
// **Nhờ extend mà mình có thể không cần ĐỊNH NGHĨA hết các thuộc tính
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  errrorMessage?: string
  classNameInput?: string
  classNameError?: string
  // placeholder: string
  // mt-8
  // className?: string
  // xai trong register
  // name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  // autoComplete?: string
}

export default function Input({
  errrorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
  classNameError = 'mt-1 text-red-600 min-h-[1.3rem] text-sm',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        // name='email'
        className={classNameInput}
        //Có thằng này thì xóa cái name đi bởi vì thằng register sẽ trả về cho một thuộc tính name
        {...registerResult}
        {...rest}
      />
      {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
      <div className={classNameError}>{errrorMessage}</div>
    </div>
  )
}
