import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

// Khai báo interface cho prop
interface Props {
  type: React.HTMLInputTypeAttribute
  errrorMessage?: string
  placeholder: string
  // mt-8
  className?: string
  // className rieng cua tung thang
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({}: Props) {
  return (
    <div className='mt-8'>
      <input
        type='email'
        // name='email'
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
        placeholder='Email'
        //Có thằng này thì xóa cái name đi bởi vì thằng register sẽ trả về cho một thuộc tính name
        {...register('email', rules.email as RegisterOptions<FormData, 'email'>)}
      />
      {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
      <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'>{errors.email?.message}</div>
    </div>
  )
}
