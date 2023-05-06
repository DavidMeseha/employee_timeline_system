import '@/styles/globals.css'
import '@/styles/optionsbar.css'
import '@/styles/timeline.css'
import '@/styles/dailytimeline.css'
import '@/styles/confirmedit.css'
import '@/styles/weeklytimeline.css'
import { DisplayManagerProvider } from '../context/DisplayManagerProvider'
import { EmployeesProvider } from '@/context/EmployeesProvider'

export default function App({ Component, pageProps }) {
  return (
    <>
      <EmployeesProvider>
        <DisplayManagerProvider>
          <Component {...pageProps} />
        </DisplayManagerProvider>
      </EmployeesProvider >
    </>
  )
}
