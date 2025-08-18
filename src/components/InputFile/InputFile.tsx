import { Fragment, useRef } from 'react'
import config from '../../constants/config'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

function InputFile({ onChange }: Props) {
  // Khai báo một cái ref dùng để điều khiển sự kiện chọn ảnh
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Nghĩa là mình sẽ trigger khi click vào button thì mình sẽ làm cho input bị click
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy ra được nhưng nó là Array FileLists
    //nên chúng ta cần lấy ra thằng items đầu tiên
    //**Tuy nhiên obj có thể null nên chúng ta cần ?.
    const fileFromLocal = event.target.files?.[0]
    //*Handle upload bức ảnh
    //Nếu nó có uploadFile mà kích thước nó quá lớn hoặc là type của nó không phải là ảnh thì mình sẽ
    //toast lên thông báo ngay khi set vào state không hợp lệ
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(
        `Dung lượng file tối đa 1 MB
      Định dạng JPEG, PNG`,
        {
          autoClose: 3000,
          position: 'top-center'
        }
      )
    } else {
      // Mình cần setFile để có thể preview và gửi lên server
      if (onChange) {
        onChange(fileFromLocal)
      }
    }

    //Reset File input value
    //Nghĩa là nó giúp khi upload trùng tấm ảnh vẫn handle được
    //nếu không reset thì thằng input nó sẽ giữa hoài value cũ
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Fragment>
      <input
        className='hidden'
        type='file' //
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm transition-colors hover:bg-slate-100'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}

export default InputFile
