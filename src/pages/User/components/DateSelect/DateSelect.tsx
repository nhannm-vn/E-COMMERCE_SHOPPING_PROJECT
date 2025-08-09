import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: 1,
    month: 0,
    year: 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Lấy value từ event// name dùng để phân biệt và viết được là select nào đang được chỉnh
    //khi đó mình mới có thể set đúng value vào cho state thằng đó
    const { value, name } = event.target
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
      <div className='mt-1 min-h-[1.3rem] text-sm text-red-600'>{}</div>
    </div>
  )
}
