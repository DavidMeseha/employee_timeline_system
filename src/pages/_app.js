import '@/styles/globals.css'
import '@/styles/optionsbar.css'
import { DisplayManagerProvider } from '@/context/DisplayManagerProvider'

export default function App({ Component, pageProps }) {
  return (
    <DisplayManagerProvider>
      <Component {...pageProps} />
    </DisplayManagerProvider>
  )
}
