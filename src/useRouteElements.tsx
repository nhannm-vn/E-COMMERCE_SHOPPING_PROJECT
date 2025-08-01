import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'

import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'

// custom một cái hook chuyên dùng để chia route
// có hai cách chia phổ biến là routes và dùng hook này

// Route dùng handle. Func này giúp thằng user nào đã login thì cho nó vào tiếp
// còn chưa thì bắt nó về lại trang login
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nghĩa là login rồi thì cho vào
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// Ngược lại với thằng ở trên. Nghĩa là đã login rồi thì khi người dùng vào trang login rồi thì
// không cho quay về trang login hoac register nữa
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nghĩa là chưa login mà muốn quay lại thì cho đi vào page login. Nếu login rồi thì phải quay lại list sp
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      // Mặc định sẽ có thể coi được trang sản phẩm
      // xác thực hay chưa đều có thể đứng ở đây
      path: path.home,
      // Thằng này giúp ưu tiên lúc nào vào cũng là nó
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      // Nếu xác thực rồi và match vs /profile thì cho vào tiếp
      // không thì back ra /login
      // path: '' = không đổi đường link, chỉ chèn thêm logic bảo vệ.
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          // Match đường dẫn mới render ra element ở dưới
          // Nghĩa là nếu mà thỏa element trên và có muốn vào tiếp nữa mà đường dẫn matches path thì
          // sẽ đi render ra được Profile luôn. Còn không thì phải về lại login
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        // Khi login vao roi thi moi cho vao trang cart
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      // Nếu chưa xác thực thì mới cho vào /login hoặc /register
      // còn nếu xác thực rồi thì không cho vào. Cho vào luôn trang sp
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
