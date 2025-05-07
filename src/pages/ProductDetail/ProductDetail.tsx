import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'

function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    // Điền cái id để khi id thay đổi thì dữ liệu sẽ fetch lại
    queryKey: ['product', id],
    // Phải as string vì mình biết id lúc nào cũng có
    queryFn: () => productApi.getProductDetail(id as string)
  })
  // Lấy dữ liệu ra
  const product = productDetailData?.data.data
  return <div>ProductDetail</div>
}

export default ProductDetail
