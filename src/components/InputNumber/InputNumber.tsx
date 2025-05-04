import { forwardRef, InputHTMLAttributes } from 'react'

// Khai báo interface cho prop
// **Nhờ extend mà mình có thể không cần ĐỊNH NGHĨA hết các thuộc tính vd như placeholder
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  errrorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    errrorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md',
    classNameError = 'mt-1 text-red-600 min-h-[1.3rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  // Nghiã là khi người dùng gõ số thì onChange nó mới chạy
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
      <div className={classNameError}>{errrorMessage}</div>
    </div>
  )
})

export default InputNumber

// Component này chuyên dùng riêng cho handler số xài đến onChangeEvent. Nên không có xài lại Input được do có register
