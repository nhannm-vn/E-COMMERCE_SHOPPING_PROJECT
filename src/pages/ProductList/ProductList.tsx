import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.api'
import useQueryParams from '../../hooks/useQueryParams'
import Pagination from '../../components/Pagination'

function ProductList() {
  // Xài customHook để lấy dữ liệu từ đường dẫn
  const queryParams = useQueryParams()
  // Lấy dữ liệu ra
  const { data } = useQuery({
    // Vì chúng ta có ProductConfig nữa nên cần truyền thêm queryParams nữa
    // khi các key thay đổi thì nó sẽ chạy lại một lần nữa để cho chúng ta có cái data mới
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            {/* chia theo break-point */}
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {/* Vì có thể data là undefind nên cần phải check */}
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
