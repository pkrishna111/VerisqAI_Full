import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
