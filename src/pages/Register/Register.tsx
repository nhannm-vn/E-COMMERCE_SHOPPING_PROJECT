import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import type { RegisterOptions } from 'react-hook-form'
import Input from '../../components/Input'

//interface này giúp cho nó hiểu
//Form có gì và khi có lỗi thì sẽ dạng lỗi gì
interface FormData {
  email: string
  password: string
  confirm_password: string
}
//try
function Register() {
  const {
    // hỗ trợ lấy giá trị và validate cho các ô input
    register,
    // thằng này hỗ trợ việc submit thay vì phải viết hàm và tạo state
    handleSubmit,
    // error này sẽ có khi form có lỗi
    formState: { errors },
    // _func giúp khi mà mình input bất cứ một thằng nào đó thì
    // nó sẽ cho ra một obj có các prop lưu các thông tin mà mình đã nhập vào
    // và đồng thời cái component cũng sẽ re-render. Còn nếu truyền riêng email
    // thì mỗi lần input đúng ô nào thì nó mới re-render
    // watch,
    // Cách khác giúp lấy value mà không làm re-render như watch
    // đó là sẽ dùng getValues. Thằng này sẽ dùng dựa vào một cái sự kiện nào đó
    getValues
  } = useForm<FormData>()

  // Này truyền vào getValues nghĩa là đem hàm này qua bên kia để sử dụng
  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    // chạy khi cái form đúng
    (data) => {
      console.log(data)
    }
  )

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
                rules={rules.email}
              />

              <div className='mt-2'>
                <input
                  type='password'
                  // name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password as RegisterOptions<FormData, 'password'>)}
                />
                {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
                <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  // name='confirm_password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-md'
                  placeholder='Confirm Password'
                  {...register(
                    'confirm_password',
                    rules.confirm_password as RegisterOptions<FormData, 'confirm_password'>
                  )}
                />
                {/* min-h-[1rem]: giúp luôn có chiều cao kể cả không có lỗi */}
                <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm'>{errors.confirm_password?.message}</div>
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
