import React, {createContext, FC, useCallback, useContext, useMemo, useState} from "react";
import axios from "axios";
import {useAuth} from "./AuthProvider";
import {ApiProviderHooks, GetTickets} from "../../types/ApiProvider";

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

  const getTickets: GetTickets = useCallback(async (page: number, limit?: number) => {
    let per_page = limit ?? 15

    if (api) {
      return (await api.get("/tickets", {
        params: {
          page,
          per_page
        }
      })).data.data
    }
  }, [api])

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