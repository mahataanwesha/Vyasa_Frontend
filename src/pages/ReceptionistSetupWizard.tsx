import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useClinicalStore } from '../store/useClinicalStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';

export const ReceptionistSetupWizard: React.FC = () => {
  const { user, completeDoctorOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Basic info for Receptionist
  const [name, setName] = useState(user?.fullName || '');
  const [mobile, setMobile] = useState(user?.phone || '');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('0-2 Years');

  const handleCompleteSetup = async () => {
    if (!name || !mobile) {
      addToast('Please enter your name and mobile number.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        fullName: name,
        phone: mobile,
        dob,
        gender,
        address,
        experienceYears: experience,
      };

      const token = localStorage.getItem('vyasa_invite_token');
      if (token) {
        // Invite mode: Submit request
        const { submitStaffRequest } = useClinicalStore.getState();
        submitStaffRequest({
          name: name,
          role: 'Receptionist',
          phone: mobile,
          details: onboardingData
        });
        addToast('Your access request has been sent to the Admin for approval!', 'success');
        localStorage.removeItem('vyasa_invite_token');
        localStorage.removeItem('vyasa_invite_role');
        navigate('/login');
        return;
      }

      await completeDoctorOnboarding(onboardingData);
      addToast('Receptionist Profile Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving receptionist profile.', 'error');
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
          maxWidth: '680px',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          padding: '36px',
          zIndex: 2,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
          <VyasaLogo style={{ width: '40px', height: '40px' }} />
          <h1 style={{ color: '#0066ff', fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '1.5px', margin: 0 }}>
            VYASA
          </h1>
        </div>

        <div style={{ marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <h2 style={{ color: '#0c1a30', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: '0 0 4px 0' }}>
            Receptionist Setup
          </h2>
          <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
            Enter your details to request access to the hospital portal.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter full Name" 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Mobile Number</label>
              <input 
                type="tel" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                placeholder="Enter a Mobile Number" 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Birth</label>
              <input 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gender</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: gender ? '#0f172a' : '#94a3b8' }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Home Address</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter address" 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Experience</label>
              <select 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none' }}
              >
                <option>0-2 Years</option>
                <option>2-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={handleCompleteSetup} 
              style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
            >
              Complete Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistSetupWizard;
