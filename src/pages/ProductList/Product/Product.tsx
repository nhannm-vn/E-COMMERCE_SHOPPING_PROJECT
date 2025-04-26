import { Link } from 'react-router-dom'

// Ở mỗi item thì sẽ là một thẻ link khác nhau
// duration-100 Xác định thời gian chuyển đổi đó là 100ms.
// Phải đi kèm với transition để hoạt động.
function Product() {
  return (
    <Link to='/'>
      <div
        className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100
        transition-transform overflow-hidden'
      >
        {/* Mẹo pt-[100%] và cho position img để tấm hình thành hình vuông*/}
        <div className='w-full pt-[100%] relative'>
          <img
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m601pzsbaw1k32_tn.webp'
            alt=''
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
              <span>5.000</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-sm'>₫</span>
              <span>2.000</span>
            </div>
          </div>
          {/* Rating star */}
          <div className='mt-3 flex items-center justify-start'>
            <div className='flex items-center'>
              {/* Một ngôi sao */}
              {/* Cái hay là sẽ cho 1 thằng 50% và một 1 thằng 100% dùng absolute để nó đứng trên nhau*/}
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3 h-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='w-3 h-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='w-3 h-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            {/* Đã bán */}
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-1'>2.5k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
