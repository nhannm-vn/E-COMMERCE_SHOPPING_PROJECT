// Gom thành obj cho tiện dễ xài

import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'products'

const productApi = {
  // products
  getProducts: (params: ProductListConfig) => {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  // product
  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
