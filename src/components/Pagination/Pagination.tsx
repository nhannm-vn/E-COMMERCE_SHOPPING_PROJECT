import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
function Pagination({ page, pageSize }: Props) {
  const renderPagination = () => {
    // Biến giúp check render ... một lần duy nhất
    let dotAfter = false
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // Trường hợp dot ở sau page hiển thị các dấu ...
        // _Thứ nhất currentPage <= 5 do business rule sao cho cách 2 đơn vị
        // _Thứ hai những pageNumber render map ra phải cách thằng đang đứng 2 đơn vị
        // _Thứ ba những pageNumber render map ra phải nhỏ hơn thằng cuối 2 đơn vị
        //=> thì sẽ không render ra pageNumber đó mà render ra (button ...) một lần sau đó còn lại thì bỏ qua
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE - 1) {
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
        // Nếu vượt qua được if ở trên thì mới xuống dưới render ra
        return (
          <button
            key={index}
            className={classNames(
              'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border-[2px]', //
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div
      className='flex flex-wrap mt-6 border-[3px] border-red-500
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
