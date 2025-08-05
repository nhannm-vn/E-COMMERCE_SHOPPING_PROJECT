import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  // Khi chúng ta lắng nghe một sự kiện thì phải để nó trong useEffect
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
