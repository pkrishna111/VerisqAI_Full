import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import VerifyPage from './pages/VerifyPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequestReceived from './pages/RequestReceived'
import Otp_verification from './pages/Otp_Verification'
import AdminTrialRequests from './pages/AdminTrialRequests'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/request-received" element={<RequestReceived />} />
        <Route path="/send-code" element={<Otp_verification />} />
        <Route path="/admin/trial-requests" element={<AdminTrialRequests />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
