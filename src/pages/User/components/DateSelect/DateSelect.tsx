import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  // value được truyền từ bên component Profile sẽ được truyền làm default cho state
  //***Lưu ý: thằng value?.getDate() nó chỉ có hiệu lực khi mà component render lần đầu
  //còn về sau state sẽ được thay đổi mới khi mỗi lần chúng ta setState ở bên dưới
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Lấy value từ event// name dùng để phân biệt và viết được là select nào đang được chỉnh
    //khi đó mình mới có thể set đúng value vào cho state thằng đó
    const { value, name } = event.target
    // Taọ cái object date chứa thông tin cũ và cập nhật thông tin mới
    const newDate = {
      ...date, //
      [name]: value
    }
    // setState để có thông tin mới trong state
    setDate(newDate)
    // Nếu có method onChange thì truyền vào để cho nó thực hiện
    //mục đích có onChange truyền vào từ bên kia để cập nhật cái defaultValue bên kia
    if (onChange) {
      onChange(new Date(newDate.year, newDate.month, newDate.date))
    }
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            value={value?.getDate() || date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          >
            <option disabled>Tháng</option>
            {/* Vì theo thằng newDate nó tính 0-11
            mà range tính là từ original-->target-1 */}
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            name='year'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          >
            <option disabled>Năm</option>
            {range(1990, 2026).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* show error */}
      <div className='mt-1 min-h-[1.3rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
