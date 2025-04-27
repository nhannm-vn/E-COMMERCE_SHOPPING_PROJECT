import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    // Biến giúp check render ... một lần duy nhất
    let dotAfter = false
    let dotBefore = false
    // Tách func: **LƯU Ý CẢ HAI ĐỀU CHỈ CHẠY DUY NHẤT 1 LẦN
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      } else {
        return null
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
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
          // Những thằng nào > 2 và đồng thời phải cách thằng page 2 thì cho ra ...
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
            // Những thằng nào cách page 2 và cách 20 2 đơn vị thì cho ra ...
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        }
        // Nếu vượt qua được if ở trên thì mới xuống dưới render ra
        return (
          <button
            key={index}
            className={classNames(
              'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border-[1.5px]', //
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
            onClick={() => {
              setPage(pageNumber)
            }}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div
      className='flex flex-wrap mt-6
      justify-center'
    >
      <button
        className='bg-white rounded px-3 py-2 shadow-sm mx-2
      cursor-pointer border'
      >
        Prev
      </button>
      {renderPagination()}
      <button
        className='bg-white rounded px-3 py-2 shadow-sm mx-2
      cursor-pointer border'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

// **Flow là khi mình bấm cái Link thì nó sẽ thay đổi cái URL trên đường dẫn
//  từ đó làm cho ông useQuery nhận ra key khác mà sẽ render lại
