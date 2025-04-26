// Gom thành obj cho tiện dễ xài

import http from '../utils/http'

const URL = 'products'

const productApi = {
  // products
  getProducts: () => {
    return http.get(URL)
  }
}

export default productApi
