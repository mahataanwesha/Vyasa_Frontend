import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('Admin' | 'Doctor' | 'Nurse' | 'Pharmacist' | 'Lab Technician')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    // Session validation on component render
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          background: '#020d20',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
          gap: '12px',
        }}
      >
        <Loader2 size={36} className="animate-spin text-primary" style={{ color: '#4a7cff' }} />
        <span style={{ fontSize: '15px', fontWeight: 600 }}>Securing session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Generalize redirect to setup wizard if profile is not completed
  if (user && !user.profileCompleted) {
    if (user.role === 'Admin') {
      return <Navigate to="/hospital-setup" replace />;
    } else if (user.role === 'Nurse') {
      return <Navigate to="/nurse-setup" replace />;
    } else if (user.role === 'Pharmacist') {
      return <Navigate to="/pharmacy-setup" replace />;
    } else if (user.role === 'Lab Technician') {
      return <Navigate to="/lab-setup" replace />;
    } else {
      return <Navigate to="/doctor-setup" replace />;
    }
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Role not authorized, send to unauthorized redirect/main dashboard
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
