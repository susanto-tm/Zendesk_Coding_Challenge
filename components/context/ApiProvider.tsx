import React, {createContext, FC, useContext, useCallback, useMemo, useReducer, useRef, useState} from "react";
import axios from "axios";
import {useAuth} from "./AuthProvider";
import {ApiProviderHooks, GetTickets} from "../../types/ApiProvider";

const ApiContext = createContext<ApiProviderHooks>({} as ApiProviderHooks)

const ApiProvider: FC = ({ children }) => {
  const { token } = useAuth()
  const [page, setPage] = useState(1)

  const api = useMemo( () => axios.create({
    headers: {
      authorization: `Bearer ${token}`
    }
  }), [token])

  const getTickets: () => Promise<GetTickets> = useCallback(async () => {
    const tickets = await api.get("/tickets")

    const next = async (next_page?: number) => {
      if (next_page) {
        setPage(next_page + 1)
      }
      return await api.get("/tickets", {
        params: {
          page: next_page ?? page
        }
      })
    }

    return [next, tickets.data]
  }, [api, page])

  const value = useMemo(() => ({
    api,
    getTickets
  }), [
    api,
    getTickets
  ])

  return (
    <ApiContext.Provider value={value}>
      { children }
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)
export default ApiProvider