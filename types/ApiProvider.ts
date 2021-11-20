import {AxiosInstance} from "axios";

export type GetTickets = (page: number, limit?: number) => Promise<Array<any>>

export interface ApiProviderHooks {
  api?: AxiosInstance
  getTickets: GetTickets
}