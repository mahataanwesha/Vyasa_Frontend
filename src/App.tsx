import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DoctorSetupWizard } from './pages/DoctorSetupWizard';
import { AdminSetupWizard } from './pages/AdminSetupWizard';
import { NurseSetupWizard } from './pages/NurseSetupWizard';
import { PharmacistSetupWizard } from './pages/PharmacistSetupWizard';
import { LabTechnicianSetupWizard } from './pages/LabTechnicianSetupWizard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppShell } from './layouts/AppShell';
import { ToastContainer } from './components/Toast/ToastContainer';
import { SOSOverlay } from './components/SOSOverlay';

export const App: React.FC = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Validate session on app initialization
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      {/* Reusable slide-in notifications visible across all views */}
      <ToastContainer />
      <SOSOverlay />

      <Routes>
        {/* Public Authentication Screen (Figma Selection Cards + forms) */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Onboarding Wizard for Doctors (Matches Figma panels) */}
        <Route
          path="/doctor-setup"
          element={isAuthenticated ? <DoctorSetupWizard /> : <Navigate to="/login" replace />}
        />

        {/* Onboarding Wizard for Nurses (Matches Figma panels) */}
        <Route
          path="/nurse-setup"
          element={isAuthenticated ? <NurseSetupWizard /> : <Navigate to="/login" replace />}
        />

        {/* Onboarding Wizard for Pharmacists (Matches Figma panels) */}
        <Route
          path="/pharmacy-setup"
          element={isAuthenticated ? <PharmacistSetupWizard /> : <Navigate to="/login" replace />}
        />

        {/* Onboarding Wizard for Lab Technicians (Matches Figma panels) */}
        <Route
          path="/lab-setup"
          element={isAuthenticated ? <LabTechnicianSetupWizard /> : <Navigate to="/login" replace />}
        />

        {/* Onboarding Wizard for Hospitals (Matches Figma panels) */}
        <Route
          path="/hospital-setup"
          element={isAuthenticated ? <AdminSetupWizard /> : <Navigate to="/login" replace />}
        />

        {/* Protected NurseLink App Shell Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />

        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
