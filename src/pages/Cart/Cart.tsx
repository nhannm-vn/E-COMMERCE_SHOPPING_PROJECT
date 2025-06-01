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

  const purchasesInCart = purchasesInCartData?.data.data

  return <div>Cart</div>
}

export default Cart
