import { createSearchParams, Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { purchasesStatus } from '../../../../constants/purchase'
import classNames from 'classnames'
import useQueryParams from '../../../../hooks/useQueryParams'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  // Lấy param từ hook đã custom sẵn
  const queryParams: { status?: string } = useQueryParams()
  // Mình sẽ có thêm purchasesStatus.all để mặc định khi chưa bấm cái gì sẽ là all
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
    </div>
  )
}
