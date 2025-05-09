import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from '../../utils/utils'
import InputNumber from '../../components/InputNumber'

function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    // Điền cái id để khi id thay đổi thì dữ liệu sẽ fetch lại
    queryKey: ['product', id],
    // Phải as string vì mình biết id lúc nào cũng có
    queryFn: () => productApi.getProductDetail(id as string)
  })
  // Lấy dữ liệu ra
  const product = productDetailData?.data.data
  console.log(product)
  // if (!product) return null
  return (
    <div className='border-[1px] border-red-500 bg-gray-200 py-6'>
      <div className='border-[1px] border-green-600 bg-white p-4 shadow'>
        <div className='container'>
          {/* Vì có thể data là undefind nên cần phải check */}
          {product && (
            <div className='grid grid-cols-12 gap-9 border-[1px] border-yellow-500'>
              {/* Left */}
              <div className='border-purple-600-500 col-span-5 border-[1px]'>
                {/* Kỹ thuật để cho hình có chiều cao bằng chiều rộng */}
                <div className='relative w-full pt-[100%] shadow'>
                  <img
                    className='absolute left-0 top-0 h-full w-full bg-white object-cover' //
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {/* render ra các bức ảnh */}
                  {product.images.slice(0, 5).map((img, index) => {
                    const isActive = index === 0
                    return (
                      <div className='relative w-full pt-[100%] shadow' key={img}>
                        <img
                          className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover' //
                          src={img}
                          alt={product.name}
                        />
                        {/* Việc này giúp có border bao quanh khi active nhưng không làm thay đổi kích thước của ảnh
                          inset-0 giúp ôm sát tất cả các cạnh
                        */}
                        {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                      </div>
                    )
                  })}
                  <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Right */}
              <div className='border-black-500 col-span-7 border-[1px]'>
                {/* Name Sp */}
                <h1 className='text-xl font-medium capitalize'>{product.name}</h1>
                {/*  */}
                {/* Information */}
                <div className='mt-8 flex items-center'>
                  {/* Rating */}
                  <div className='flex items-center'>
                    <span className='mr-1 border border-b border-b-orange border-l-transparent border-r-transparent border-t-transparent text-orange'>
                      {product.rating}
                    </span>
                    <ProductRating
                      rating={product.rating}
                      activeClassname='fill-orange text-orange h-4 w-4' //
                      nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                    />
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  {/* View */}
                  <div>
                    <span className='mr-1 border border-b border-b-black border-l-transparent border-r-transparent border-t-transparent text-black'>
                      {formatNumberToSocialStyle(product.view)}
                    </span>
                    <span className='ml-1 text-gray-500'>Đã xem</span>
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  {/* Sold */}
                  <div>
                    <span className='mr-1 border border-b border-b-black border-l-transparent border-r-transparent border-t-transparent text-black'>
                      {formatNumberToSocialStyle(product.sold)}
                    </span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  {/* Quantity */}
                  <div>
                    <span className='mr-1 border border-b border-b-black border-l-transparent border-r-transparent border-t-transparent text-black'>
                      {formatNumberToSocialStyle(product.quantity)}
                    </span>
                    <span className='ml-1 text-gray-500'>Số lượng</span>
                  </div>
                </div>
                {/* Khoang gia */}
                <div className='mt-8 flex items-center bg-gray-100 px-5 py-4'>
                  <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  <div className='ml-5 text-3xl font-medium text-orange'>{formatCurrency(product.price)}</div>
                  <div className='ml-5 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                    {rateSale(product.price_before_discount, product.price)} Giảm
                  </div>
                </div>
                {/* So Luong */}
                <div className='mt-8 flex items-center'>
                  <div className='capitalize text-gray-500'>Số lượng</div>
                  {/* Input so luong hang */}
                  <div className='ml-10 flex items-center'>
                    <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
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
                      value={1}
                      className=''
                      classNameError='hidden'
                      classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                    />
                    <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'>
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
                  {/* So luong sp co san */}
                  <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
                </div>
                {/* Button dat hang */}
                <div className='mt-8 flex items-center'>
                  <button className='justify-content-center flex h-12 items-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                      </g>
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
