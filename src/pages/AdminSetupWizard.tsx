import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { Copy, Link as LinkIcon } from 'lucide-react';

export const AdminSetupWizard: React.FC = () => {
  const { user, completeHospitalOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Multi-step wizard flow
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // STEP 1: Admin Institutional Owner form fields
  const [adminName, setAdminName] = useState(user?.fullName || '');
  const [adminAge, setAdminAge] = useState('');
  const [adminGender, setAdminGender] = useState('');
  const [adminDob, setAdminDob] = useState('');
  const [adminPhone, setAdminPhone] = useState(user?.phone || '');
  const [adminEmail, setAdminEmail] = useState(user?.email || '');
  const [adminAddress, setAdminAddress] = useState('');
  const [adminDept, setAdminDept] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('');

  // STEP 2: Institution / Clinic Registration States
  const [institutionName, setInstitutionName] = useState(user?.hospitalName || '');
  const [establishmentDate, setEstablishmentDate] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [selectedService, setSelectedService] = useState('OPD');

  const servicesList = ['OPD', 'Emergency', 'Pediatrics', 'ICU', 'Cardiology', 'Radiology', 'Pharmacy', 'Laboratory'];

  // STEP 3: Link Verification Process
  const [selectedRole, setSelectedRole] = useState('Doctor');
  const [generatedLink, setGeneratedLink] = useState('');
  const roles = ['Doctor', 'Nurse', 'Pharmacist', 'Labs', 'Receptionist'];

  const handleGenerateLink = () => {
    const baseUrl = window.location.origin;
    // Base64 encode the role + hospital id to mock a secure verification token
    const token = btoa(`${selectedRole}-${Date.now()}`);
    setGeneratedLink(`${baseUrl}/invite/${selectedRole.toLowerCase()}?token=${token}`);
    addToast('Unique invite link generated!', 'success');
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      addToast('Invite link copied to clipboard!', 'success');
    }
  };

  const handleCompleteSetup = async () => {
    try {
      const onboardingData = {
        // Institutional Info
        institutionName: institutionName || user?.hospitalName || 'Associated Hospital',
        legalStatus: 'Pvt Ltd',
        establishmentYears: establishmentDate || '5-10 Years',
        licenseNumber,
        gstNumber,
        servicesOffered: [selectedService],

        // Admin Info
        adminName,
        adminAge,
        adminGender,
        adminDob,
        adminPhone,
        adminEmail,
        adminAddress,
        adminDept,
        adminDesignation,
      };

      // Set profileCompleted: true
      await completeHospitalOnboarding(onboardingData);
      addToast('Admin Setup completed!', 'success');
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
            {currentStep === 1 && 'Add Admin (Institutional Owner)'}
            {currentStep === 2 && 'Institution / Clinic Registration'}
            {currentStep === 3 && 'Staff Invitations (Link Verification)'}
          </h2>
          <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
            {currentStep === 1 && 'Enter admin details to register and manage care efficiently'}
            {currentStep === 2 && 'Register your medical institution and configure services'}
            {currentStep === 3 && 'Generate unique invite links to verify and onboard your hospital staff'}
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
            {currentStep === 1 && '33% completed'}
            {currentStep === 2 && '66% completed'}
            {currentStep === 3 && '100% completed'}
          </span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%',
                height: '100%',
                background: '#0066ff',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Admin Details */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Admin Form Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px', marginBottom: '10px' }}>
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
                  placeholder="Enter Age" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gender</label>
                <input 
                  type="text" 
                  value={adminGender} 
                  onChange={(e) => setAdminGender(e.target.value)} 
                  placeholder="Enter Gender" 
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
                  placeholder="Enter a Phone Number" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Email ID</label>
                <input 
                  type="email" 
                  value={adminEmail} 
                  onChange={(e) => setAdminEmail(e.target.value)} 
                  placeholder="Enter an Email ID" 
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
                  placeholder="Enter a Department" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Designation</label>
                <input 
                  type="text" 
                  value={adminDesignation} 
                  onChange={(e) => setAdminDesignation(e.target.value)} 
                  placeholder="Enter a Designation" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                />
              </div>
            </div>

            {/* Action Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => {
                  if (!adminName || !adminPhone) {
                    addToast('Please enter admin name and phone number.', 'warning');
                    return;
                  }
                  setCurrentStep(2);
                }} 
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
        )}

        {/* Step 2: Institution / Clinic Registration */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Institution / Clinic Name</label>
                <input type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder="e.g. City General Hospital" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13px' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Logo (Optional - PNG or JPG)</label>
                <div style={{ display: 'flex', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '10px 12px', alignItems: 'center', background: '#fafafa', cursor: 'pointer', height: '42px' }}>
                  <span style={{ fontSize: '12px', color: '#4a7cff', fontWeight: 700 }}>Choose File</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Date of Establishment</label>
                <input type="date" value={establishmentDate} onChange={(e) => setEstablishmentDate(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>License Number</label>
                <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} placeholder="Enter a License Number" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>GST Number (Optional)</label>
                <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="Enter a GST Number" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '13px' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Services Offered</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#ffffff', fontSize: '13px' }}>
                  <option value="">Select Service Offered</option>
                  {servicesList.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={() => setCurrentStep(1)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button
                type="button"
                onClick={() => {
                  if (!institutionName) {
                    addToast('Please enter the clinic name.', 'warning');
                    return;
                  }
                  setCurrentStep(3);
                }}
                style={{
                  background: '#0066ff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)',
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Link Verification Process */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: '1.6' }}>
                Rather than manually entering staff details, you can generate a secure invite link for each role. When staff members click the link and register, their requests will appear on your Dashboard for your approval.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Select Role to Invite</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setGeneratedLink(''); // reset link on role change
                      }}
                      style={{
                        padding: '10px 16px',
                        background: selectedRole === role ? '#eef2ff' : '#ffffff',
                        border: selectedRole === role ? '1.5px solid #4a7cff' : '1.5px solid #cbd5e1',
                        color: selectedRole === role ? '#4a7cff' : '#64748b',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0c1a30',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '16px'
                }}
              >
                <LinkIcon size={16} />
                Generate {selectedRole} Invite Link
              </button>

              {generatedLink && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="animate-fade-in">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#ffffff',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '10px',
                      fontSize: '13px',
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={copyToClipboard}
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    title="Copy to clipboard"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button onClick={() => setCurrentStep(2)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button
                onClick={handleCompleteSetup}
                style={{
                  background: '#0066ff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)',
                }}
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

export default AdminSetupWizard;
