import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../utils/utils'
import ProductRating from '../../../components/ProductRating'

interface Props {
  product: ProductType
}

// Ở mỗi item thì sẽ là một thẻ link khác nhau
// duration-100 Xác định thời gian chuyển đổi đó là 100ms.
// Phải đi kèm với transition để hoạt động.
function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div
        className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100
        transition-transform overflow-hidden'
      >
        {/* Mẹo pt-[100%] và cho position img để tấm hình thành hình vuông*/}
        <div className='w-full pt-[100%] relative'>
          <img
            className='absolute top-0 left-0 bg-white w-full h-full object-cover' //
            src={product.image}
            alt={product.name}
          />
        </div>
        {/* line-clamp giúp cho hiện ... nếu dư nội dung tuy nhiên ta phải cài thêm */}
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            Áo phông MLB KOREA nam nữ cao cấp, 100% cotton co giãn 2 chiều , định lượng 250gms,NY VIỀN TRẮNG //
          </div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-sm'>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-sm'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          {/* Rating star */}
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating />
            {/* Đã bán */}
            <div className='ml-2 text-xs'>
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
