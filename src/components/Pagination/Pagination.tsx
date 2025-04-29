import classNames from 'classnames'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { createSearchParams, Link } from 'react-router-dom'
import path from '../../constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
function Pagination({ queryConfig, pageSize }: Props) {
  // Lấy ra page nhưng phải ép kiểu
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    // Biến giúp check render ... một lần duy nhất
    let dotAfter = false
    let dotBefore = false
    // Tách func: **LƯU Ý CẢ HAI ĐỀU CHỈ CHẠY DUY NHẤT 1 LẦN
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      } else {
        return null
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      } else {
        return null
      }
    }
    // Thực hiện
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // ***Điều kiện để return về ký tự [...]
        // Trường hợp dot ở sau page hiển thị các dấu ...
        // _Thứ nhất page <= 5 do business rule sao cho cách 2 đơn vị
        // _Thứ hai những pageNumber render map ra phải cách thằng đang đứng(page) 2 đơn vị
        // _Thứ ba những pageNumber render map ra phải nhỏ hơn thằng cuối 2 đơn vị
        //=> thì sẽ không render ra pageNumber đó mà render ra (button ...) một lần sau đó còn lại thì bỏ qua
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }
        // Trường hợp có dấu ... ở trước và cả sau page
        // _Thứ nhất page > 5 lúc này sẽ khác hoàn toàn trường hợp 1
        // _Thứ hai page < pageSize - RANGE * 2 nghĩa là page nó chắc chắc không vượt qua 15 thì
        // mới thỏa hiển thị ... khi đứng ở 15 còn đứng 16 thì hiển thị đủ 17 18 19 20 nên không bị ẩn
        else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          // Những thằng nào > 2 và đồng thời phải cách thằng page 2 thì cho ra ... phía trước
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
            // Những thằng nào cách page 2 và cách 20 2 đơn vị thì cho ra ... phía sau
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
          // Những thằng nào thỏa page >= 16 và pageNumber đứng sau 2 thằng đầu tiên và < page - RANGE nghĩa là 2 đơn vị
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        // Nếu vượt qua được if ở trên thì mới xuống dưới render ra. Còn nếu vướng if trên thì ra [...] 1 lần duy nhất rồi dừng
        return (
          <Link
            to={{
              pathname: path.home,
              // Flow là mấy nút sẽ là mấy thằng Link có sẵn đường dẫn là '/'
              //và queryString trên URL sẽ được biến đổi dựa trên thằng createSearchParams
              //riêng chỉ có thằng page là phải override lại chứ nếu lấy luôn từ param trên URL thì
              //nó sẽ bị lấy thằng cũ và bấm không được
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 cursor-pointer rounded border-[1.5px] bg-white px-3 py-2 shadow-sm', //
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPagination()}
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Next</button>
    </div>
  )
}

export default Pagination

// **Flow là khi mình bấm cái Link thì nó sẽ thay đổi cái URL trên đường dẫn
//  từ đó làm cho ông useQuery nhận ra key khác mà sẽ render lại
