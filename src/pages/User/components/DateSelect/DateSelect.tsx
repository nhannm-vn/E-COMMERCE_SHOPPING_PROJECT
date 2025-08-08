import { range } from 'lodash'
import { useState } from 'react'

export default function DateSelect() {
  const [date, setDate] = useState({
    date: 1,
    month: 0,
    year: 1990
  })

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Tháng</option>
            {/* Vì theo thằng newDate nó tính 0-11
            mà range tính là từ original-->target-1 */}
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
            <option disabled>Năm</option>
            {range(1990, 2026).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
