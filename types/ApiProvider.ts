import {AxiosInstance} from "axios";

export type GetTickets = [(next_page?: number) => void, Array<any>]

export interface ApiProviderHooks {
  api: AxiosInstance
  getTickets(): Promise<GetTickets>
}