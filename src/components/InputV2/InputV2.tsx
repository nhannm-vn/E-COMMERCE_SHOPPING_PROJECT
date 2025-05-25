// Đối với phiên bản này mình chỉ dùng được với react-hook-form thôi
//đối với thằng này sẽ dùng useController

import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'

// Khai báo interface cho prop
// **Nhờ extend mà mình có thể không cần ĐỊNH NGHĨA hết các thuộc tính vd như placeholder
export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  // type: React.HTMLInputTypeAttribute
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
    classNameError = 'mt-1 text-red-600 min-h-[1.3rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  // Nghiã là khi người dùng gõ số thì onChange nó mới chạy
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật localValue state
      setLocalValue(valueFormInput)
      // Gọi field.onChange để cập nhật vào state react-hook-form
      field.onChange(event)
      // Thuc thi onChange callback từ bên ngoài truyền vào props
      if (onChange) {
        onChange(event)
      }
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...field} {...rest} onChange={handleChange} value={value || localValue} />
      {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// Component này chuyên dùng riêng cho handler số xài đến onChangeEvent. Nên không có xài lại Input được do có register
