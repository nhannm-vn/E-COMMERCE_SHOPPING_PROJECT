import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

// Định nghĩa context lưu dữ liệu kiểu gì
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

// initialState giúp coi ban đầu sẽ lưu gì
const initialAppContext: AppContextInterface = {
  // Nếu lấy ra được access_token thì sẽ là true, còn là '' thì ép kiểu về false
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

// <AppContextInterface>: nó quản lí kiểu dữ liệu là gì
// initialAppContext: chúng ta dùng createContext thì bắt buộc truyền giá trị khởi tạo này
// khi chúng ta không truyền vào Provider giá trị nào thì nó sẽ xài
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

  // Nếu không có value thì nó sẽ lấy inititalAppContext
  return (
    <AppContext.Provider
      value={{
        isAuthenticated, //
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
