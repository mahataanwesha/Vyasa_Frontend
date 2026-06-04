import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';

export const PharmacistSetupWizard: React.FC = () => {
  const { user, completeDoctorOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // State matching Pharmacy form fields in Figma mockup
  const [pharmName, setPharmName] = useState(user?.fullName || '');
  const [pharmAddress, setPharmAddress] = useState('');
  const [pharmRegNo, setPharmRegNo] = useState('');
  const [pharmGst, setPharmGst] = useState('');
  const [pharmPharmacistRegNo, setPharmPharmacistRegNo] = useState('');
  const [pharmUpload, setPharmUpload] = useState('');
  const [pharmNo, setPharmNo] = useState(user?.phone || '');

  const handleCompleteSetup = async () => {
    if (!pharmName || !pharmAddress) {
      addToast('Please enter the pharmacy name and address.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        pharmacyName: pharmName,
        address: pharmAddress,
        pharmacyRegNo: pharmRegNo,
        gstNumber: pharmGst,
        pharmacistRegNo: pharmPharmacistRegNo,
        uploadDoc: pharmUpload,
        pharmacyPhone: pharmNo,
      };

      // Set profileCompleted: true
      await completeDoctorOnboarding(onboardingData);
      addToast('Pharmacy Onboarding Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving pharmacy profile.', 'error');
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
            Pharmacy Login
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

        {/* Pharmacy Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Name of Pharmacy (Company/Proprietor)</label>
            <input 
              type="text" 
              value={pharmName} 
              onChange={(e) => setPharmName(e.target.value)} 
              placeholder="Enter a Full Name" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Address</label>
            <input 
              type="text" 
              value={pharmAddress} 
              onChange={(e) => setPharmAddress(e.target.value)} 
              placeholder="Enter a Mobile Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Pharmacy Reg. No. (Optional)</label>
            <input 
              type="date" 
              value={pharmRegNo} 
              onChange={(e) => setPharmRegNo(e.target.value)} 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none', color: pharmRegNo ? '#0f172a' : '#94a3b8' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>GST (Optional)</label>
            <input 
              type="text" 
              value={pharmGst} 
              onChange={(e) => setPharmGst(e.target.value)} 
              placeholder="Enter a License Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Pharmacist Reg. No. (Optional)</label>
            <input 
              type="text" 
              value={pharmPharmacistRegNo} 
              onChange={(e) => setPharmPharmacistRegNo(e.target.value)} 
              placeholder="Enter a GST Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Upload (Optional)</label>
            <input 
              type="text" 
              value={pharmUpload} 
              onChange={(e) => setPharmUpload(e.target.value)} 
              placeholder="Enter a GST Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Pharm. No.</label>
            <input 
              type="text" 
              value={pharmNo} 
              onChange={(e) => setPharmNo(e.target.value)} 
              placeholder="Enter a GST Number" 
              style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
            />
          </div>
          <div></div>
          <div></div>
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

export default PharmacistSetupWizard;
