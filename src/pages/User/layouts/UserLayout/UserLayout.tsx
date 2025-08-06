import UserSideNav from '../../components/UserSideNav'

interface Props {
  children?: React.ReactNode
}

// Nghĩa là thằng UserSideNav thì giống nhau hết
//còn từng thằng chức năng thì sẽ truyền vào theo dạng children

export default function UserLayout({ children }: Props) {
  return (
    <div>
      <UserSideNav />
      {children}
    </div>
  )
}
