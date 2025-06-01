import { useQuery } from '@tanstack/react-query'
import purchaseApi from '../../apis/purchase.api'
import { purchasesStatus } from '../../constants/purchase'

function Cart() {
  // Gọi api purchase list
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    // Khi chưa có login vào thì đừng gọi api của purchase
    // **bên này thì không cần do biết là nếu chưa login thì
    // sẽ không vào được bên trang này
    // enabled: isAuthenticated
  })

  // Móc data ra
  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {/* Khi thu nhỏ thì cho một thanh nằm ngang */}
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {/* Header */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
