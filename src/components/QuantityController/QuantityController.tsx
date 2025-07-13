import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  // Để không vượt quá số lượng sp này
  max?: number
  // Chia ra ba sự kiện để tăng tính tái sử dụng
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  // Tạo localState để giúp cho dù người dùng không truyền gì vào cũng có thể bấm tăng giảm được
  //mục đích giúp cho component của chúng ta flex hơn cho dù không truyền gì value vào thì cũng có thể bấm được
  //vì có giá trị lưu vào biến state
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  // Logic để tăng giảm số lượng sp đặt hàng
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy từ ô input khi nhập tay
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    // Check trước đã xài
    if (onType) {
      onType(_value)
    }
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }

    // Lấy từ value trên xuống biến đổi và cập nhật. Thực chất thằng onIncrease chính là setByCount
    if (onIncrease) {
      onIncrease(_value)
    }
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }

    if (onDecrease) {
      onDecrease(_value)
    }
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onFocusOut) {
      onFocusOut(Number(event.target.value))
    }
  }

  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
