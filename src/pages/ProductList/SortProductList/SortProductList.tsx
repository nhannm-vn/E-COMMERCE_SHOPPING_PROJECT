function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3 flex flex-wrap items-center justify-between gap-2'>
      <div className='flex flex-wrap items-center gap-2'>
        <div>Sắp xếp theo</div>
        <button className='h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center'>
          Phổ biến
        </button>
        <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>
          Mới nhất
        </button>
        <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>
          Bán chạy
        </button>
      </div>
    </div>
  )
}

export default SortProductList
