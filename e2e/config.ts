import { PlaywrightTestConfig } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config({
  path: ".env.local"
})

const config: PlaywrightTestConfig = {
  use: {
    baseURL: String(process.env.NAMESPACE) ?? "http://localhost:3000"
  }
}

export default config