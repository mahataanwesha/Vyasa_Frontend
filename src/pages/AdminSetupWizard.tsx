import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { Check } from 'lucide-react';

interface AttachedDoctor {
  title: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  country: string;
  district: string;
  pinCode: string;
  degree: string;
  college: string;
  university: string;
  yearOfPassing: string;
  designation: string;
  speciality: string;
  department: string;
  registrationNumber: string;
  councilType: string;
  registrationDate: string;
  validUpto: string;
  regCountry: string;
}

export const AdminSetupWizard: React.FC = () => {
  const { user, completeHospitalOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Multi-step wizard flow
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

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

  // STEP 3: Attached Doctor States
  const [docName, setDocName] = useState('');
  const [docPhone, setDocPhone] = useState('');
  const [docDesignation, setDocDesignation] = useState('');
  const [docDept, setDocDept] = useState('');
  const [docOpdTimings, setDocOpdTimings] = useState('');
  const [docConsultationFee, setDocConsultationFee] = useState('');
  const [doctors, setDoctors] = useState<AttachedDoctor[]>([]);

  // STEP 4: Supported Cashless Insurances
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>(['Star Health Insurance', 'HDFC Ergo']);

  const servicesList = ['OPD', 'Emergency', 'Pediatrics', 'ICU', 'Cardiology', 'Radiology', 'Pharmacy', 'Laboratory'];

  const insurancesList = [
    { name: 'Star Health Insurance', desc: '77% Star Health Tri-Option' },
    { name: 'ICICI Lombard', desc: '77% ICICI Lombard' },
    { name: 'HDFC Ergo', desc: '77% HDFC Ergo' },
    { name: 'Care Health Insurance', desc: '77% Care Health Insurance' }
  ];

  const handleToggleInsurance = (ins: string) => {
    if (selectedInsurances.includes(ins)) {
      setSelectedInsurances(selectedInsurances.filter(i => i !== ins));
    } else {
      setSelectedInsurances([...selectedInsurances, ins]);
    }
  };

  const handleCompleteSetup = async () => {
    if (selectedInsurances.length === 0) {
      addToast('Please select at least one supporting insurance partner.', 'warning');
      return;
    }

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

        // Attached Doctors
        attachedDoctors: doctors.length > 0 ? doctors : [
          {
            title: 'Dr.',
            name: docName || 'Sarah Jenkins',
            dob: '1985-06-12',
            gender: 'Female',
            phone: docPhone || '+15559876543',
            country: 'India',
            district: 'Mumbai',
            pinCode: '400001',
            degree: 'MBBS, MD',
            college: 'Grant Medical College',
            university: 'MUHS',
            yearOfPassing: '2012',
            designation: docDesignation || 'Senior Consultant',
            speciality: docConsultationFee ? `${docConsultationFee} INR` : '500 INR',
            department: docDept || 'Cardiology Unit',
            registrationNumber: 'MCI-12345',
            councilType: 'State Medical Council',
            registrationDate: '2012-08-20',
            validUpto: '2032-08-20',
            regCountry: 'India'
          }
        ],
        attachedNurses: [],
        attachedStaff: [],
        supportedInsurances: selectedInsurances
      };

      // Set profileCompleted: true
      await completeHospitalOnboarding(onboardingData);
      addToast('Admin & Hospital Onboarding Setup completed!', 'success');
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
            {currentStep === 3 && 'Attached Doctors'}
            {currentStep === 4 && 'Insurance Companies'}
          </h2>
          <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
            {currentStep === 1 && 'Enter admin details to register and manage care efficiently'}
            {currentStep === 2 && 'Register your medical institution and configure services'}
            {currentStep === 3 && 'Register your medical institution and configure services'}
            {currentStep === 4 && 'Register your medical institution and configure services'}
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
            {currentStep === 1 && '25% completed'}
            {currentStep === 2 && '50% completed'}
            {currentStep === 3 && '75% completed'}
            {currentStep === 4 && '90% completed'}
          </span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: currentStep === 1 ? '25%' : currentStep === 2 ? '50%' : currentStep === 3 ? '75%' : '90%',
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

        {/* Step 3: Attached Doctors */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Doctor Name</label>
                <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Enter a Doctor Name" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                <input type="tel" value={docPhone} onChange={(e) => setDocPhone(e.target.value)} placeholder="Enter your phone" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Designation</label>
                <input type="text" value={docDesignation} onChange={(e) => setDocDesignation(e.target.value)} placeholder="Enter Speciality Name" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Department</label>
                <input type="text" value={docDept} onChange={(e) => setDocDept(e.target.value)} placeholder="Add a Department" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>OPD Timings</label>
                <input type="text" value={docOpdTimings} onChange={(e) => setDocOpdTimings(e.target.value)} placeholder="OPD Timing (eg. 9AM - 5PM)" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Consultation Fee</label>
                <input type="text" value={docConsultationFee} onChange={(e) => setDocConsultationFee(e.target.value)} placeholder="Consultation Fee (INR)" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              </div>
            </div>

            {/* List of currently attached doctors */}
            {doctors.length > 0 && (
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '10px' }}>
                <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Currently Attached ({doctors.length})</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {doctors.map((doc, idx) => (
                    <div key={idx} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                      {doc.name} ({doc.speciality || doc.designation})
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={() => setCurrentStep(2)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
              <button
                type="button"
                onClick={() => {
                  if (docName || docPhone) {
                    if (!docName || !docPhone) {
                      addToast('Please complete doctor name and phone number.', 'warning');
                      return;
                    }
                    const newDoc: AttachedDoctor = {
                      title: 'Dr.',
                      name: docName,
                      dob: '1985-01-01',
                      gender: 'Male',
                      phone: docPhone,
                      country: 'India',
                      district: 'Default',
                      pinCode: '400001',
                      degree: docOpdTimings || '9AM - 5PM',
                      college: 'Medical College',
                      university: 'State University',
                      yearOfPassing: '2010',
                      designation: docDesignation || 'Consultant',
                      speciality: docConsultationFee ? `${docConsultationFee} INR` : '500 INR',
                      department: docDept || 'Outpatient Unit',
                      registrationNumber: 'MCI-' + Math.floor(10000 + Math.random() * 90000),
                      councilType: 'Medical Council',
                      registrationDate: '2010-08-15',
                      validUpto: '2035-08-15',
                      regCountry: 'India'
                    };
                    setDoctors([...doctors, newDoc]);
                    setDocName('');
                    setDocPhone('');
                    setDocDesignation('');
                    setDocDept('');
                    setDocOpdTimings('');
                    setDocConsultationFee('');
                  }
                  setCurrentStep(4);
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
                {docName || docPhone ? 'Attach & Next' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Insurance Companies */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {insurancesList.map(ins => {
                const isSelected = selectedInsurances.includes(ins.name);
                return (
                  <div
                    key={ins.name}
                    onClick={() => handleToggleInsurance(ins.name)}
                    style={{
                      border: isSelected ? '2px solid #0066ff' : '1.5px solid #cbd5e1',
                      borderRadius: '16px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: isSelected ? '#f0f4ff' : '#ffffff',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: isSelected ? '#e0e7ff' : '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0066ff',
                      fontWeight: 700
                    }}>
                      {isSelected ? <Check size={20} /> : <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '2px solid #cbd5e1' }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0c1a30', fontFamily: 'Outfit, sans-serif', margin: '0 0 2px 0' }}>{ins.name}</p>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{ins.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button onClick={() => setCurrentStep(3)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
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
