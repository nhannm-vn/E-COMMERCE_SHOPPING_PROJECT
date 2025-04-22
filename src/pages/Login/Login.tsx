import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../apis/auth.api'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import Input from '../../components/Input'

// Mình sẽ lợi dụng Schema để định nghĩa thay cho type thuần luôn
// Bên login form sẽ không có confirm_password nên mình sẽ Omit đi
type FormData = Omit<Schema, 'confirm_password'>

// schema của login cũng khác nên cần độ chế lại miếng
const loginSchema = schema.omit(['confirm_password'])

function Login() {
  // Lấy setIsAuthenticated bằng useContext
  //react-form
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // loginMutation sử dụng react-query dùng để fetch api đăng ký tài khoảng
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Payload gửi lên:', data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('Login thành công:', data)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange '>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:pr-10 lg:py-32'>
          {/* màn hình lớn thì chiếm 3 cột, bắt đầu từ cột thứ 1 */}
          {/* image */}
          <div
            className='bg-[url("D:\PIEDTEAM_MERN\F2\Shopee\Shopee-Clone\src\assets\img-login.png")] 
          bg-no-repeat w-full lg:col-span-3 lg:col-start-1 bg-contain bg-center ml-10'
          ></div>
          {/* màn hình lớn thì chiếm 2 cột, bắt đầu từ cột thứ 4.*/}
          {/* form */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email' //
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errrorMessage={errors.email?.message}
              />
              <Input
                name='password' //
                register={register}
                type='password'
                placeholder='Password'
                className='mt-2'
                errrorMessage={errors.password?.message}
                autoComplete='on'
              />
              {/* button */}
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-400 text-white text-sm hover:bg-red-500'
                >
                  Đăng Nhập
                </button>
              </div>
              {/* forget and sms */}
              <div className='mt-2 flex justify-between'>
                <Link className='text-blue-900' to=''>
                  <span className='text-sm'>Quên mật khẩu</span>
                </Link>
                <Link className='text-blue-900' to=''>
                  <span className='text-sm'>Đăng nhập với SMS</span>
                </Link>
              </div>
              {/* --HOẶC-- */}
              <div className='flex items-center mt-3'>
                <div className='flex-1 border-t border-gray-300'></div>
                <span className='px-3 text-gray-300 text-sm uppercase'>hoặc</span>
                <div className='flex-1 border-t border-gray-300'></div>
              </div>
              {/* facebook and google */}
              <div className='mt-8 flex'>
                {/* facebook */}
                <div>
                  <button
                    type='button'
                    className='text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2'
                  >
                    <svg
                      className='w-4 h-4 me-2'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 8 19'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Sign in with Facebook
                  </button>
                </div>
                {/* google */}
                <div>
                  <button
                    type='button'
                    className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2'
                  >
                    <svg
                      className='w-4 h-4 me-2'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 18 19'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </div>
              {/* translate */}
              <div className='flex justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-red-400 ml-2 hover:text-red-600' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
