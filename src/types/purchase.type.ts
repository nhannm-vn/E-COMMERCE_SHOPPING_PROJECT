import { Product } from './product.type'

// Status này nghĩa là  hiển thị trạng thái của
//từng đơn hàng. Nếu như vậy thì không bao gồm số 0 nghĩa là lấy tất cả trạng thái
//nghĩa là dùng cho hiển thị trạng thái

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

// Status này là con số sẽ gửi kèm lên để lấy phân loại đơn hàng nên sẽ
//có các số khác kèm theo số 0 lấy tất cả trạng thái
//nghĩa là dùng cho gửi lên
export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

// ExtendedPurchase là type định nghĩa mở rông thêm riêng biệt cho từng Purchase
export interface ExtendedPurchase extends Purchase {
  // disabled: là thuộc tính giúp cho khi item đang thao tác hoặc gọi api thì sẽ
  //không cho phép tăng số lượng hoặc thao tác trên UI
  disabled: boolean
  // checked: sẽ là thuộc tính thêm vào cho mỗi thằng Purchase điều này sẽ giúp cho
  //biết được thằng item nào đang checked
  checked: boolean
}
