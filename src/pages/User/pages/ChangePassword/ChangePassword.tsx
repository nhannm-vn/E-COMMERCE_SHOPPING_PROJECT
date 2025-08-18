import { useForm } from 'react-hook-form'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserSchema } from '../../../../utils/rules'

export default function ChangePassword() {
  // type form
  type FormDataSchema = Pick<UserSchema, 'password' | 'confirm_password' | 'new_password'>

  // schema dùng cho form
  const profileSchema = userSchema.pick(['password', 'confirm_password', 'new_password'])

  const {
    //register, //
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormDataSchema>({
    // Giúp khi render lần đầu thì nó sẽ có giá trị này
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      phone: '',
      // Luu y: tháng bắt đầu từ số 0-11
      date_of_birth: new Date(1990, 0, 1)
      //==> 1/1/1990
    },
    resolver: yupResolver(profileSchema)
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* Vi khi update thì mình sẽ gửi toàn bộ lên chính vì vậy mà mình sẽ phải bọc form ở đây */}
      <form className='mt-8 flex max-lg:flex-col-reverse md:flex-grow md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-14'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
                errrorMessage={errors.password?.message}
                classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                errrorMessage={errors.new_password?.message}
                classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='confirm_password'
                type='password'
                placeholder='Mật khẩu mới'
                errrorMessage={errors.confirm_password?.message}
                classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          {/* Button */}
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            {/* Điều này giúp cho button có thể giữ nguyên được hiện trạng và không bị chạy đi
        đâu khi mà mình chỉnh màn hình sm: nghĩa là màn hình từ >=640 thì thực hiện */}
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white transition-colors hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
