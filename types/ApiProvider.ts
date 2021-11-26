import {AxiosInstance} from "axios";

export type Counts = { all: number, open: number, pending: number, closed: number }
export type GetTickets = (page: number, limit?: number) => Promise<Array<any>>
export type GetCounts = () => Promise<Counts>
export type GetTicket = (id: number) => Promise<any>

export interface User {
  name: string
  email: string
  created: Date
  photo?: string
  id: string
}

export interface ApiProviderHooks {
  api?: AxiosInstance
  getTickets: GetTickets
  getCounts: GetCounts
  getTicket: GetTicket
}