import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

const purchaseApi = {
  // Thêm một đơn hàng
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  // Xem thông tin đơn hàng
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
//keeptrying
//
//
