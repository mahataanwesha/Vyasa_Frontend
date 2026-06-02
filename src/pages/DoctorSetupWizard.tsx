import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { MapPin, Plus, X, Search, Check } from 'lucide-react';

interface Degree {
  degree: string;
  college: string;
  university: string;
  country: string;
  specialization: string;
  year: string;
}

export const DoctorSetupWizard: React.FC = () => {
  const { completeDoctorOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Wizard Flow control
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showDegreeModal, setShowDegreeModal] = useState(false);

  // STEP 1: Personal Information
  const [title, setTitle] = useState('Dr.');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [languages, setLanguages] = useState('English');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [cityState, setCityState] = useState('');
  const [pinCode, setPinCode] = useState('');

  // STEP 2: Professional Details
  const [degrees, setDegrees] = useState<Degree[]>([
    { degree: 'MBBS', college: 'Grant Medical College', university: 'MUHS', country: 'India', specialization: 'General', year: '2016' }
  ]);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [medicalCouncil, setMedicalCouncil] = useState('Medical Council of India (MCI)');
  const [dateOfRegistration, setDateOfRegistration] = useState('');
  const [experience, setExperience] = useState('5 Years');
  const [country, setCountry] = useState('India');
  const [specialization, setSpecialization] = useState('General Practitioner');

  // Degree Modal State
  const [newDegreeName, setNewDegreeName] = useState('MD');
  const [newDegreeCollege, setNewDegreeCollege] = useState('');
  const [newDegreeUniv, setNewDegreeUniv] = useState('');
  const [newDegreeCountry, setNewDegreeCountry] = useState('India');
  const [newDegreeSpec, setNewDegreeSpec] = useState('Internal Medicine');
  const [newDegreeYear, setNewDegreeYear] = useState('2019');

  // STEP 3: Clinic Setup
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [consultationFee, setConsultationFee] = useState('₹500');
  
  // Geolocation search
  const [mapSearch, setMapSearch] = useState('Los Angeles, CA');

  // OPD Availability matrix
  const [opdTimings, setOpdTimings] = useState<{ [day: string]: { active: boolean; start: string; end: string } }>({
    Monday: { active: true, start: '09:00 AM', end: '06:00 PM' },
    Tuesday: { active: true, start: '09:00 AM', end: '06:00 PM' },
    Wednesday: { active: true, start: '09:00 AM', end: '06:00 PM' },
    Thursday: { active: true, start: '09:00 AM', end: '06:00 PM' },
    Friday: { active: true, start: '09:00 AM', end: '06:00 PM' },
    Saturday: { active: true, start: '09:00 AM', end: '01:00 PM' },
    Sunday: { active: false, start: 'Closed', end: 'Closed' }
  });

  const handleAddDegree = () => {
    if (!newDegreeCollege || !newDegreeUniv) {
      addToast('Please enter college and university names.', 'warning');
      return;
    }
    const degree: Degree = {
      degree: newDegreeName,
      college: newDegreeCollege,
      university: newDegreeUniv,
      country: newDegreeCountry,
      specialization: newDegreeSpec,
      year: newDegreeYear
    };
    setDegrees([...degrees, degree]);
    setShowDegreeModal(false);
    addToast(`${newDegreeName} Degree added successfully!`, 'success');
  };

  const handleRemoveDegree = (index: number) => {
    setDegrees(degrees.filter((_, idx) => idx !== index));
  };

  const toggleDayAvailability = (day: string) => {
    setOpdTimings({
      ...opdTimings,
      [day]: {
        ...opdTimings[day],
        active: !opdTimings[day].active
      }
    });
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setOpdTimings({
      ...opdTimings,
      [day]: {
        ...opdTimings[day],
        [type]: value
      }
    });
  };

  const handleCompleteSetup = async () => {
    if (!clinicName || !clinicAddress) {
      addToast('Please fill in your clinic details.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        title,
        fullName,
        dob,
        gender,
        nationality,
        languages: languages.split(',').map(s => s.trim()),
        phone,
        whatsappNumber: whatsapp,
        address,
        district,
        cityState,
        pinCode,
        
        degrees,
        registrationNumber,
        medicalCouncil,
        dateOfRegistration,
        experienceYears: experience,
        specialization,
        country,

        clinicName,
        clinicAddress,
        consultationFee,
        opdTimings
      };

      await completeDoctorOnboarding(onboardingData);
      addToast('Clinic Onboarding Setup complete!', 'success');
      navigate('/'); // Redirect to primary app shell
    } catch (err: any) {
      addToast(err.message || 'Error saving clinic profile.', 'error');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: '#020d20',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

      {/* Brand Stethoscope Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '24px', zIndex: 2 }}>
        <VyasaLogo style={{ width: '48px', height: '48px' }} />
        <h1 style={{ color: '#ffffff', fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 700, letterSpacing: '1px' }}>
          VYASA
        </h1>
      </div>

      {/* Absolute positioned Secure Logout to return to Login options */}
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

      {/* MAIN CONTAINER LAYOUT */}
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: currentStep === 3 ? '1200px' : '640px', // Fluid layout on Step 3 for Map + Scheduler
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          padding: '36px',
          zIndex: 2,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Step Progress indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#0c1a30', fontSize: '22px', fontWeight: 700, marginBottom: '20px', fontFamily: 'Outfit, sans-serif' }}>
            {currentStep === 1 && 'Personal Information'}
            {currentStep === 2 && 'Professional Details'}
            {currentStep === 3 && 'Clinic Setup'}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px', position: 'relative', justifyContent: 'space-between' }}>
            {/* Step Line */}
            <div style={{ position: 'absolute', left: 0, right: 0, height: '3px', background: '#cbd5e1', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }} />
            <div style={{ position: 'absolute', left: 0, width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%', height: '3px', background: '#4a7cff', top: '50%', transform: 'translateY(-50%)', zIndex: 1, transition: 'all 0.3s' }} />

            {/* Step Nodes */}
            <div onClick={() => setCurrentStep(1)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 1 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 1 ? <Check size={12} /> : '1'}
            </div>
            <div onClick={() => setCurrentStep(2)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep >= 2 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              {currentStep > 2 ? <Check size={12} /> : '2'}
            </div>
            <div onClick={() => setCurrentStep(3)} style={{ zIndex: 2, width: '28px', height: '28px', borderRadius: '50%', background: currentStep === 3 ? '#4a7cff' : '#cbd5e1', border: '4px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: 700 }}>
              3
            </div>
          </div>
        </div>

        {/* STEP 1: PERSONAL INFORMATION PANEL */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Title</label>
                <select value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }}>
                  <option>Dr.</option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Date of Birth</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Nationality</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Languages Spoken</label>
                <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g. English, Spanish" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>WhatsApp Number</label>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp Number" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Clinic/Residential Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>District</label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>City / State</label>
                <input type="text" value={cityState} onChange={(e) => setCityState(e.target.value)} placeholder="City / State" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Pin Code</label>
                <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="Pin Code" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              style={{
                width: '100%',
                background: '#4a7cff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              NEXT
            </button>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL DETAILS PANEL */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} className="animate-fade-in">
            {/* Degrees tags pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Medical Degrees</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {degrees.map((deg, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f0f4ff',
                      color: '#4a7cff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1.5px solid #4a7cff'
                    }}
                  >
                    <span>{deg.degree} ({deg.specialization})</span>
                    <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveDegree(idx)} />
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => setShowDegreeModal(true)}
                  style={{
                    background: '#ffffff',
                    border: '1.5px dashed #4a7cff',
                    color: '#4a7cff',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={14} />
                  <span>Add Degree</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Registration Number</label>
                <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} placeholder="Registration Number" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Name of Medical Council</label>
                <input type="text" value={medicalCouncil} onChange={(e) => setMedicalCouncil(e.target.value)} placeholder="Council name" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Date of Registration (Optional)</label>
                <input type="date" value={dateOfRegistration} onChange={(e) => setDateOfRegistration(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Years of Experience</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }}>
                  <option>1-3 Years</option>
                  <option>5 Years</option>
                  <option>5-10 Years</option>
                  <option>10+ Years</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Specialization</label>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g. Cardiologist" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>
            </div>

            {/* Mock Certificate Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Upload Certification Documents</label>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: '#fafafa' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#4a7cff' }}>Choose Certificate PDF or Image</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginTop: '12px' }}>
              <button
                onClick={() => setCurrentStep(1)}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                style={{
                  background: '#4a7cff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CLINIC SETUP & TELEMETRY DAY PANELS (FULL VIEW GRID) */}
        {currentStep === 3 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr', // Form, Map, OPD Schedules in Grid
              gap: '24px',
            }}
            className="animate-fade-in opd-grid-setup"
          >
            {/* 3A. Clinic Configuration Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h3 style={{ color: '#0c1a30', fontSize: '16px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                Clinic details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Clinic Name</label>
                <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="City Heart Center" style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Clinic Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4a7cff' }} />
                  <input type="text" value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} placeholder="Complete Clinic Address" style={{ width: '100%', padding: '12px 38px 12px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Consultation Fee</label>
                <select value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#ffffff' }}>
                  <option>Free (Onboarding promotion)</option>
                  <option>₹300</option>
                  <option>₹500</option>
                  <option>₹1000</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginTop: 'auto', paddingTop: '20px' }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteSetup}
                  style={{
                    background: '#4a7cff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Complete Setup
                </button>
              </div>
            </div>

            {/* 3B. Geo-Tagged Map Panel (Matches center screen exactly) */}
            <div
              style={{
                border: '1.5px solid #cbd5e1',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                height: '420px',
                background: '#fafafa',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>Geo-Tagged</span>
                <span style={{ fontSize: '11px', background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>Map API Connected</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    value={mapSearch}
                    onChange={(e) => setMapSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 30px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      outline: 'none',
                    }}
                  />
                </div>
                <button style={{ background: '#4a7cff', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0 12px', fontSize: '12px', fontWeight: 700 }}>Search</button>
              </div>

              {/* Vector Mock Map Graphic representation */}
              <div
                style={{
                  flex: 1,
                  background: '#e0f2fe',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid #bae6fd',
                }}
              >
                {/* Visual streets mock lines */}
                <div style={{ position: 'absolute', width: '2px', height: '100%', background: '#ffffff', left: '30%' }}></div>
                <div style={{ position: 'absolute', width: '2px', height: '100%', background: '#ffffff', left: '70%' }}></div>
                <div style={{ position: 'absolute', height: '2px', width: '100%', background: '#ffffff', top: '40%' }}></div>
                <div style={{ position: 'absolute', height: '2px', width: '100%', background: '#ffffff', top: '80%' }}></div>
                
                {/* Geotagged blue radius circle */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(74, 124, 255, 0.15)',
                    border: '2px dashed #4a7cff',
                    left: 'calc(50% - 50px)',
                    top: 'calc(50% - 50px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#4a7cff', border: '3px solid #ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}></div>
                </div>
              </div>
            </div>

            {/* 3C. OPD Timings availability day schedule (Matches right panel exactly) */}
            <div
              style={{
                border: '1.5px solid #cbd5e1',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                height: '420px',
                overflowY: 'auto',
              }}
            >
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>OPD Timings</h4>
                <p style={{ fontSize: '10px', color: '#5e6e85' }}>Set your availability displayed in external search.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.keys(opdTimings).map((day) => {
                  const info = opdTimings[day];
                  return (
                    <div
                      key={day}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        borderBottom: '1px solid #f1f5f9',
                        paddingBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="checkbox"
                          checked={info.active}
                          onChange={() => toggleDayAvailability(day)}
                          style={{
                            width: '14px',
                            height: '14px',
                            cursor: 'pointer',
                          }}
                        />
                        <span style={{ fontWeight: 700, color: info.active ? '#0c1a30' : '#94a3b8' }}>{day}</span>
                      </div>

                      {info.active ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="text"
                            value={info.start}
                            onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                            style={{ width: '60px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center', fontSize: '10px' }}
                          />
                          <span>to</span>
                          <input
                            type="text"
                            value={info.end}
                            onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                            style={{ width: '60px', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center', fontSize: '10px' }}
                          />
                        </div>
                      ) : (
                        <span style={{ color: '#f43f5e', fontWeight: 600 }}>Closed</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DEGREE SELECTION OVERLAY MODAL - Matches "MBBS" right dialog popup */}
      {showDegreeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(2, 13, 32, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            className="animate-slide-up"
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '520px',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowDegreeModal(false)}
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ color: '#0c1a30', fontSize: '18px', fontWeight: 700, marginBottom: '24px', fontFamily: 'Outfit, sans-serif' }}>
              Add Academic Degree
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>Degree Type</label>
                  <select value={newDegreeName} onChange={(e) => setNewDegreeName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }}>
                    <option>MBBS</option>
                    <option>MD</option>
                    <option>MS</option>
                    <option>DNB</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>Specialization</label>
                  <input type="text" value={newDegreeSpec} onChange={(e) => setNewDegreeSpec(e.target.value)} placeholder="e.g. Cardiology" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>Medical College Name</label>
                <input type="text" value={newDegreeCollege} onChange={(e) => setNewDegreeCollege(e.target.value)} placeholder="Grant Medical College" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>University Name</label>
                <input type="text" value={newDegreeUniv} onChange={(e) => setNewDegreeUniv(e.target.value)} placeholder="State Medical University" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>Country</label>
                  <input type="text" value={newDegreeCountry} onChange={(e) => setNewDegreeCountry(e.target.value)} placeholder="India" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ color: '#475569', fontSize: '11px', fontWeight: 600 }}>Year of Passing</label>
                  <select value={newDegreeYear} onChange={(e) => setNewDegreeYear(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }}>
                    <option>2010</option>
                    <option>2012</option>
                    <option>2014</option>
                    <option>2016</option>
                    <option>2018</option>
                    <option>2020</option>
                    <option>2022</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddDegree}
                style={{
                  background: '#4a7cff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Add Degrees
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS styling overrides for responsiveness */}
      <style>{`
        @media (max-width: 992px) {
          .opd-grid-setup {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default DoctorSetupWizard;
