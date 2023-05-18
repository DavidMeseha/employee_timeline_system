import './styles/globals.css'
import './styles/optionsbar.css'
import './styles/timeline.css'
import './styles/dailytimeline.css'
import './styles/confirmedit.css'
import './styles/weeklytimeline.css'
import './styles/blockedtimeform.css'
import './styles/form.css'
import './styles/addappointment.css'
import './styles/service-select.css'
import './styles/timepicker.css'
import MainView from './pages/MainView'
import { DataProvider } from './context/DataProvider'
import { DisplayManagerProvider } from './context/DisplayManagerProvider';
import AddAppointment from './pages/AddAppointmentPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <DataProvider>
        <DisplayManagerProvider>
          <Routes>
            <Route path='/' element={<MainView />} />
            <Route path='add-appointment' element={<AddAppointment />} />
            <Route path='add-appointment/:time/:employee/:date' element={<AddAppointment />} />
          </Routes>
        </DisplayManagerProvider>
      </DataProvider >
    </div>
  );
}

export default App;
