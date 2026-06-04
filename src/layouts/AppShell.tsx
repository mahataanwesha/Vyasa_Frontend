import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import {
  LayoutDashboard,
  Users,
  Activity,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ShieldAlert,
  Calendar,
  Layers,
  HeartPulse,
  UserPlus,
  FileText,
  FlaskConical,
  ClipboardList,
  Globe,
  User
} from 'lucide-react';
import { VyasaLogo } from '../components/Icons';
import { UserProfile } from '../pages/UserProfile';
import { MyPatients } from '../pages/MyPatients';
import { NewPatient } from '../pages/NewPatient';

// Role-based menu configuration
const menus = {
  Admin: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Patients', icon: <Users size={20} /> },
    { label: 'New Patient', icon: <UserPlus size={20} /> },
    { label: 'Triage', icon: <HeartPulse size={20} /> },
    { label: 'Prescriptions', icon: <FileText size={20} /> },
    { label: 'Lab Orders', icon: <FlaskConical size={20} /> },
    { label: 'Alerts', icon: <Bell size={20} /> },
    { label: 'Discharge', icon: <LogOut size={20} /> },
    { label: 'OPD Queue', icon: <ClipboardList size={20} /> },
    { label: 'Dr. Network', icon: <Globe size={20} /> },
    { label: 'Staff Directory', icon: <Users size={20} /> },
    { label: 'System Logs', icon: <Layers size={20} /> },
    { label: 'My Profile', icon: <User size={20} /> },
  ],
  Doctor: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Patients', icon: <Users size={20} /> },
    { label: 'New Patient', icon: <UserPlus size={20} /> },
    { label: 'Triage', icon: <HeartPulse size={20} /> },
    { label: 'Prescriptions', icon: <FileText size={20} /> },
    { label: 'Lab Orders', icon: <FlaskConical size={20} /> },
    { label: 'Alerts', icon: <Bell size={20} /> },
    { label: 'Discharge', icon: <LogOut size={20} /> },
    { label: 'OPD Queue', icon: <ClipboardList size={20} /> },
    { label: 'Dr. Network', icon: <Globe size={20} /> },
    { label: 'My Profile', icon: <User size={20} /> },
  ],
  Nurse: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'New Patient', icon: <UserPlus size={20} /> },
    { label: 'Vitals Entry', icon: <Activity size={20} /> },
    { label: 'Medication MAR', icon: <FileText size={20} /> },
    { label: 'Nursing Notes', icon: <ClipboardList size={20} /> },
    { label: 'Triage', icon: <HeartPulse size={20} /> },
  ],
  Pharmacist: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Prescriptions', icon: <Layers size={20} /> },
  ],
  'Lab Technician': [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Lab Reports', icon: <ShieldAlert size={20} /> },
  ],
};

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out securely.', 'success');
    } catch (err) {
      addToast('Logout error.', 'error');
    }
  };

  const userRole = user?.role || 'Doctor';
  const currentMenu = menus[userRole] || menus.Doctor;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        background: '#f8fafc',
        color: '#0f172a',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* TOPBAR */}
      <header
        style={{
          height: '70px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#334155',
              display: 'none', // Shown on mobile CSS below
            }}
            className="mobile-burger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <VyasaLogo style={{ width: '36px', height: '36px' }} />
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#020d20', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.5px' }}>
              VYASA
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="desktop-search" style={{ position: 'relative', width: '320px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search patient vitals, clinics, staff..."
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '13px',
              outline: 'none',
              fontWeight: 500,
            }}
          />
        </div>

        {/* Topbar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Warning/Alert Button */}
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4d', padding: '4px' }}>
            <ShieldAlert size={20} />
            <span style={{ position: 'absolute', top: '0', right: '0', width: '7px', height: '7px', background: '#ff4d4d', borderRadius: '50%' }}></span>
          </button>

          {/* Bell Notifications Button */}
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#4a7cff', padding: '4px' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '0', right: '0', width: '7px', height: '7px', background: '#4a7cff', borderRadius: '50%' }}></span>
          </button>

          {/* User Profile Card */}
          <div
            onClick={() => setActiveTab('My Profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', cursor: 'pointer' }}
          >
            {/* Avatar with Online Status Indicator */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#e0e7ff',
                  color: '#4a7cff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: '1.5px solid #4a7cff',
                  overflow: 'hidden',
                }}
              >
                {user?.fullName?.charAt(0).toUpperCase() || 'D'}
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '9px',
                  height: '9px',
                  background: '#10b981',
                  borderRadius: '50%',
                  border: '1.5px solid #ffffff',
                }}
              />
            </div>

            {/* Doctor Info */}
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0c1a30', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                {user?.fullName.startsWith('Dr.') ? user.fullName : `Dr. ${user?.fullName || 'Arjun Mehta'}`}
              </p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', margin: 0 }}>
                {user?.role === 'Doctor' ? (user?.doctorProfile?.specialization || 'Cardiology') : user?.role}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE GRID */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* SIDEBAR */}
        <aside
          className={`sidebar-nav ${mobileMenuOpen ? 'open' : ''}`}
          style={{
            width: '260px',
            background: '#ffffff',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 16px',
            zIndex: 90,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ paddingLeft: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Main Operations
              </p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentMenu.map((item) => {
                const isActive = activeTab === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: isActive ? '#f0f4ff' : 'none',
                      color: isActive ? '#4a7cff' : '#64748b',
                      fontSize: '14px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Secure Logout Action */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              background: 'none',
              color: '#f43f5e',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s',
            }}
          >
            <LogOut size={20} />
            <span>Secure Logout</span>
          </button>
        </aside>

        {/* CORE CONTENT */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '30px',
            background: '#f8fafc',
          }}
        >
          {activeTab === 'My Profile' ? (
            <UserProfile />
          ) : activeTab === 'My Patients' ? (
            <MyPatients />
          ) : activeTab === 'New Patient' ? (
            <NewPatient />
          ) : (
            children
          )}
        </main>

        {/* RIGHT PANEL - QUICK INFORMATION AND Shift Telemetry */}
        <aside
          className="right-panel"
          style={{
            width: '280px',
            background: '#ffffff',
            borderLeft: '1px solid #e2e8f0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowY: 'auto',
          }}
        >
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', fontFamily: 'Outfit, sans-serif' }}>
              Shift Telemetry
            </h3>
            
            <div
              style={{
                background: '#f0f4ff',
                borderLeft: '4px solid #4a7cff',
                borderRadius: '8px',
                padding: '14px',
                marginBottom: '10px',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4a7cff', textTransform: 'uppercase', marginBottom: '2px' }}>
                Clinical Facility
              </p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                {user?.hospitalName || 'Individual Clinic Workspace'}
              </p>
            </div>
            
            <div
              style={{
                background: '#ecfdf5',
                borderLeft: '4px solid #10b981',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '2px' }}>
                Status
              </p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                Active & Encrypted
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>
              Shift Calendar
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
                <Calendar size={16} style={{ color: '#4a7cff' }} />
                <div>
                  <p style={{ fontWeight: 700, color: '#0f172a' }}>Daily Handoff Brief</p>
                  <p style={{ color: '#64748b' }}>09:00 AM - 10:00 AM</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
                <Calendar size={16} style={{ color: '#4a7cff' }} />
                <div>
                  <p style={{ fontWeight: 700, color: '#0f172a' }}>Ward Telemetry Audit</p>
                  <p style={{ color: '#64748b' }}>02:30 PM - 03:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className="mobile-bottom-nav"
        style={{
          height: '60px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          display: 'none', // Managed by responsive CSS below
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
        }}
      >
        {currentMenu
          .filter((item) => ['Dashboard', 'My Patients', 'Triage', 'My Profile'].includes(item.label))
          .map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#4a7cff' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                  gap: '4px',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* Embedded Responsive Media Queries Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .right-panel {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .sidebar-nav {
            position: absolute !important;
            top: 70px;
            left: -260px;
            bottom: 0;
            height: calc(100vh - 130px) !important;
            box-shadow: 10px 0 25px rgba(0,0,0,0.05);
          }
          .sidebar-nav.open {
            left: 0 !important;
          }
          .mobile-burger {
            display: block !important;
          }
          .desktop-search {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AppShell;
