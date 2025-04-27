interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    return null
  }
  return (
    <div
      className='flex flex-wrap mt-6 border-[3px] border-red-500
      justify-center'
    >
      <button
        className='bg-white rounded px-3 py-2 shadow-sm mx-2
      cursor-pointer'
      >
        Prev
      </button>
      {renderPagination()}
      <button
        className='bg-white rounded px-3 py-2 shadow-sm mx-2
      cursor-pointer'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

// **Flow là khi mình bấm cái Link thì nó sẽ thay đổi cái URL trên đường dẫn
//  từ đó làm cho ông useQuery nhận ra key khác mà sẽ render lại
