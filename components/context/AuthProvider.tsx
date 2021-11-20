import React, {createContext, FC, useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import ApiProvider from "./ApiProvider";

interface AuthContextHooks {
  token: string
  ready: boolean
}

const AuthContext = createContext<AuthContextHooks>({ token: "", ready: false })

const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    (async () => {
      const token = await axios.get("/api/auth/token")
      if (token && token.data) {
        setToken(token.data.data)
      }
    })()
  }, [])

  useEffect(() => {
    if (token !== "") {
      setReady(true)
    }
  }, [token])

  const value = useMemo(() => ({
    token,
    ready
  }), [
    token,
    ready
  ])

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider