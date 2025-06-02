import { useQuery } from '@tanstack/react-query'
import purchaseApi from '../../apis/purchase.api'
import { purchasesStatus } from '../../constants/purchase'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'
import { useEffect, useState } from 'react'
import { Purchase } from '../../types/purchase.type'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

function Cart() {
  // Tạo state mở rộng sẽ kế thừa kiểu của purchase và có thêm 2 prop riêng
  const [extendedPurchases, setExetendedPuchases] = useState<ExtendedPurchase[]>([])

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

  // Sau khi goi api xong thi set vao state
  // và set lại khi giá trị của biến thay đổi
  useEffect(() => {
    setExetendedPuchases(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])

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
            {/* Body */}
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase) => (
                <div
                  key={purchase._id}
                  className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                >
                  {/* left */}
                  <div className='col-span-6'>
                    <div className='flex'>
                      {/* check box */}
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          // onChange={}
                        />
                      </div>
                      {/* information product */}
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0 overflow-hidden'
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pb-2 pt-1'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2 text-left'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController //
                          classNameWrapper='flex items-center'
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sticky: nếu đặt ở trong over-flow thì nó sẽ không có hiệu ứng sticky */}
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-orange' />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
            <button className='mx-3 border-none bg-none transition-colors hover:text-orange'>Xóa</button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫138000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫138000</div>
              </div>
            </div>
            <Button className='ml-4 mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua Hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
