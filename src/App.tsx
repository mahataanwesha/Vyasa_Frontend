import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useClinicalStore } from './store/useClinicalStore';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DoctorSetupWizard } from './pages/DoctorSetupWizard';
import { AdminSetupWizard } from './pages/AdminSetupWizard';
import { NurseSetupWizard } from './pages/NurseSetupWizard';
import { PharmacistSetupWizard } from './pages/PharmacistSetupWizard';
import { LabTechnicianSetupWizard } from './pages/LabTechnicianSetupWizard';
import { ReceptionistSetupWizard } from './pages/ReceptionistSetupWizard';
import { InviteRouter } from './pages/InviteRouter';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppShell } from './layouts/AppShell';
import { ToastContainer } from './components/Toast/ToastContainer';
import { SOSOverlay } from './components/SOSOverlay';

export const App: React.FC = () => {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Validate session on app initialization
    checkAuth();

    // Listen for cross-tab local storage changes for staff requests
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'vyasa_pending_requests') {
        const { syncStaffRequests } = useClinicalStore.getState();
        syncStaffRequests();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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

        {/* Invite Link Handler */}
        <Route path="/invite/:role" element={<InviteRouter />} />

        {/* Onboarding Wizard for Doctors (Matches Figma panels) */}
        <Route
          path="/doctor-setup"
          element={<DoctorSetupWizard />}
        />

        {/* Onboarding Wizard for Nurses (Matches Figma panels) */}
        <Route
          path="/nurse-setup"
          element={<NurseSetupWizard />}
        />

        {/* Onboarding Wizard for Pharmacists (Matches Figma panels) */}
        <Route
          path="/pharmacy-setup"
          element={<PharmacistSetupWizard />}
        />

        {/* Onboarding Wizard for Lab Technicians (Matches Figma panels) */}
        <Route
          path="/lab-setup"
          element={<LabTechnicianSetupWizard />}
        />

        {/* Onboarding Wizard for Receptionists */}
        <Route
          path="/receptionist-setup"
          element={<ReceptionistSetupWizard />}
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
