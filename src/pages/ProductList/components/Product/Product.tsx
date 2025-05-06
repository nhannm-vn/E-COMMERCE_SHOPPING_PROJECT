import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import ProductRating from '../../../../components/ProductRating'

interface Props {
  product: ProductType
}

// Ở mỗi item thì sẽ là một thẻ link khác nhau
// duration-100 Xác định thời gian chuyển đổi đó là 100ms.
// Phải đi kèm với transition để hoạt động.
function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.06rem] hover:shadow-md'>
        {/* Mẹo pt-[100%] và cho position img để tấm hình thành hình vuông*/}
        <div className='relative w-full pt-[100%]'>
          <img
            className='absolute left-0 top-0 h-full w-full bg-white object-cover' //
            src={product.image}
            alt={product.name}
          />
        </div>
        {/* line-clamp giúp cho hiện ... nếu dư nội dung tuy nhiên ta phải cài thêm */}
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          {/* Rating star */}
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={product.rating} />
            {/* Đã bán */}
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
