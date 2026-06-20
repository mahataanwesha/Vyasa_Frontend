import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { Check, Upload } from 'lucide-react';
import { useClinicalStore } from '../store/useClinicalStore';

export const LabTechnicianSetupWizard: React.FC = () => {
  const { user, completeDoctorOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // 2-Step wizard flow matching Figma panels
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // STEP 1: Add Lab / Investigation Center
  const [labName, setLabName] = useState(user?.fullName || '');
  const [labType, setLabType] = useState('Diagnostic Lab');
  const [labPathology, setLabPathology] = useState('');
  const [labBiochem, setLabBiochem] = useState('');
  const [labHpe, setLabHpe] = useState('');
  const [labAddress, setLabAddress] = useState('');

  // STEP 2: Add Lab Document
  const [labRegNo, setLabRegNo] = useState('');
  const [labUpload] = useState('');
  const [labGst, setLabGst] = useState('');
  const [labPhone, setLabPhone] = useState(user?.phone || '');
  const [labEmail, setLabEmail] = useState(user?.email || '');
  const [labContactPerson, setLabContactPerson] = useState('');

  const handleCompleteSetup = async () => {
    if (!labName || !labAddress) {
      addToast('Please enter the laboratory center name and address.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        labName,
        labType,
        pathologyMicrobiology: labPathology,
        biochemistryRadiology: labBiochem,
        hpeMolecularGenetics: labHpe,
        address: labAddress,
        registrationNumber: labRegNo,
        uploadDoc: labUpload,
        gstNumber: labGst,
        phone: labPhone,
        email: labEmail,
        contactPersonName: labContactPerson,
      };

      const token = localStorage.getItem('vyasa_invite_token');
      if (token) {
        const { submitStaffRequest } = useClinicalStore.getState();
        submitStaffRequest({
          name: labName,
          role: 'Labs',
          phone: labPhone,
          details: onboardingData
        });
        addToast('Your access request has been sent to the Admin for approval!', 'success');
        localStorage.removeItem('vyasa_invite_token');
        localStorage.removeItem('vyasa_invite_role');
        navigate('/login');
        return;
      }

      // Calls same API to register profileCompleted: true
      await completeDoctorOnboarding(onboardingData);
      addToast('Laboratory Profile Onboarding Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving laboratory profile.', 'error');
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

        {/* Step headers */}
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <h2 style={{ color: '#0c1a30', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: '0 0 4px 0' }}>
            {currentStep === 1 ? 'Add Lab / Investigation Center' : 'Add Lab Document'}
          </h2>
          <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
            Enter nurse details to register and manage care efficiently
          </p>
        </div>

        {/* Custom Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
            {currentStep === 1 ? '0% completed' : '50% completed'}
          </span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: currentStep === 1 ? '5%' : '50%',
                height: '100%',
                background: '#0066ff',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>

        {/* Step Nodes Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '200px', position: 'relative', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: '3px', background: '#cbd5e1', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }} />
            <div style={{ position: 'absolute', left: 0, width: currentStep === 1 ? '0%' : '100%', height: '3px', background: '#4a7cff', top: '50%', transform: 'translateY(-50%)', zIndex: 1, transition: 'all 0.3s' }} />

            <div onClick={() => setCurrentStep(1)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 1 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 1 ? <Check size={12} /> : '1'}
            </div>
            <div onClick={() => setCurrentStep(2)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep === 2 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              2
            </div>
          </div>
        </div>

        {/* STEP 1: Add Lab / Investigation Center */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Name of Lab / Center</label>
                <input 
                  type="text" 
                  value={labName} 
                  onChange={(e) => setLabName(e.target.value)} 
                  placeholder="Enter full Name" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Type of Lab (Multiple Select)</label>
                <input 
                  type="text" 
                  value={labType} 
                  onChange={(e) => setLabType(e.target.value)} 
                  placeholder="Enter a Mobile Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Pathology/Microbiology</label>
                <input 
                  type="text" 
                  value={labPathology} 
                  onChange={(e) => setLabPathology(e.target.value)} 
                  placeholder="Enter a Mobile Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Biochemistry/Radiology</label>
                <input 
                  type="text" 
                  value={labBiochem} 
                  onChange={(e) => setLabBiochem(e.target.value)} 
                  placeholder="Enter a License Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>HPE/Molecular Genetics</label>
                <input 
                  type="text" 
                  value={labHpe} 
                  onChange={(e) => setLabHpe(e.target.value)} 
                  placeholder="Enter a GST Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Address</label>
                <input 
                  type="text" 
                  value={labAddress} 
                  onChange={(e) => setLabAddress(e.target.value)} 
                  placeholder="Enter a GST Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={() => {
                  if (!labName || !labAddress) {
                    addToast('Please enter lab center name and address.', 'warning');
                    return;
                  }
                  setCurrentStep(2);
                }} 
                style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Add Lab Document */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Lab Reg. No.</label>
                <input 
                  type="text" 
                  value={labRegNo} 
                  onChange={(e) => setLabRegNo(e.target.value)} 
                  placeholder="Enter a Full Name" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Upload Document (Optional)</label>
                <div style={{ display: 'flex', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', alignItems: 'center', background: '#fafafa', cursor: 'pointer', height: '45px', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Choose File</span>
                  <Upload size={16} style={{ color: '#0066ff' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>GST (Optional)</label>
                <input 
                  type="text" 
                  value={labGst} 
                  onChange={(e) => setLabGst(e.target.value)} 
                  placeholder="Enter a Mobile Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Phone No. (Landline / Mobile)</label>
                <input 
                  type="tel" 
                  value={labPhone} 
                  onChange={(e) => setLabPhone(e.target.value)} 
                  placeholder="Enter a License Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email ID</label>
                <input 
                  type="email" 
                  value={labEmail} 
                  onChange={(e) => setLabEmail(e.target.value)} 
                  placeholder="Enter a GST Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Contact Person Name</label>
                <input 
                  type="text" 
                  value={labContactPerson} 
                  onChange={(e) => setLabContactPerson(e.target.value)} 
                  placeholder="Enter a GST Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="button" onClick={() => setCurrentStep(1)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button 
                type="button" 
                onClick={handleCompleteSetup} 
                style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTechnicianSetupWizard;
