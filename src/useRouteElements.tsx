import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'

import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'

// custom một cái hook chuyên dùng để chia route
// có hai cách chia phổ biến là routes và dùng hook này

// Route dùng handle. Func này giúp thằng user nào đã login thì cho nó vào tiếp
// còn chưa thì bắt nó về lại trang login
function ProtectedRoute() {
  const isAuthenticated = true
  // Nghĩa là login rồi thì cho vào
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// Ngược lại với thằng ở trên. Nghĩa là khi người dùng vào lại trang login rồi thì
// không cho quay về trang login hoac register nữa
function RejectedRoute() {
  const isAuthenticated = false
  // Nghĩa là chưa login thì cho đi vào page login. Nếu login rồi thì phải quay lại list sp
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
