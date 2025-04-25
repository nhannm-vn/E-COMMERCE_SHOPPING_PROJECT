import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'

function ProductList() {
  return (
    <div className='border-[2px] border-red-500 bg-gray-200 py-6'>
      <div className='container border-[2px] border-green-600'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
