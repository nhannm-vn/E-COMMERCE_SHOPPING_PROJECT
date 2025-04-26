// Gom thành obj cho tiện dễ xài

import { ProductListConfig } from '../types/product.type'
import http from '../utils/http'

const URL = 'products'

const productApi = {
  // products
  getProducts: (params: ProductListConfig) => {
    return http.get(URL, {
      params
    })
  }
}

export default productApi
