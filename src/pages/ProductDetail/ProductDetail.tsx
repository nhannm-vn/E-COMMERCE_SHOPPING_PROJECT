import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'

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
                </div>
              </div>
              <div className='border-black-500 col-span-7 border-[1px]'></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
