import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';

export const AdminSetupWizard: React.FC = () => {
  const { user, completeHospitalOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // State matching Admin Institutional Owner form fields
  const [adminName, setAdminName] = useState(user?.fullName || '');
  const [adminAge, setAdminAge] = useState('');
  const [adminGender, setAdminGender] = useState('');
  const [adminDob, setAdminDob] = useState('');
  const [adminPhone, setAdminPhone] = useState(user?.phone || '');
  const [adminEmail, setAdminEmail] = useState(user?.email || '');
  const [adminAddress, setAdminAddress] = useState('');
  const [adminDept, setAdminDept] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('');

  const handleCompleteSetup = async () => {
    if (!adminName || !adminPhone) {
      addToast('Please enter admin name and phone number.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        institutionName: user?.hospitalName || 'Associated Hospital',
        adminName,
        age: adminAge,
        gender: adminGender,
        dob: adminDob,
        phone: adminPhone,
        email: adminEmail,
        address: adminAddress,
        department: adminDept,
        designation: adminDesignation,
      };

      // Set profileCompleted: true
      await completeHospitalOnboarding(onboardingData);
      addToast('Admin Onboarding Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving admin profile.', 'error');
    }
  };

  return (
    <div
      className="setup-wizard-page"
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: '#020d20',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 24px',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Mesh glowing bubbles */}
      <div style={{ position: 'absolute', right: '-120px', top: '10%', opacity: 0.08, zIndex: 1 }}>
        <VyasaLogo style={{ width: '400px', height: '400px' }} />
      </div>

      {/* Secure Logout */}
      <button
        onClick={async () => {
          const { logout } = useAuthStore.getState();
          await logout();
          addToast('Logged out securely.', 'info');
          navigate('/login');
        }}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '10px',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s',
        }}
      >
        Secure Logout / Back
      </button>

      {/* SETUP CARD */}
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '780px',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          padding: '36px',
          zIndex: 2,
          transition: 'all 0.3s ease',
        }}
      >
        {/* brand header inside card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
          <VyasaLogo style={{ width: '40px', height: '40px' }} />
          <h1 style={{ color: '#0066ff', fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '1.5px', margin: 0 }}>
            VYASA
          </h1>
        </div>

        {/* Header titles */}
        <div style={{ marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <h2 style={{ color: '#0c1a30', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: '0 0 4px 0' }}>
            Add Admin (Institutional Owner)
          </h2>
          <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
            Enter nurse details to register and manage care efficiently
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>0% completed</span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: '5%',
                height: '100%',
                background: '#0066ff',
                borderRadius: '2px',
              }}
            ></div>
          </div>
        </div>

        {/* Admin Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Name</label>
            <input 
              type="text" 
              value={adminName} 
              onChange={(e) => setAdminName(e.target.value)} 
              placeholder="Enter a Full Name" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Age</label>
            <input 
              type="text" 
              value={adminAge} 
              onChange={(e) => setAdminAge(e.target.value)} 
              placeholder="Enter a Mobile Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gender</label>
            <input 
              type="text" 
              value={adminGender} 
              onChange={(e) => setAdminGender(e.target.value)} 
              placeholder="Enter a Mobile Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Birth</label>
            <input 
              type="date" 
              value={adminDob} 
              onChange={(e) => setAdminDob(e.target.value)} 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', color: adminDob ? '#0f172a' : '#94a3b8' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Phone No</label>
            <input 
              type="text" 
              value={adminPhone} 
              onChange={(e) => setAdminPhone(e.target.value)} 
              placeholder="Enter a GST Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email ID</label>
            <input 
              type="email" 
              value={adminEmail} 
              onChange={(e) => setAdminEmail(e.target.value)} 
              placeholder="Enter a GST Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Address</label>
            <input 
              type="text" 
              value={adminAddress} 
              onChange={(e) => setAdminAddress(e.target.value)} 
              placeholder="Enter a Full Address" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Department</label>
            <input 
              type="text" 
              value={adminDept} 
              onChange={(e) => setAdminDept(e.target.value)} 
              placeholder="Enter a Full Address" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Designation</label>
            <input 
              type="text" 
              value={adminDesignation} 
              onChange={(e) => setAdminDesignation(e.target.value)} 
              placeholder="Enter a Full Address" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            onClick={handleCompleteSetup} 
            style={{ 
              background: '#0066ff', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '14px 44px', 
              fontSize: '14px', 
              fontWeight: 700, 
              cursor: 'pointer', 
              transition: 'all 0.2s', 
              boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' 
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupWizard;
