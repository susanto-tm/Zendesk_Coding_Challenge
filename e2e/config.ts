import { PlaywrightTestConfig } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config({
  path: ".env.local"
})

const config: PlaywrightTestConfig = {
  use: {
    baseURL: `${process.env.NAMESPACE}:${process.env.PORT}`
  }
}

export default config