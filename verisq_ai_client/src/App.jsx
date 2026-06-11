import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import VerifyPage from './pages/VerifyPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequestReceived from './pages/RequestReceived'
import VendorDetailsPage from './pages/VendorDetailsPage'

import Otp_verification from './pages/Otp_Verification'
import AdminTrialRequests from './pages/AdminTrialRequests'
import QuestionnairePage from './pages/QuestionnairePage'
import QuestionnaireDeclinePage from "./pages/QuestionnaireDeclinePage";
import QuestionnaireDeclinedPage from "./pages/QuestionnaireDeclinedPage";

import Howitworks from './pages/Howitworks'
import Scorecards from './pages/Scorecards '
import Questionnaires from './pages/Questionnaires'
import TemplateBuilderPage from './pages/TemplateBuilderPage'
import TemplateDetailsPage from './pages/TemplateDetailsPage'
import BreachAlerts from './pages/BreachAlerts'
import RiskTiering from './pages/RiskTiering'
import QuestionnaireWelcomePage from "./pages/QuestionnaireWelcomePage";

//Admin Imports
import AdminDashboard from './admin/pages/AdminDashboard'
import Users from './admin/pages/Users'
import Vendors from "./admin/pages/Vendors";
import AiMonitoring from './admin/pages/AiMonitoring'
import AuditLogs from './admin/pages/AuditLogs'




// import AdminLayout from './admin/layouts/AdminLayout'
// import AdminDashboard from './admin/pages/AdminDashboard'
// import UserManagement from './admin/pages/UserManagement'
// import VendorAnalytics from './admin/pages/VendorAnalytics'
// import AiMonitoring from './admin/pages/AiMonitoring'
// import AuditLogs from './admin/pages/AuditLogs'

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
          }
        />

        <Route
          path="/vendor/:id"
          element={
            <ProtectedRoute>
              <VendorDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplateBuilderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates/:id"
          element={
            <ProtectedRoute>
              <TemplateDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/otp_verification" element={<Otp_verification />} />
        <Route path="/request-received" element={<RequestReceived />} />
        <Route path="how-it-works" element={<Howitworks />} />
        <Route path="Scorecard" element={<Scorecards />} />
        <Route path="Questionnaires" element={<Questionnaires />} />
        <Route path="/questionnaire/:token" element={<QuestionnaireWelcomePage />} />
        <Route path="/questionnaire/:token/assessment" element={<QuestionnairePage />} />
        <Route path="/questionnaire/:token/decline" element={<QuestionnaireDeclinePage />} />
        <Route path="/questionnaire/:token/declined" element={<QuestionnaireDeclinedPage />} />
        <Route path="BreachAlerts" element={<BreachAlerts />} />
        <Route path="RiskTiering" element={<RiskTiering />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/ai-monitoring" element={<AiMonitoring />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />

        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="vendors" element={<VendorAnalytics />} />
          <Route path="ai-monitoring" element={<AiMonitoring />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App