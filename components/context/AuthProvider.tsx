import React, {createContext, FC, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import ApiProvider from "./ApiProvider";

interface AuthContextHooks {
  token: string
}

const AuthContext = createContext<AuthContextHooks>({ token: "" })

const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState("")

  useEffect(() => {
    (async () => {
      const token = await axios.get("/api/auth/token")
      if (token && token.data) {
        setToken(token.data)
      }
    })()
  }, [])

  const value = useMemo(() => ({
    token
  }), [
    token
  ])

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider