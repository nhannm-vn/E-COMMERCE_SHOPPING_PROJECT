import { useQuery } from '@tanstack/react-query'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import userApi from '../../../../apis/user.api'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Mình sẽ không sử dụng omit vì nếu trong tương lai nếu schema mình xài
//omit thì nó sẽ bị lỗi giữ lại những cái không mong muốn

// type form
type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
// schema dùng cho form
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const {
    register, //
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
    // setError từ react-hook-form thì chúng ta sẽ set cái lỗi vào errors
    //và react-hook-form sẽ hiển thị lên cho chúng ta
  } = useForm<FormData>({
    // Giúp khi render lần đầu thì nó sẽ có giá trị này
    defaultValues: {
      name: '',
      address: '',
      avatar: '',
      phone: '',
      // Luu y: tháng bắt đầu từ số 0-11
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  // Lấy dữ liệu để hiện thị lên form
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* Vi khi update thì mình sẽ gửi toàn bộ lên chính vì vậy mà mình sẽ phải bọc form ở đây */}
      <form className='mt-8 flex max-lg:flex-col-reverse md:flex-grow md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-14'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>nhan*********@gmail.com</div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            {/* Điều này giúp cho button có thể giữ nguyên được hiện trạng và không bị chạy đi
            đâu khi mà mình chỉnh màn hình sm: nghĩa là màn hình từ >=640 thì thực hiện */}
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white transition-colors hover:bg-orange/80'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        {/* Avatar Profile */}
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                className='h-full w-full rounded-full object-cover'
                src='https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25085005/reactjs-inner.svg'
                alt=''
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng JPEG, PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
