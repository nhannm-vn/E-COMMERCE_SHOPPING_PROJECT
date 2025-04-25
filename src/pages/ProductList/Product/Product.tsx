import { Link } from 'react-router-dom'

// Ở mỗi item thì sẽ là một thẻ link khác nhau
// duration-100 Xác định thời gian chuyển đổi đó là 100ms.
// Phải đi kèm với transition để hoạt động.
function Product() {
  return (
    <Link to='/'>
      <div
        className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100
      transition-transform'
      >
        {/* Mẹo pt-[100%] và cho position img để tấm hình thành hình vuông*/}
        <div className='w-full pt-[100%] relative'>
          <img
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m601pzsbaw1k32_tn.webp'
            alt=''
          />
        </div>
      </div>
    </Link>
  )
}

export default Product
