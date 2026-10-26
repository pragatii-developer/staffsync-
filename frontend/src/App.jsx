import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutShell from './components/LayoutShell';
import ProtectedRoute from './components/ProtectedRoute';

// 7. Optimization: Code-Splitting & Lazy Loading for all UI Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginRegisterPage = lazy(() => import('./pages/LoginRegisterPage'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'));
const HRDashboard = lazy(() => import('./pages/HRDashboard'));
const AttendancePage = lazy(() => import('./pages/AttendancePage'));
const LeaveManagementPage = lazy(() => import('./pages/LeaveManagementPage'));
const AnnouncementsPage = lazy(() => import('./pages/AnnouncementsPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const EmployeeProfilePage = lazy(() => import('./pages/EmployeeProfilePage'));

const App = () => {
  return (
    <Router>
      <LayoutShell>
        <Suspense fallback={<div className="p-5 text-center fw-bold">Loading StaffSync Module...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
            <Route path="/manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
            <Route path="/hr-dashboard" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
            <Route path="/leaves" element={<ProtectedRoute><LeaveManagementPage /></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
            <Route path="/trainings" element={<ProtectedRoute><TrainingPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><EmployeeProfilePage /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </LayoutShell>
    </Router>
  );
};

export default App;
