import axios from 'axios'

export const zendeskAuth = axios.create({
  baseURL: `https://${process.env.ZENDESK_DOMAIN}.zendesk.com/api/v2/oauth`,
  auth: {
    username: `${process.env.CLIENT_EMAIL}/token`,
    password: `${process.env.API_TOKEN}`
  }
})

export const zendeskApi = (bearerToken: string) => axios.create({
  baseURL: `https://${process.env.ZENDESK_DOMAIN}.zendesk.com/api/v2`,
  headers: {
    authorization: bearerToken
  }
})