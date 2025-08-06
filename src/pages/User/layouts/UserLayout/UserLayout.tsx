import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

// interface Props {
//   children?: React.ReactNode
// }

// _Nghĩa là thằng UserSideNav thì giống nhau hết
//còn từng thằng chức năng thì sẽ truyền vào theo dạng children

// _Khi xài nested route + element rồi thì phải dùng <outlet/>
// ==> nghĩa là thằng outlet sẽ giúp đưa cái page đó tới luôn chứ không cần chidren

export default function UserLayout() {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
