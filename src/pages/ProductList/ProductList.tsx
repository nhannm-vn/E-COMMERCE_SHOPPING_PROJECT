import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import { omitBy, isUndefined } from 'lodash'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.api'
import useQueryParams from '../../hooks/useQueryParams'
import Pagination from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductList() {
  // Xài customHook để lấy dữ liệu từ đường dẫn
  const queryParams: QueryConfig = useQueryParams()
  // Tạo biến filter ra từ params
  // **Nghĩa là trên đường dẫn không phải cứ lấy hết từ đường dẫn mà chỉ lấy những cái cần thiết
  // theo đúng business rule thôi tránh người dừng nhập thêm bậy vào url
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1', // số 1 hoặc '1' thì queryFn vẫn lấy data được
      limit: queryParams.limit || 3,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
    // Kết hợp omitBy và isUndefined để loại bỏ những thằng nào bị undefined
  )

  // Lấy dữ liệu ra
  const { data } = useQuery({
    // Vì chúng ta có ProductConfig nữa nên cần truyền thêm queryParams nữa
    // khi các key thay đổi thì nó sẽ chạy lại một lần nữa để cho chúng ta có cái data mới
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    // Giữ lại dữ liệu cũ đợi tới có dữ liệu mới thì thay đổi tránh bị giật
    placeholderData: keepPreviousData
  })
  console.log(data)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {/* Vì có thể data là undefind nên cần phải check */}
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              {/* chia theo break-point */}
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
