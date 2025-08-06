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
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
