import classNames from 'classnames'
import { sortBy } from '../../../constants/product'
import { QueryConfig } from '../ProductList'
import { ProductListConfig } from '../../../types/product.type'
// Cần phải lấy ra 2 thằng này để xài
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

function SortProductList({ queryConfig }: Props) {
  // Lấy sort_by để biết được sắp xếp dựa trên dạng nào. Để biết được button nào cần active
  // nếu sort_by không có trong đó thì mình sẽ lấy giá trị createAt
  const { sort_by } = queryConfig

  // Function check active
  // Exclude là func bên ts giúp bỏ undefined
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => sort_by === sortByValue

  return (
    <div className='flex flex-wrap items-center justify-between gap-2 bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <div>Sắp xếp theo</div>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
          })}
        >
          Phổ biến
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
        >
          Mới nhất
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
          })}
        >
          Bán chạy
        </button>
        <select
          className='h-8 bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100'
          defaultValue=''
        >
          <option value='' disabled>
            Giá
          </option>
          <option value='price:asc'>Giá: thấp đến cao</option>
          <option value='price:desc'>Giá: cao đến thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div>
          <span className='text-orange'>1</span>
          <span>/2</span>
        </div>
        <div className='ml-2'>
          <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
            </svg>
          </button>
          <button className='h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
