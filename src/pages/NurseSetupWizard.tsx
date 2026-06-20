import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useClinicalStore } from '../store/useClinicalStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { Check, Upload } from 'lucide-react';

export const NurseSetupWizard: React.FC = () => {
  const { user, completeDoctorOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // 4-Step wizard flow matching Figma panels
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // STEP 1: Nurse Personal Information
  const [nurseName, setNurseName] = useState(user?.fullName || '');
  const [nurseMobile, setNurseMobile] = useState(user?.phone || '');
  const [nurseDob, setNurseDob] = useState('');
  const [nurseAddress, setNurseAddress] = useState('');
  const [nurseGender, setNurseGender] = useState('');

  // STEP 2: Qualification Details
  const [nurseDegree, setNurseDegree] = useState('GNM');
  const [nurseRegNum, setNurseRegNum] = useState('');
  const [nurseCouncil, setNurseCouncil] = useState('');
  const [nurseRegDateOpt, setNurseRegDateOpt] = useState('');
  const [nurseValidUptoOpt, setNurseValidUptoOpt] = useState('');
  const [nurseLocation, setNurseLocation] = useState('');
  const [nurseSpeciality, setNurseSpeciality] = useState('');

  // STEP 3: Registration Details
  const [nurseRegNum2, setNurseRegNum2] = useState('');
  const [nurseCouncilType, setNurseCouncilType] = useState('');
  const [nurseRegDate, setNurseRegDate] = useState('');
  const [nurseValidUpto, setNurseValidUpto] = useState('');
  const [nurseCountry, setNurseCountry] = useState('India');

  // STEP 4: Experience
  const [nurseExperienceYears, setNurseExperienceYears] = useState('3 Years');
  const [nurseCurrentType, setNurseCurrentType] = useState('General Ward');
  const [nurseExperienceRegDate, setNurseExperienceRegDate] = useState('');

  const handleCompleteSetup = async () => {
    if (!nurseName || !nurseMobile) {
      addToast('Please enter nurse name and mobile number.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        fullName: nurseName,
        phone: nurseMobile,
        dob: nurseDob,
        address: nurseAddress,
        gender: nurseGender,
        degree: nurseDegree,
        registrationNumber: nurseRegNum || nurseRegNum2,
        medicalCouncil: nurseCouncil || nurseCouncilType,
        dateOfRegistration: nurseRegDateOpt || nurseRegDate || nurseExperienceRegDate,
        validUpto: nurseValidUptoOpt || nurseValidUpto,
        location: nurseLocation || nurseCountry,
        speciality: nurseSpeciality || nurseCurrentType,
        experienceYears: nurseExperienceYears,
      };

      const token = localStorage.getItem('vyasa_invite_token');
      if (token) {
        // Invite mode: Submit request
        const { submitStaffRequest } = useClinicalStore.getState();
        submitStaffRequest({
          name: nurseName,
          role: 'Nurse',
          phone: nurseMobile,
          details: onboardingData
        });
        addToast('Your access request has been sent to the Admin for approval!', 'success');
        localStorage.removeItem('vyasa_invite_token');
        localStorage.removeItem('vyasa_invite_role');
        navigate('/login');
        return;
      }

      // Calls same API under the hood to set profileCompleted: true
      await completeDoctorOnboarding(onboardingData);
      addToast('Nurse Profile Onboarding Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving nurse profile.', 'error');
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: '#0c1a30', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: '0 0 4px 0' }}>
                {currentStep === 1 && 'Add Nurse Personal Information'}
                {currentStep === 2 && 'Qualification Details'}
                {currentStep === 3 && 'Registration Details'}
                {currentStep === 4 && 'Experience'}
              </h2>
              <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
                Enter nurse details to register and manage care efficiently
              </p>
            </div>
          </div>
        </div>

        {/* Custom Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
            {currentStep === 1 && '0% completed'}
            {currentStep === 2 && '33% completed'}
            {currentStep === 3 && '66% completed'}
            {currentStep === 4 && '90% completed'}
          </span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: currentStep === 1 ? '5%' : currentStep === 2 ? '33%' : currentStep === 3 ? '66%' : '90%',
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
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px', position: 'relative', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: '3px', background: '#cbd5e1', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }} />
            <div style={{ position: 'absolute', left: 0, width: currentStep === 1 ? '0%' : currentStep === 2 ? '33%' : currentStep === 3 ? '66%' : '100%', height: '3px', background: '#4a7cff', top: '50%', transform: 'translateY(-50%)', zIndex: 1, transition: 'all 0.3s' }} />

            <div onClick={() => setCurrentStep(1)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 1 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 1 ? <Check size={12} /> : '1'}
            </div>
            <div onClick={() => setCurrentStep(2)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 2 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 2 ? <Check size={12} /> : '2'}
            </div>
            <div onClick={() => setCurrentStep(3)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 3 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 3 ? <Check size={12} /> : '3'}
            </div>
            <div onClick={() => setCurrentStep(4)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep === 4 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              4
            </div>
          </div>
        </div>

        {/* STEP 1: Nurse Personal Information */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Full Name</label>
                <input 
                  type="text" 
                  value={nurseName} 
                  onChange={(e) => setNurseName(e.target.value)} 
                  placeholder="Enter full Name" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Mobile Number</label>
                <input 
                  type="tel" 
                  value={nurseMobile} 
                  onChange={(e) => setNurseMobile(e.target.value)} 
                  placeholder="Enter a Mobile Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Birth</label>
                <input 
                  type="date" 
                  value={nurseDob} 
                  onChange={(e) => setNurseDob(e.target.value)} 
                  placeholder="DD/MM/YYYY"
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Home Address</label>
                <input 
                  type="text" 
                  value={nurseAddress} 
                  onChange={(e) => setNurseAddress(e.target.value)} 
                  placeholder="Enter address" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gender</label>
                <select 
                  value={nurseGender} 
                  onChange={(e) => setNurseGender(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: nurseGender ? '#0f172a' : '#94a3b8' }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={() => {
                  if (!nurseName || !nurseMobile) {
                    addToast('Please enter nurse name and mobile number to proceed.', 'warning');
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

        {/* STEP 2: Qualification Details */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Degree</label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {['GNM', 'ANM', 'B.Sc'].map(deg => {
                    const isSelected = nurseDegree === deg;
                    return (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setNurseDegree(deg)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: isSelected ? 'none' : '1.5px solid #cbd5e1',
                          background: isSelected ? '#0066ff' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {deg}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Number</label>
                <input 
                  type="text" 
                  value={nurseRegNum} 
                  onChange={(e) => setNurseRegNum(e.target.value)} 
                  placeholder="Registration Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Name of Medical Council/State Council</label>
                <select 
                  value={nurseCouncil} 
                  onChange={(e) => setNurseCouncil(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none' }}
                >
                  <option value="">Select Council</option>
                  <option value="State Nursing Council">State Nursing Council</option>
                  <option value="Indian Nursing Council">Indian Nursing Council</option>
                  <option value="Other Board">Other Board</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Registration (Optional)</label>
                <input 
                  type="date" 
                  value={nurseRegDateOpt} 
                  onChange={(e) => setNurseRegDateOpt(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Valid Upto (Optional)</label>
                <input 
                  type="date" 
                  value={nurseValidUptoOpt} 
                  onChange={(e) => setNurseValidUptoOpt(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Location</label>
                <select 
                  value={nurseLocation} 
                  onChange={(e) => setNurseLocation(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none' }}
                >
                  <option value="">Select Location</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Upload Certificate</label>
                <div style={{ display: 'flex', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', alignItems: 'center', background: '#fafafa', cursor: 'pointer', height: '45px', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Choose File</span>
                  <Upload size={16} style={{ color: '#0066ff' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Speciality</label>
                <input 
                  type="text" 
                  value={nurseSpeciality} 
                  onChange={(e) => setNurseSpeciality(e.target.value)} 
                  placeholder="Enter speciality" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              <div></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="button" onClick={() => setCurrentStep(1)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button type="button" onClick={() => setCurrentStep(3)} style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Registration Details */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Number</label>
                <input 
                  type="text" 
                  value={nurseRegNum2} 
                  onChange={(e) => setNurseRegNum2(e.target.value)} 
                  placeholder="Registration Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Council Type</label>
                <input 
                  type="text" 
                  value={nurseCouncilType} 
                  onChange={(e) => setNurseCouncilType(e.target.value)} 
                  placeholder="Council Type" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Date</label>
                <input 
                  type="date" 
                  value={nurseRegDate} 
                  onChange={(e) => setNurseRegDate(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Valid Upto</label>
                <input 
                  type="date" 
                  value={nurseValidUpto} 
                  onChange={(e) => setNurseValidUpto(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Country</label>
                <input 
                  type="text" 
                  value={nurseCountry} 
                  onChange={(e) => setNurseCountry(e.target.value)} 
                  placeholder="Country" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Linked Certificate</label>
                <div style={{ display: 'flex', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px', alignItems: 'center', background: '#fafafa', cursor: 'pointer', height: '45px', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Choose File</span>
                  <Upload size={16} style={{ color: '#0066ff' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="button" onClick={() => setCurrentStep(2)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button type="button" onClick={() => setCurrentStep(4)} style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Experience */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Years of Experience</label>
                <input 
                  type="text" 
                  value={nurseExperienceYears} 
                  onChange={(e) => setNurseExperienceYears(e.target.value)} 
                  placeholder="e.g. 3 Years" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Current Type</label>
                <input 
                  type="text" 
                  value={nurseCurrentType} 
                  onChange={(e) => setNurseCurrentType(e.target.value)} 
                  placeholder="e.g. General Ward" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Date</label>
                <input 
                  type="date" 
                  value={nurseExperienceRegDate} 
                  onChange={(e) => setNurseExperienceRegDate(e.target.value)} 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="button" onClick={() => setCurrentStep(3)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
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

export default NurseSetupWizard;
