import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import VerifyPage from './pages/VerifyPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequestReceived from './pages/RequestReceived'

import Otp_verification from './pages/Otp_Verification'
import AdminTrialRequests from './pages/AdminTrialRequests'
import QuestionnairePage from './pages/QuestionnairePage'

import Howitworks from './pages/Howitworks'
import Scorecards from './pages/Scorecards '
import Questionnaires from './pages/Questionnaires'




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
        <Route path="/otp_verification" element={<Otp_verification />} />
        <Route path="/request-received" element={<RequestReceived />} />
        <Route path="how-it-works" element={<Howitworks />} />
        <Route path="Scorecard" element={<Scorecards />} />
        <Route path="Questionnaires" element={<Questionnaires />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        <Route path="/questionnaire/:token" element={<QuestionnairePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
