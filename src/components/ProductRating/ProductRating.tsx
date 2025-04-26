function ProductRating({ rating }: { rating: number }) {
  // handleWidth
  const handleWidth = (order: number) => {
    // order 4 rating 4 | order 3 rating 4
    if (order <= rating) {
      return '100%'
    }
    // order 5 rating 4.2 => 4 sao và 20%
    if (order > rating && order - rating < 1) {
      // Lấy số thập phân
      return (rating - Math.floor(rating)) * 100 + '%'
    }
    // order 5 rating 3.2 => ngôi sao thứ 5 là 0%, ngôi sao thứ 4 là 20%, ngôi sao thứ 3 là 100%
    return '0%'
  }

  return (
    <div className='flex items-center'>
      {/* Cái hay là sẽ cho 1 thằng 50% và một 1 thằng 100% dùng absolute để nó đứng trên nhau*/}
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='w-3 h-3 fill-yellow-300 text-yellow-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className='w-3 h-3 fill-current text-gray-300'
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}

export default ProductRating
