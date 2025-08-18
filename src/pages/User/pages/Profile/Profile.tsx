import { useMutation, useQuery } from '@tanstack/react-query'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import userApi, { BodyUpdateProfile } from '../../../../apis/user.api'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from '../../../../components/InputNumber'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntity } from '../../../../utils/utils'
import { ErrorResponse } from '../../../../types/utils.type'
import InputFile from '../../../../components/InputFile'

// Mình sẽ không sử dụng omit vì nếu trong tương lai nếu schema mình xài
//omit thì nó sẽ bị lỗi giữ lại những cái không mong muốn

//***Mình cần phải lấy những schema cần thiết thôi bởi vì trong schema mình còn để password...
//để phục vụ cho change password. Tuy nhiên mình đang bên page update profile nên cần gì thì giữ cái đó thôi

// type form
type FormDataSchema = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

type FormDataError = Omit<FormDataSchema, 'date_of_birth'> & {
  date_of_birth?: string
}

// schema dùng cho form
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

// ***Cách để truyền được file ảnh vào trong url
// URL.createObjectURL(file)

//Flow1:
//Nhấn upload và upload lên server luôn => server trả về url ảnh
//Nhấn submit thì gửi url ảnh cộng data lên server
//*Nhanh nhưng dễ bị spam upload

//Flow2:
//Nhấn upload: không upload lên server
//Nhấn submit: thì tiến hành upload lên server nếu upload thành công thì tiến hành gọi api updateProfile
//*Chậm hơn một chút nhưng an toàn hơn

export default function Profile() {
  // Mình cũng cập nhật lại profile trong context
  //*thằng profile này dùng để truyền đi các component khác nhau và lấy thông tin hiển thị lên
  const { setProfile } = useContext(AppContext)

  // Tạo một cái state dùng để lưu fileImage
  const [file, setFile] = useState<File>()

  // Khi có một giá trị nó phụ thuộc vào giá trị nào khác thì chúng ta có thể dùng một cái biến
  //khi có file thay đổi thì nó mới chạy lại
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const uploadAvatarMutation = useMutation({
    mutationFn: (body: FormData) => userApi.uploadAvatar(body)
  })

  const {
    register, //
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
    // setError từ react-hook-form thì chúng ta sẽ set cái lỗi vào errors
    //và react-hook-form sẽ hiển thị lên cho chúng ta
    // Mục đích giúp cho ô nó trống để chúng ta có thể truyền giá trị vào để update
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

  // *Thằng này dùng để hiển thị dữ liệu lên form nếu không sử dụng các component như Input
  const avatar = watch('avatar')

  // Lấy dữ liệu để hiện thị lên form
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => userApi.updateProfile(body)
  })

  // Mình cần sử dụng useEffect để có thể setValue vào cho các fields để show ra
  //chứ nếu lần render đầu tiên thì chắc chắn là sẽ chưa có dữ liệu để set, nên cần useEffect
  //chứ useQuery sẽ cần vài giây để get api lúc đó nó sẽ không hợp lí logic
  useEffect(() => {
    // Khi có dữ liệu thì chúng ta sẽ tiến hành set vào fields
    if (profile) {
      setValue('name', profile.name)
      setValue('avatar', profile.avatar)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      // *Đối với dữ liệu từ api thì date_of_birth sẽ là string ISO8601 nên cần phải chuyển
      //về Date vì ở trên mình quy định default là Date
      // *Nếu mà date_of_birth thì mới ép kiểu vì đâu phải lúc nào mới tạo tài khoản thì
      //cũng có date_of_birth đâu. Nếu có thì ép kiểu còn không có thì lấy giá trị mặc định
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  //**Khác nhau giữa mutaAsync và mutation
  //một thằng cần async-await còn một thằng thì xử lý trong onSuccess
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      // Kiểm tra xem thử có file không
      if (file) {
        const form = new FormData()
        form.append('image', file)
        // Gọi api upload
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        // Nếu như upload thành công thì chúng ta sẽ lấy ra được cái avatar
        //nếu mà có th file thì mình sẽ cho cái avatarName = gt server trả về
        // Nghĩa là nếu như có trả về nghĩa là upload ảnh thành công
        avatarName = uploadRes.data.data
        // Set vào trong cái form luôn cho nó đồng bộ
        setValue('avatar', avatarName)
      }
      // Mặc định nếu người dùng mà không chỉnh gì hết thì sẽ cho là ngày 1-1-1990
      const res = await updateProfileMutation.mutateAsync({
        ...data, //Khi update trên server thì mình phải chuyển về đúng dạng ISOstring từ dạng Date
        //còn về dưới code thì chuyển dạng date cho dễ handle
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      // Mình sẽ cập nhật cho profile trong AppContext sau khi update thành công thì res
      //sẽ chứa data đầy đủ theo định dạng của User
      setProfile(res.data.data)
      // Mình cũng cần set lại localstorage bởi vì initial của profile trong appContext
      //nó sẽ lấy từ thằng localStorage nên nếu chúng ta không cập nhật để đồng bộ thì nó sẽ bị lỗi
      setProfileToLS(res.data.data)
      // Sau khi update xong thì chúng ta nên refresh data lại để cập nhận data mới
      refetch()
      // Thông báo
      toast.success(res.data.message, {
        autoClose: 3000
      })
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  //*Khi chúng ta có một thao tác change file thì hàm này sẽ gọi và sẽ set lại cho chúng ta
  //mình phải cần cái onChange để setFile cho state vì mình đã tách component
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  // Nghĩa là mình sẽ trigger khi click vào button thì mình sẽ làm cho input bị click
  // const handleUpload = () => {
  //   fileInputRef.current?.click()
  // }

  // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Lấy ra được nhưng nó là Array FileLists
  //   //nên chúng ta cần lấy ra thằng items đầu tiên
  //   //**Tuy nhiên obj có thể null nên chúng ta cần ?.
  //   const fileFromLocal = event.target.files?.[0]
  //   //*Handle upload bức ảnh
  //   //Nếu nó có uploadFile mà kích thước nó quá lớn hoặc là type của nó không phải là ảnh thì mình sẽ
  //   //toast lên thông báo ngay khi set vào state không hợp lệ
  //   if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
  //     toast.error(
  //       `Dung lượng file tối đa 1 MB
  //       Định dạng JPEG, PNG`,
  //       {
  //         autoClose: 3000,
  //         position: 'top-center'
  //       }
  //     )
  //   } else {
  //     // Mình cần setFile để có thể preview và gửi lên server
  //     setFile(fileFromLocal)
  //   }

  //   //Reset File input value
  //   //Nghĩa là nó giúp khi upload trùng tấm ảnh vẫn handle được
  //   //nếu không reset thì thằng input nó sẽ giữa hoài value cũ
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = ''
  //   }
  // }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* Vi khi update thì mình sẽ gửi toàn bộ lên chính vì vậy mà mình sẽ phải bọc form ở đây */}
      <form className='mt-8 flex max-lg:flex-col-reverse md:flex-grow md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-14'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='name'
                placeholder='Tên'
                errrorMessage={errors.name?.message}
                classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control} //
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    placeholder='Số điện thoại'
                    errrorMessage={errors.phone?.message}
                    classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errrorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border py-2 border-gray-300 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          {/* Vì nó không nhận vào register nên cần phải dùng Controller */}
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                errorMessage={errors.date_of_birth?.message} //
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
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
        {/* Avatar Profile */}
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                className='h-full w-full rounded-full object-cover' //getAvatarUrl(avatar): trường hợp form chưa có thì hiển thị ra cái svg
                src={previewImage || getAvatarUrl(avatar)}
                alt=''
              />
            </div>
            <InputFile onChange={handleChangeFile} />
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
