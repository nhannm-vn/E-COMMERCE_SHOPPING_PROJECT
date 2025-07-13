import { useMutation, useQuery } from '@tanstack/react-query'
import purchaseApi from '../../apis/purchase.api'
import { purchasesStatus } from '../../constants/purchase'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'
import { useEffect, useState } from 'react'
import { Purchase } from '../../types/purchase.type'
import { produce } from 'immer'
import { keyBy } from 'lodash'

// ExtendedPurchase là type định nghĩa mở rông thêm riêng biệt cho từng Purchase
interface ExtendedPurchase extends Purchase {
  // disabled: là thuộc tính giúp cho khi item đang thao tác hoặc gọi api thì sẽ
  //không cho phép tăng số lượng hoặc thao tác trên UI
  disabled: boolean
  // checked: sẽ là thuộc tính thêm vào cho mỗi thằng Purchase điều này sẽ giúp cho
  //biết được thằng item nào đang checked
  checked: boolean
}

function Cart() {
  // Tạo state mở rộng nó chứa danh sách các ExtendedPurchase chứa thêm hai thuộc tính
  //mở rộng: checked, disable
  const [extendedPurchases, setExetendedPuchases] = useState<ExtendedPurchase[]>([])

  // Gọi api purchase list
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    // Khi chưa có login vào thì đừng gọi api của purchase
    // **bên này thì không cần do biết là nếu chưa login thì
    // sẽ không vào được bên trang này
    // enabled: isAuthenticated
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    // Sau khi cập nhật thành công thì chúng ta phải gọi lại getList để nó cập nhật lại
    //nghĩa là cho thằng disable thành false lại nếu không thì nó sẽ không bấm được
    onSuccess: () => {
      refetch()
    }
  })

  // Móc data ra
  const purchasesInCart = purchasesInCartData?.data.data

  // Bien de biet khi nào chọn tất cả
  //==> nó chọn tất cả khi mỗi thằng trong extendedPurchases nó phải checked = true
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)

  // Vừa vào trang Cart sau khi useQuery nó gọi api xong thì mình sẽ set giá trị vào state
  // Dựa vào dữ liệu đã có từ useQuery mình sẽ tiến hành mapping từng item cho có thêm 2 thuộc
  //tính và sau đó set vào state mở rộng
  useEffect(() => {
    setExetendedPuchases(
      (prev) => {
        //*Biến các prev thành các object có _id làm key các props còn lại là value
        const extendedPurchasesObject = keyBy(prev, '_id')
        // console.log(extendedPurchasesObject)
        return (
          purchasesInCart?.map((purchase) => ({
            ...purchase,
            disabled: false,
            //*Tìm được chính xác thằng nào có checked thì giữa nguyên cho nó
            //sau khi reset disable thì checked vẫn giữ nguyên
            checked: Boolean(extendedPurchasesObject[purchase._id]?.checked)
          })) || []
        )
      }
      // Trong trường hợp mà purchasesInCart không có data thì mình sẽ lấy cái [] cho nó
    )
  }, [purchasesInCart])

  // Func này sẽ nhận vào index để biết được thằng item nào đang checked để mà xử lí
  //khi người dùng tick vào nó
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // **Cách đơn giản để set lại cho 1 thằng item mà không cần phải dùng map cho phức tạp
    //nghĩa là không cần check qua từng thằng là dùng produce của immer
    setExetendedPuchases(
      produce((draft) => {
        //draft: đại diện cho exetendedPuchases nghĩa là giá trị previos
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  // Thuật toán nghĩa là khi check cái nút tất cả thì sẽ cho mỗi item ngược lại với thằng isAllCheck
  //vì sau khi như vậy thì thằng isAllCheck cũng tự động được fix dựa trên tất cả các item
  //nghĩa là từng cái purchase nó set lại checked sau đó mới set lại cho biến isAllCheck
  const handleCheckAll = () => {
    setExetendedPuchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number) => {
    // Đầu tiên lấy ra được thằng purchase ở vị trí purchaseIndex trước
    const purchase = extendedPurchases[purchaseIndex]
    // **Cách đơn giản để set lại cho 1 thằng item mà không cần phải dùng map cho phức tạp
    //nghĩa là không cần check qua từng thằng là dùng produce của immer
    setExetendedPuchases(
      produce((draft) => {
        //*Khi mà mình bắt đầu gọi api change cái purchase thì mình phải disable cái thằng input không
        //cho người dùng tăng nữa. Sau khi gọi xong thì mình sẽ mở nó ra
        draft[purchaseIndex].disabled = true
      })
    )
    updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
  }

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
                    {/* input checked tất cả */}
                    <input
                      type='checkbox' //
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
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
              {extendedPurchases?.map((purchase, index) => (
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
                          onChange={handleCheck(index)}
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
                          onIncrease={(value) => handleQuantity(index, value)}
                          onDecrease={(value) => handleQuantity(index, value)}
                          //**Thuộc tính này mình thêm vào để mục đích nó disable trên UI không cho chỉnh sửa khi đang
                          //fetch api. Nghĩa là thằng nào đang fetch thì sẽ có thuộc tính đó để disable
                          disabled={purchase.disabled}
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
              <input
                type='checkbox' //
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length})
            </button>
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
