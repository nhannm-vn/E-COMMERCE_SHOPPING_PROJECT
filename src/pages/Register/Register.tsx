import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ResponseApi } from '../../types/utils.type'

//interface này giúp cho nó hiểu
//Form có gì và khi có lỗi thì sẽ dạng lỗi gì

type FormData = Schema

function Register() {
  const {
    // hỗ trợ lấy giá trị và validate cho các ô input
    register,
    // thằng này hỗ trợ việc submit thay vì phải viết hàm và tạo state
    handleSubmit,
    // error này sẽ có khi form có lỗi
    formState: { errors },
    setError
    // setError từ react-hook-form khi chúng ta có được cái lỗi chúng ta sẽ set error vào react-hook-form
    // và react-hook-form sẽ show lên cho chúng ta
    // Lưu ý lỗi 422 thì hiển thị lên form còn lỗi khác thì sẽ toach lên
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // registerAccountMutation sử dụng react-query dùng để fetch api đăng ký tài khoảng
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // handleSubmit của react-hook-form sẽ lấy tất cả những gì có trong form
    // tuy nhiên mình sẽ gởi đúng thôi chứ không gửi dư làm gì
    const body = omit(data, ['confirm_password'])
    console.log('Payload gửi lên:', body)
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log('Register thành công:', data)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntity<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
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
              <Input
                name='confirm_password' //
                register={register}
                type='password'
                placeholder='Confirm Password'
                className='mt-2'
                errrorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />

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
