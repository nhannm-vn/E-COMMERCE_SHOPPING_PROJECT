import { Link } from 'react-router-dom'

// Ở mỗi item thì sẽ là một thẻ link khác nhau

function Product() {
  return (
    <Link to='/' className='border-[2px] border-yellow-400'>
      <div className=''></div>
    </Link>
  )
}

export default Product
