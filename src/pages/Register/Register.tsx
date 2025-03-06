import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from '../../utils/rules'

//interface này giúp cho nó hiểu lỗi có gì bên trong
interface FormData {
  email: string
  password: string
  confirm_password: string
}

function Register() {
  const {
    // hỗ trợ lấy giá trị và validate cho các ô input
    register,
    // thằng này hỗ trợ việc submit thay vì phải viết hàm
    handleSubmit,
    // error này sẽ có khi form có lỗi
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  //
  console.log('error', errors)

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:pr-10 lg:py-32'>
          {/* màn hình lớn thì chiếm 2 cột, bắt đầu từ cột thứ 4.*/}
          {/* image */}
          <div
            className='bg-[url("D:\PIEDTEAM_MERN\F2\Shopee\Shopee-Clone\src\assets\img-register.png")] 
          bg-no-repeat w-full lg:col-span-3 lg:col-start-1 bg-contain bg-center ml-10'
          ></div>
          {/* form */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  // name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
                  placeholder='Email'
                  //Có thằng này thì xóa cái name đi bởi vì thằng register sẽ trả về cho một thuộc tính name
                  {...register('email', rules.email)}
                />
                {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
                <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  // name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
                  placeholder='Password'
                  {...register('password')}
                />
                {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
                <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'></div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  // name='confirm_password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
                  placeholder='Confirm Password'
                  {...register('confirm_password')}
                />
                {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
                <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'></div>
              </div>
              {/* button */}
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-400 text-white text-sm hover:bg-red-500'
                >
                  Đăng Ký
                </button>
              </div>
              {/* Thêm các chính sách */}
              <div className='m-8'>
                <p className='text-sm text-center'>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</p>
                <div className='flex justify-center'>
                  <Link className='text-red-500 mr-2' to=''>
                    <span className='text-sm'>Điều khoản dịch vụ</span>
                  </Link>
                  <span>&</span>
                  <Link className='text-red-500 ml-2' to=''>
                    <span className='text-sm'>Chính sách bảo mật</span>
                  </Link>
                </div>
              </div>
              {/*  */}
              <div className='flex justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-2 hover:text-red-600' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
