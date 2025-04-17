import { createContext } from "react"

interface AppContextInterface {
  isAuthenticated: boolean,
  setIsAuthenticated: () => void
}

export const AppContext = createContext<AppContextInterface>
