import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatNumberToSocialStyle } from '../../utils/utils'

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
              <div className='border-black-500 col-span-7 border-[1px]'>
                <h1 className='text-xl font-medium capitalize'>{product.name}</h1>
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
                  {/* Sold */}
                  <div>
                    <span className='mr-1 border border-b border-b-black border-l-transparent border-r-transparent border-t-transparent text-black'>
                      {formatNumberToSocialStyle(product.sold)}
                    </span>
                    <span className='ml-1 text-gray-500'>Đã bán</span>
                  </div>
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
