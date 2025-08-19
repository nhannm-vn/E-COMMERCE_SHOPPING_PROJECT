import { createSearchParams, Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { purchasesStatus } from '../../../../constants/purchase'
import classNames from 'classnames'
import useQueryParams from '../../../../hooks/useQueryParams'

export default function HistoryPurchase() {
  //Lấy param từ hook đã custom sẵn
  const queryParams: {status?: string} = useQueryParams()
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: String(purchasesStatus.all)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange'
          })}
        >
          Tất cả
        </Link>
      </div>
    </div>
  )
}
