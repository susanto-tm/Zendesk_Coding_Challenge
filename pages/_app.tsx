import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApiProvider, AuthProvider} from "components/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApiProvider>
        <Component {...pageProps} />
      </ApiProvider>
    </AuthProvider>
  )
}

export default MyApp
