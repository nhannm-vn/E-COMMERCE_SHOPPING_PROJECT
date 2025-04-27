function Pagination() {
  return (
    <div
      className='flex flex-wrap mt-6 border-[3px] border-red-500
      justify-center'
    >
      <Link />
    </div>
  )
}

export default Pagination

// **Flow là khi mình bấm cái Link thì nó sẽ thay đổi cái URL trên đường dẫn
//  từ đó làm cho ông useQuery nhận ra key khác mà sẽ render lại
