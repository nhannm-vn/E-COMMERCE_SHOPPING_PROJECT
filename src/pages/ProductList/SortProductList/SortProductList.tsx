import classNames from 'classnames'
import { sortBy, order as orderConstant } from '../../../constants/product'
import { QueryConfig } from '../ProductList'
import { ProductListConfig } from '../../../types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import { omit } from 'lodash'
// Cần phải lấy ra 2 thằng này để xài
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

function SortProductList({ queryConfig, pageSize }: Props) {
  // Lấy page ra
  const page = Number(queryConfig.page)

  // Lấy sort_by để biết được sắp xếp dựa trên dạng nào. Để biết được button nào cần active
  // nếu sort_by không có trong đó thì mình sẽ lấy giá trị createAt
  const { sort_by = sortBy.createdAt, order } = queryConfig

  // Thằng này giúp chuyển trang
  const navigate = useNavigate()

  // Function check active
  // Exclude là func bên ts giúp bỏ undefined
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => sort_by === sortByValue

  // Hàm giúp thay đổi đường dẫn sort
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        // Giúp cho đang ở price nhảy qua thằng khác nội dung không bị thay đổi
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        // **Lưu ý đối với thằng này chỉ hoạt động khi sort_by là price
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='flex flex-wrap items-center justify-between gap-2 bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <div>Sắp xếp theo</div>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ biến
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới nhất
        </button>
        <button
          className={classNames('h-8 px-4 text-center text-sm capitalize', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán chạy
        </button>
        <select
          className={classNames('h-8 px-4 text-left text-sm capitalize outline-none', {
            'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option className='bg-white text-black' value='' disabled>
            Giá
          </option>
          <option className='bg-white text-black' value={orderConstant.asc}>
            Giá: thấp đến cao
          </option>
          <option className='bg-white text-black' value={orderConstant.desc}>
            Giá: cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center'>
        <div>
          <span className='text-orange'>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='ml-2'>
          {page === 1 ? (
            <span className='justify-content-center flex h-8 w-9 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='justify-content-center flex h-8 w-9 items-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-100'
            >
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
            </Link>
          )}

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
