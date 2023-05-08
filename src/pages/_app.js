import '@/styles/globals.css'
import '@/styles/optionsbar.css'
import '@/styles/timeline.css'
import '@/styles/dailytimeline.css'
import '@/styles/confirmedit.css'
import '@/styles/weeklytimeline.css'
import '@/styles/blockedtimeform.css'
import '@/styles/form.css'
import '@/styles/add-appointment.css'
import { DisplayManagerProvider } from '../context/DisplayManagerProvider'
import { DataProvider } from '@/context/DataProvider'

export default function App({ Component, pageProps }) {
  return (
    <>
      <DataProvider>
        <DisplayManagerProvider>
          <Component {...pageProps} />
        </DisplayManagerProvider>
      </DataProvider >
    </>
  )
}
