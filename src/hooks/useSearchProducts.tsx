// Mình cần gì để import vào thì custom hook này sẽ return ra cái đó

import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { schema, Schema } from '../utils/rules'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '../constants/path'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  // Mục đích láy được param bên này để filter dữ liệu giữ lại các param cũ
  const queryConfig = useQueryConfig()

  // Gọi thằng này để lấy handleSubmit, và xử lí form
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  // Thằng này giúp chuyển trang
  const navigate = useNavigate()

  // Sự kiện filter bằng thanh search, mình sẽ thay đổi các param trên URL để api nó fetch lại dữ liệu mới
  const onSubmitSearch = handleSubmit((data) => {
    // Nghĩa là nếu có order thì sort_by sẽ là sort_by: price lúc đó mình sẽ xóa sạch và cho về mặc định
    //còn nếu không có order thì có nghĩa là sort_by mà là cái khác lúc đó giữ nguyên không cần xóa gì hết
    //và yên tâm rằng bên SortProductList mình đã handle nếu như sort_by: khác price thì sẽ có omit liền order
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
