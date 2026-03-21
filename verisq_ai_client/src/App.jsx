import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import VerifyPage from './pages/VerifyPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { BrowserRouter,Route,Routes } from 'react-router-dom'


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/verify" element={<VerifyPage />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
