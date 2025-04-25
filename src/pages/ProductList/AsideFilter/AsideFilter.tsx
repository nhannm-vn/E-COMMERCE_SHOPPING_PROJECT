import { Link } from 'react-router-dom'
import path from '../../../constants/path'

function AsideFilter() {
  return (
    <div className='py-4 border-[2px] border-purple-900'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất Cả Danh Mục
      </Link>
    </div>
  )
}

export default AsideFilter
