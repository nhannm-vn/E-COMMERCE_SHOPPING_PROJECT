import { Link } from 'react-router-dom'

// Ở mỗi item thì sẽ là một thẻ link khác nhau
// Xác định thời gian chuyển đổi đó là 100ms.
// Phải đi kèm với transition để hoạt động.
function Product() {
  return (
    <Link to='/' className='border-[2px] border-yellow-400'>
      <div
        className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100
      transition-transform'
      >
        Product
      </div>
    </Link>
  )
}

export default Product
