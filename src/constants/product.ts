// Điều này giúp hạn chế gõ sai
// mấy cái string để tránh gõ nhầm thì khai báo cái obj rồi lấy cái obj chấm ra thôi

export const sortBy = {
  createAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const

// **Trick as const sẽ giúp chúng ta không ghì đè obj được nữa từ đó giúp cho nó chặt chẽ hơn
