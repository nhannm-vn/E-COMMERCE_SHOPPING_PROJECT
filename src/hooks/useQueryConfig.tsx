import { omitBy, isUndefined } from 'lodash'
import { ProductListConfig } from '../types/product.type'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function useQueryConfig() {
  // Xài customHook để lấy dữ liệu từ đường dẫn
  const queryParams: QueryConfig = useQueryParams()
  // Tạo biến filter ra từ params
  // **Nghĩa là trên đường dẫn không phải cứ lấy hết từ đường dẫn mà chỉ lấy những cái cần thiết
  // theo đúng business rule thôi tránh người dừng nhập thêm bậy vào url
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1', // số 1 hoặc '1' thì queryFn vẫn lấy data được
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
    // Kết hợp omitBy và isUndefined để loại bỏ những thằng nào bị undefined
  )
  return queryConfig
}

export default useQueryConfig
