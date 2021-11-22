import React, {createContext, FC, useCallback, useContext, useMemo} from "react";
import axios from "axios";
import {useAuth} from "./AuthProvider";
import {ApiProviderHooks, GetCounts, GetTickets} from "../../types/ApiProvider";

const ApiContext = createContext<ApiProviderHooks>({} as ApiProviderHooks)

const ApiProvider: FC = ({ children }) => {
  const { token, ready } = useAuth()

  const api = useMemo( () => {
    if (ready) {
      return axios.create({
        baseURL: `/api`,
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
  }, [token, ready])

  const getTickets: GetTickets = useCallback(async (page: number, queryLimit?: number) => {
    let limit = queryLimit ?? 25

    if (api) {
      return (await api.get("/tickets", {
        params: {
          page,
          limit
        }
      })).data.data
    }
  }, [api])

  const getCounts: GetCounts = useCallback(async () => {
    if (api) {
      const all = await api.get("/tickets/count")
      const open = await api.get("/tickets/count", {
        params: {
          status: "open"
        }
      })
      const pending = await api.get("/tickets/count", {
        params: {
          status: "pending"
        }
      })
      const closed = await api.get("/tickets/count", {
        params: {
          status: "closed"
        }
      })

      return {
        all: all.data.data,
        open: open.data.data,
        pending: pending.data.data,
        closed: closed.data.data
      }
    } else {
      return {
        all: 0,
        open: 0,
        pending: 0,
        closed: 0
      }
    }
  }, [api])

  const getTicket = useCallback( async (id: number) => {
    if (api) {
      return (await api.get(`/tickets/${id}`)).data
    }
  }, [api])

  const value = useMemo(() => ({
    api,
    getTickets,
    getCounts,
    getTicket
  }), [
    api,
    getTickets,
    getCounts,
    getTicket
  ])

  return (
    <ApiContext.Provider value={value}>
      { children }
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)
export default ApiProvider