import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import { useNavigate } from 'react-router-dom';
import { VyasaLogo } from '../components/Icons';
import { Check, Upload } from 'lucide-react';

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

export const HospitalSetupWizard: React.FC = () => {
  const { completeHospitalOnboarding } = useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  // Full 5-Step tab wizard flow kept completely intact
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Sub-steps inside Institutional Details (Tab 1)
  const [instSubStep, setInstSubStep] = useState<1 | 2 | 3>(1);

  // Sub-steps inside Add Doctor (Tab 2) - Matches new Figma photo workflow!
  const [docSubStep, setDocSubStep] = useState<1 | 2 | 3>(1);

  // STEP 1 - SUB-STEP 1: Institutional Details States
  const [institutionName, setInstitutionName] = useState('');
  const [establishmentDate, setEstablishmentDate] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [selectedService, setSelectedService] = useState('OPD');

  const [docOpdTimings, setDocOpdTimings] = useState('');
  const [docConsultationFee, setDocConsultationFee] = useState('');

  // STEP 2: Attached Doctor States (Used in Tab 1 step 2 AND Tab 2 multi-step wizard)
  const [docTitle, setDocTitle] = useState('');
  const [docName, setDocName] = useState('');
  const [docDob, setDocDob] = useState('');
  const [docGender, setDocGender] = useState('');
  const [docPhone, setDocPhone] = useState('');
  const [docCountry, setDocCountry] = useState('India');
  const [docDistrict, setDocDistrict] = useState('');
  const [docPinCode, setDocPinCode] = useState('');

  const [docDegree, setDocDegree] = useState('MBBS');
  const [docCollege, setDocCollege] = useState('');
  const [docUniversity, setDocUniversity] = useState('');
  const [docYearPassing, setDocYearPassing] = useState('2018');
  const [docDesignation, setDocDesignation] = useState('');
  const [docSpeciality, setDocSpeciality] = useState('');
  const [docDept, setDocDept] = useState('');

  const [docRegNum, setDocRegNum] = useState('');
  const [docCouncilType, setDocCouncilType] = useState('State Council');
  const [docRegDate, setDocRegDate] = useState('');
  const [docValidUpto, setDocValidUpto] = useState('');
  const [docRegCountry, setDocRegCountry] = useState('India');

  // Attached Doctors list for backend sync
  const [doctors, setDoctors] = useState<AttachedDoctor[]>([]);

  // STEP 3: Nurse Onboarding (Multi-step wizard)
  const [nurseSubStep, setNurseSubStep] = useState<1 | 2 | 3 | 4>(1);
  const [nurses, setNurses] = useState<{ name: string; phone: string; shift: string }[]>([
    { name: 'Nurse Clara Barton', phone: '+15554445555', shift: 'Day Shift' }
  ]);
  
  // Nurse Form States
  const [nurseName, setNurseName] = useState('');
  const [nurseMobile, setNurseMobile] = useState('');
  const [nurseDob, setNurseDob] = useState('');
  const [nurseAddress, setNurseAddress] = useState('');
  const [nurseGender, setNurseGender] = useState('');

  const [nurseDegree, setNurseDegree] = useState('GNM');
  const [nurseRegNum, setNurseRegNum] = useState('');
  const [nurseCouncil, setNurseCouncil] = useState('');
  const [nurseRegDateOpt, setNurseRegDateOpt] = useState('');
  const [nurseValidUptoOpt, setNurseValidUptoOpt] = useState('');
  const [nurseLocation, setNurseLocation] = useState('');
  const [nurseSpeciality, setNurseSpeciality] = useState('');

  const [nurseRegNum2, setNurseRegNum2] = useState('');
  const [nurseCouncilType, setNurseCouncilType] = useState('');
  const [nurseRegDate, setNurseRegDate] = useState('');
  const [nurseValidUpto, setNurseValidUpto] = useState('');
  const [nurseCountry, setNurseCountry] = useState('');

  const [nurseExperienceYears, setNurseExperienceYears] = useState('');
  const [nurseCurrentType, setNurseCurrentType] = useState('');
  const [nurseExperienceRegDate, setNurseExperienceRegDate] = useState('');

  // STEP 4: Other Staff Onboarding (Dynamic multi-role wizard)
  const [otherStaff, setOtherStaff] = useState<{ name: string; phone: string; role: string }[]>([
    { name: 'John Doe', phone: '+15553332222', role: 'Pharmacist' }
  ]);
  const [staffRole, setStaffRole] = useState<'pharmacy' | 'lab' | 'admin' | null>(null);
  const [labSubStep, setLabSubStep] = useState<1 | 2>(1);

  // Admin form states
  const [adminName, setAdminName] = useState('');
  const [adminAge, setAdminAge] = useState('');
  const [adminGender, setAdminGender] = useState('');
  const [adminDob, setAdminDob] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminAddress, setAdminAddress] = useState('');
  const [adminDept, setAdminDept] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('');

  // Lab form states
  const [labName, setLabName] = useState('');
  const [labType, setLabType] = useState('');
  const [labPathology, setLabPathology] = useState('');
  const [labBiochem, setLabBiochem] = useState('');
  const [labAddress, setLabAddress] = useState('');
  const [labRegNo, setLabRegNo] = useState('');
  const [labUpload, setLabUpload] = useState('');
  const [labGst, setLabGst] = useState('');
  const [labPhone, setLabPhone] = useState('');
  const [labEmail, setLabEmail] = useState('');
  const [labContactPerson, setLabContactPerson] = useState('');

  // Pharmacy form states
  const [pharmName, setPharmName] = useState('');
  const [pharmAddress, setPharmAddress] = useState('');
  const [pharmRegNo, setPharmRegNo] = useState('');
  const [pharmGst, setPharmGst] = useState('');
  const [pharmPharmacistRegNo, setPharmPharmacistRegNo] = useState('');
  const [pharmUpload, setPharmUpload] = useState('');
  const [pharmNo, setPharmNo] = useState('');

  // STEP 5: Cashless Insurances
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>(['Star Health Insurance', 'HDFC Ergo']);

  const servicesList = ['OPD', 'Emergency', 'Pediatrics', 'ICU', 'Cardiology', 'Radiology', 'Pharmacy', 'Laboratory'];

  const insurancesList = [
    { name: 'Star Health Insurance', desc: '77% Star Health Insurance' },
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

  const handleAttachNurseSubmit = () => {
    if (!nurseName || !nurseMobile) {
      addToast('Please complete nurse name and mobile number.', 'warning');
      return;
    }

    const newNurse = {
      name: nurseName,
      phone: nurseMobile,
      shift: 'Day Shift'
    };

    setNurses([...nurses, newNurse]);
    addToast(`Nurse ${nurseName} successfully attached to hospital board!`, 'success');

    // Reset fields
    setNurseName('');
    setNurseMobile('');
    setNurseDob('');
    setNurseAddress('');
    setNurseGender('');
    setNurseDegree('GNM');
    setNurseRegNum('');
    setNurseCouncil('');
    setNurseRegDateOpt('');
    setNurseValidUptoOpt('');
    setNurseLocation('');
    setNurseSpeciality('');
    setNurseRegNum2('');
    setNurseCouncilType('');
    setNurseRegDate('');
    setNurseValidUpto('');
    setNurseCountry('');
    setNurseExperienceYears('');
    setNurseCurrentType('');
    setNurseExperienceRegDate('');

    setNurseSubStep(1); // Stays on Add Nurse tab and resets sub-step to 1
  };



  const handleAttachStaffSubmit = () => {
    let name = '';
    let phone = '';
    let roleLabel = '';

    if (staffRole === 'admin') {
      if (!adminName || !adminPhone) {
        addToast('Please enter admin name and phone number.', 'warning');
        return;
      }
      name = adminName;
      phone = adminPhone;
      roleLabel = 'Admin';
    } else if (staffRole === 'lab') {
      if (!labName || !labPhone) {
        addToast('Please enter lab name and phone number.', 'warning');
        return;
      }
      name = labName;
      phone = labPhone;
      roleLabel = `Lab ${labUpload ? '(with cert)' : ''}`;
    } else if (staffRole === 'pharmacy') {
      if (!pharmName || !pharmNo) {
        addToast('Please enter pharmacy name and contact number.', 'warning');
        return;
      }
      name = pharmName;
      phone = pharmNo;
      roleLabel = 'Pharmacy';
    } else {
      addToast('No role selected.', 'error');
      return;
    }

    setOtherStaff([...otherStaff, { name, phone, role: roleLabel }]);
    addToast(`${roleLabel} staff successfully attached to hospital board!`, 'success');

    // Reset all form fields
    setAdminName('');
    setAdminAge('');
    setAdminGender('');
    setAdminDob('');
    setAdminPhone('');
    setAdminEmail('');
    setAdminAddress('');
    setAdminDept('');
    setAdminDesignation('');

    setLabName('');
    setLabType('');
    setLabPathology('');
    setLabBiochem('');
    setLabAddress('');
    setLabRegNo('');
    setLabUpload('');
    setLabGst('');
    setLabPhone('');
    setLabEmail('');
    setLabContactPerson('');

    setPharmName('');
    setPharmAddress('');
    setPharmRegNo('');
    setPharmGst('');
    setPharmPharmacistRegNo('');
    setPharmUpload('');
    setPharmNo('');

    setLabSubStep(1);
    setStaffRole(null); // Go back to role selector
  };

  // Submit doctor from wizard, resets form, and keeps user on Tab 2
  const handleAttachDoctorSubmit = () => {
    if (!docName || !docPhone || !docRegNum) {
      addToast('Please complete doctor name, phone, and registration number.', 'warning');
      return;
    }

    const doctor: AttachedDoctor = {
      title: docTitle,
      name: docName,
      dob: docDob || '1985-01-01',
      gender: docGender,
      phone: docPhone,
      country: docCountry || 'India',
      district: docDistrict || 'Default',
      pinCode: docPinCode || '400001',
      degree: docDegree,
      college: docCollege || 'Medical College',
      university: docUniversity || 'State University',
      yearOfPassing: docYearPassing,
      designation: docDesignation || 'Consultant',
      speciality: docSpeciality || 'General Medicine',
      department: docDept || 'Outpatient Unit',
      registrationNumber: docRegNum,
      councilType: docCouncilType,
      registrationDate: docRegDate || '2010-01-01',
      validUpto: docValidUpto || '2035-01-01',
      regCountry: docRegCountry || 'India'
    };

    setDoctors([...doctors, doctor]);
    addToast(`Dr. ${docName} successfully attached to hospital board! Select the next tab above to proceed.`, 'success');
    
    // Reset Form Fields
    setDocName('');
    setDocPhone('');
    setDocDesignation('');
    setDocDept('');
    setDocRegNum('');
    setDocRegDate('');
    setDocValidUpto('');
    setDocCollege('');
    setDocUniversity('');

    setDocSubStep(1); // Stay on Add Doctor page and reset sub-step to 1!
  };

  const handleCompleteSetup = async () => {
    if (selectedInsurances.length === 0) {
      addToast('Please select at least one supporting insurance partner.', 'warning');
      return;
    }

    try {
      const onboardingData = {
        institutionName,
        legalStatus: 'Pvt Ltd',
        establishmentYears: establishmentDate || '5-10 Years',
        licenseNumber,
        gstNumber,
        servicesOffered: [selectedService],
        attachedDoctors: doctors.length > 0 ? doctors : [
          {
            title: 'Dr.',
            name: 'Sarah Jenkins',
            dob: '1985-06-12',
            gender: 'Female',
            phone: '+15559876543',
            country: 'India',
            district: 'Mumbai',
            pinCode: '400001',
            degree: 'MBBS, MD',
            college: 'Grant Medical College',
            university: 'MUHS',
            yearOfPassing: '2012',
            designation: 'Senior Consultant',
            speciality: 'Cardiology',
            department: 'Cardiology Unit',
            registrationNumber: 'MCI-12345',
            councilType: 'State Medical Council',
            registrationDate: '2012-08-20',
            validUpto: '2032-08-20',
            regCountry: 'India'
          }
        ],
        attachedNurses: nurses,
        attachedStaff: otherStaff,
        supportedInsurances: selectedInsurances
      };

      await completeHospitalOnboarding(onboardingData);
      addToast('Hospital Onboarding Setup completed!', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Error saving institution profile.', 'error');
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
      {/* Background decorations */}
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
        {/* VYASA brand header inside card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
          <VyasaLogo style={{ width: '40px', height: '40px' }} />
          <h1 style={{ color: '#0066ff', fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '1.5px', margin: 0 }}>
            VYASA
          </h1>
        </div>

        {/* Step headers matching active screen layouts */}
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: '#0c1a30', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: '0 0 4px 0' }}>
                {currentStep === 1 && instSubStep === 1 && 'Institution / Clinic Registration'}
                {currentStep === 1 && instSubStep === 2 && 'Attached Doctors'}
                {currentStep === 1 && instSubStep === 3 && 'Insurance Companies'}
                
                {currentStep === 2 && docSubStep === 1 && 'Add Doctor Personal Information'}
                {currentStep === 2 && docSubStep === 2 && 'Qualification Details'}
                {currentStep === 2 && docSubStep === 3 && 'Registration Details'}

                {currentStep === 3 && nurseSubStep === 1 && 'Add Nurse Personal Information'}
                {currentStep === 3 && nurseSubStep === 2 && 'Qualification Details'}
                {currentStep === 3 && nurseSubStep === 3 && 'Registration Details'}
                {currentStep === 3 && nurseSubStep === 4 && 'Experience'}

                {currentStep === 4 && staffRole === null && 'Add Other Staff'}
                {currentStep === 4 && staffRole === 'admin' && 'Add Admin (Institutional Owner)'}
                {currentStep === 4 && staffRole === 'pharmacy' && 'Pharmacy Login'}
                {currentStep === 4 && staffRole === 'lab' && labSubStep === 1 && 'Add Lab / Investigation Center'}
                {currentStep === 4 && staffRole === 'lab' && labSubStep === 2 && 'Add Lab Document'}

                {currentStep === 5 && 'Insurance Companies'}
              </h2>
              <p style={{ color: '#5e6e85', fontSize: '12px', fontWeight: 500, margin: 0 }}>
                {currentStep === 2 || currentStep === 3 || currentStep === 4 ? 'Enter nurse details to register and manage care efficiently' : 'Register your medical institution and configure services'}
              </p>
            </div>
            {currentStep === 1 && instSubStep === 1 && (
              <button
                type="button"
                style={{
                  background: '#eef2ff',
                  color: '#4a7cff',
                  border: '1.5px solid #c3d4ff',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Upload size={14} />
                <span>Upload Excel/Cvs</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 OPTIONS / TABS (Stays active on Add Doctor Tab 2 during sub-steps) */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', width: '100%', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
          {[
            { id: 1, label: 'Institutional Details' },
            { id: 2, label: 'Add Doctor' },
            { id: 3, label: 'Add Nurse' },
            { id: 4, label: 'Add Other Staff' },
            { id: 5, label: 'Add Insurance' }
          ].map(tab => {
            const isActive = currentStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentStep(tab.id as any);
                  if (tab.id === 1) setInstSubStep(1);
                  if (tab.id === 2) setDocSubStep(1);
                  if (tab.id === 3) setNurseSubStep(1);
                  if (tab.id === 4) setStaffRole(null);
                }}
                style={{
                  background: isActive ? '#0066ff' : '#ffffff',
                  color: isActive ? '#ffffff' : '#5e6e85',
                  border: isActive ? 'none' : '1.5px solid #cbd5e1',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 10px rgba(0, 102, 255, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Progress indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
            {currentStep === 1 && instSubStep === 1 && '34% completed'}
            {currentStep === 1 && instSubStep === 2 && '67% completed'}
            {currentStep === 1 && instSubStep === 3 && '84% completed'}
            
            {currentStep === 2 && docSubStep === 1 && '0% completed'}
            {currentStep === 2 && docSubStep === 2 && '50% completed'}
            {currentStep === 2 && docSubStep === 3 && '90% completed'}

            {currentStep === 3 && nurseSubStep === 1 && '0% completed'}
            {currentStep === 3 && nurseSubStep === 2 && '33% completed'}
            {currentStep === 3 && nurseSubStep === 3 && '66% completed'}
            {currentStep === 3 && nurseSubStep === 4 && '90% completed'}

            {currentStep === 4 && staffRole === null && '0% completed'}
            {currentStep === 4 && staffRole === 'admin' && '50% completed'}
            {currentStep === 4 && staffRole === 'pharmacy' && '50% completed'}
            {currentStep === 4 && staffRole === 'lab' && labSubStep === 1 && '33% completed'}
            {currentStep === 4 && staffRole === 'lab' && labSubStep === 2 && '75% completed'}

            {currentStep === 5 && '84% completed'}
          </span>
          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: currentStep === 1 && instSubStep === 1 ? '34%'
                      : currentStep === 1 && instSubStep === 2 ? '67%'
                      : currentStep === 1 && instSubStep === 3 ? '84%'
                      : currentStep === 2 && docSubStep === 1 ? '5%'
                      : currentStep === 2 && docSubStep === 2 ? '50%'
                      : currentStep === 2 && docSubStep === 3 ? '90%'
                      : currentStep === 3 && nurseSubStep === 1 ? '5%'
                      : currentStep === 3 && nurseSubStep === 2 ? '33%'
                      : currentStep === 3 && nurseSubStep === 3 ? '66%'
                      : currentStep === 3 && nurseSubStep === 4 ? '90%'
                      : currentStep === 4 && staffRole === null ? '5%'
                      : currentStep === 4 && staffRole === 'admin' ? '50%'
                      : currentStep === 4 && staffRole === 'pharmacy' ? '50%'
                      : currentStep === 4 && staffRole === 'lab' && labSubStep === 1 ? '33%'
                      : currentStep === 4 && staffRole === 'lab' && labSubStep === 2 ? '75%'
                      : '84%',
                height: '100%',
                background: '#0066ff',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>

        {/* TAB 1: INSTITUTIONAL DETAILS */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* SUB-STEP 1 */}
            {instSubStep === 1 && (
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => {
                      if (!institutionName) {
                        addToast('Please enter the clinic name.', 'warning');
                        return;
                      }
                      setInstSubStep(2);
                    }}
                    style={{
                      background: '#4a7cff',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(74, 124, 255, 0.25)',
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 2 */}
            {instSubStep === 2 && (
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setInstSubStep(1)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!docName || !docPhone) {
                        addToast('Please complete doctor name and phone number.', 'warning');
                        return;
                      }
                      // Temporary attach
                      const doctor: AttachedDoctor = {
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
                      setDoctors([...doctors, doctor]);
                      setInstSubStep(3);
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

            {/* SUB-STEP 3 */}
            {instSubStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {insurancesList.map(ins => {
                    const isSelected = selectedInsurances.includes(ins.name);
                    return (
                      <div
                        key={ins.name}
                        onClick={() => handleToggleInsurance(ins.name)}
                        style={{
                          border: isSelected ? '2px solid #4a7cff' : '1.5px solid #cbd5e1',
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
                          color: '#4a7cff',
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
                  <button onClick={() => setInstSubStep(2)} style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button
                    onClick={handleCompleteSetup}
                    style={{
                      background: '#4a7cff',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 32px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(74, 124, 255, 0.25)',
                    }}
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADD DOCTOR (Dynamic 3-Step nested flow keeping active Tab 2!) */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* SUB-STEP 1: Doctor Personal Information */}
            {docSubStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Title</label>
                    <select 
                      value={docTitle} 
                      onChange={(e) => setDocTitle(e.target.value)} 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: docTitle ? '#0f172a' : '#94a3b8' }}
                    >
                      <option value="">Select your title</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={docName} 
                      onChange={(e) => setDocName(e.target.value)} 
                      placeholder="Enter a full Name" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Birth</label>
                    <input 
                      type="date" 
                      value={docDob} 
                      onChange={(e) => setDocDob(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Gender</label>
                    <select 
                      value={docGender} 
                      onChange={(e) => setDocGender(e.target.value)} 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: docGender ? '#0f172a' : '#94a3b8' }}
                    >
                      <option value="">Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      value={docPhone} 
                      onChange={(e) => setDocPhone(e.target.value)} 
                      placeholder="Enter your phone" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Country</label>
                    <select 
                      value={docCountry} 
                      onChange={(e) => setDocCountry(e.target.value)} 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: docCountry ? '#0f172a' : '#94a3b8' }}
                    >
                      <option value="">your answer</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>

                  {/* Row 3 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>City / District</label>
                    <select 
                      value={docDistrict} 
                      onChange={(e) => setDocDistrict(e.target.value)} 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none', color: docDistrict ? '#0f172a' : '#94a3b8' }}
                    >
                      <option value="">your answer</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Pin Code</label>
                    <input 
                      type="text" 
                      value={docPinCode} 
                      onChange={(e) => setDocPinCode(e.target.value)} 
                      placeholder="Enter Pin Code" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Empty cell to preserve clean 3-col format */}
                  <div></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!docName || !docPhone) {
                        addToast('Please enter doctor name and phone number to proceed.', 'warning');
                        return;
                      }
                      setDocSubStep(2);
                    }} 
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 2: Qualification Details */}
            {docSubStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Degree</label>
                    <select 
                      value={docDegree} 
                      onChange={(e) => setDocDegree(e.target.value)} 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', fontSize: '13px', outline: 'none' }}
                    >
                      <option value="">Enter a full Name</option>
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>College Name</label>
                    <input 
                      type="text" 
                      value={docCollege} 
                      onChange={(e) => setDocCollege(e.target.value)} 
                      placeholder="Enter a Mobile Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>University Name</label>
                    <input 
                      type="date" 
                      value={docUniversity} 
                      onChange={(e) => setDocUniversity(e.target.value)} 
                      placeholder="DD/MM/YYYY" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Year of Passing</label>
                    <input 
                      type="text" 
                      value={docYearPassing} 
                      onChange={(e) => setDocYearPassing(e.target.value)} 
                      placeholder="Enter a license Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Designation</label>
                    <input 
                      type="text" 
                      value={docDesignation} 
                      onChange={(e) => setDocDesignation(e.target.value)} 
                      placeholder="Enter a GST Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Speciality</label>
                    <input 
                      type="text" 
                      value={docSpeciality} 
                      onChange={(e) => setDocSpeciality(e.target.value)} 
                      placeholder="Enter a GST Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 3 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Department</label>
                    <input 
                      type="text" 
                      value={docDept} 
                      onChange={(e) => setDocDept(e.target.value)} 
                      placeholder="Enter a GST Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Empty cells to preserve clean 3-col format */}
                  <div></div>
                  <div></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button type="button" onClick={() => setDocSubStep(1)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button type="button" onClick={() => setDocSubStep(3)} style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 3: Registration Details */}
            {docSubStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Number</label>
                    <input 
                      type="text" 
                      value={docRegNum} 
                      onChange={(e) => setDocRegNum(e.target.value)} 
                      placeholder="Enter a Full Name" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Council Type</label>
                    <input 
                      type="text" 
                      value={docCouncilType} 
                      onChange={(e) => setDocCouncilType(e.target.value)} 
                      placeholder="Enter a Mobile Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Date</label>
                    <input 
                      type="date" 
                      value={docRegDate} 
                      onChange={(e) => setDocRegDate(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Valid Upto</label>
                    <input 
                      type="date" 
                      value={docValidUpto} 
                      onChange={(e) => setDocValidUpto(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Country</label>
                    <input 
                      type="text" 
                      value={docRegCountry} 
                      onChange={(e) => setDocRegCountry(e.target.value)} 
                      placeholder="Enter a GST Number" 
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
                  <button type="button" onClick={() => setDocSubStep(2)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button 
                    type="button" 
                    onClick={handleAttachDoctorSubmit} 
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: ADD NURSE (Dynamic 4-Step nested flow keeping active Tab 3!) */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* SUB-STEP 1: Nurse Personal Information */}
            {nurseSubStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
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

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Home Address</label>
                    <input 
                      type="text" 
                      value={nurseAddress} 
                      onChange={(e) => setNurseAddress(e.target.value)} 
                      placeholder="Enter a license Number" 
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
                      <option value="">Enter a GST Number</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Empty cell to preserve clean 3-col format */}
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
                      setNurseSubStep(2);
                    }} 
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 2: Qualification Details */}
            {nurseSubStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
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
                      placeholder="Enter a Full Name" 
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

                  {/* Row 2 */}
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
                      placeholder="Select your licensing board" 
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

                  {/* Row 3 */}
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

                  {/* Empty cell */}
                  <div></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button type="button" onClick={() => setNurseSubStep(1)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button type="button" onClick={() => setNurseSubStep(3)} style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 3: Registration Details */}
            {nurseSubStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Number</label>
                    <input 
                      type="text" 
                      value={nurseRegNum2} 
                      onChange={(e) => setNurseRegNum2(e.target.value)} 
                      placeholder="Enter a Full Name" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Council Type</label>
                    <input 
                      type="text" 
                      value={nurseCouncilType} 
                      onChange={(e) => setNurseCouncilType(e.target.value)} 
                      placeholder="Enter a Mobile Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Date</label>
                    <input 
                      type="date" 
                      value={nurseRegDate} 
                      onChange={(e) => setNurseRegDate(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Valid Upto</label>
                    <input 
                      type="date" 
                      value={nurseValidUpto} 
                      onChange={(e) => setNurseValidUpto(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Country</label>
                    <input 
                      type="text" 
                      value={nurseCountry} 
                      onChange={(e) => setNurseCountry(e.target.value)} 
                      placeholder="Enter a GST Number" 
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
                  <button type="button" onClick={() => setNurseSubStep(2)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button type="button" onClick={() => setNurseSubStep(4)} style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 4: Experience */}
            {nurseSubStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Year of Experience</label>
                    <input 
                      type="text" 
                      value={nurseExperienceYears} 
                      onChange={(e) => setNurseExperienceYears(e.target.value)} 
                      placeholder="Enter a full Name" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Current Type</label>
                    <input 
                      type="text" 
                      value={nurseCurrentType} 
                      onChange={(e) => setNurseCurrentType(e.target.value)} 
                      placeholder="Enter a Mobile Number" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Registration Date</label>
                    <input 
                      type="date" 
                      value={nurseExperienceRegDate} 
                      onChange={(e) => setNurseExperienceRegDate(e.target.value)} 
                      placeholder="DD/MM/YYYY"
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button type="button" onClick={() => setNurseSubStep(3)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                  <button 
                    type="button" 
                    onClick={handleAttachNurseSubmit} 
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: ADD OTHER STAFF (Dynamic 3-role wizard system!) */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* ROLE SELECTOR (Shown if staffRole is null) */}
            {staffRole === null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', padding: '20px 0' }} className="animate-fade-in">
                <span style={{ fontSize: '14px', color: '#475569', fontWeight: 600 }}>Choose a staff role to register:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', width: '100%', maxWidth: '540px' }}>
                  {[
                    { id: 'pharmacy', title: 'Pharmacy', desc: 'Pharmacy details, license, and pharmacist registries.' },
                    { id: 'lab', title: 'Laboratory', desc: 'Investigation units, pathological & micro registries.' },
                    { id: 'admin', title: 'Administrator', desc: 'Institutional owners & administrative profiles.' }
                  ].map(role => (
                    <div 
                      key={role.id}
                      onClick={() => {
                        setStaffRole(role.id as any);
                        setLabSubStep(1);
                      }}
                      style={{
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '16px',
                        padding: '20px 16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        background: '#ffffff',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0066ff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>{role.title}</span>
                      <span style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>{role.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BACK TO ROLE SELECTOR BUTTON (Rendered above active forms if role chosen) */}
            {staffRole !== null && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
                <button 
                  onClick={() => setStaffRole(null)}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  ← Select Another Role
                </button>
              </div>
            )}

            {/* ROLE A: ADMIN WORKFLOW (1 Step) */}
            {staffRole === 'admin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  {/* Row 1 */}
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

                  {/* Row 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date of Birth</label>
                    <input 
                      type="date" 
                      value={adminDob} 
                      onChange={(e) => setAdminDob(e.target.value)} 
                      placeholder="DD/MM/YYYY" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Phone No.</label>
                    <input 
                      type="tel" 
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

                  {/* Row 3 */}
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={handleAttachStaffSubmit}
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* ROLE B: LAB / LABORATORY WORKFLOW (2 Steps) */}
            {staffRole === 'lab' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Lab Step 1 */}
                {labSubStep === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                      {/* Row 1 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Name of Lab / Center</label>
                        <input 
                          type="text" 
                          value={labName} 
                          onChange={(e) => setLabName(e.target.value)} 
                          placeholder="Enter a Full Name" 
                          style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Type of Lab</label>
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

                      {/* Row 2 */}
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
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Address</label>
                        <input 
                          type="text" 
                          value={labAddress} 
                          onChange={(e) => setLabAddress(e.target.value)} 
                          placeholder="Enter a GST Number" 
                          style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                        />
                      </div>

                      {/* Spacer cell */}
                      <div></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (!labName) {
                            addToast('Please enter the name of the laboratory center.', 'warning');
                            return;
                          }
                          setLabSubStep(2);
                        }}
                        style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Lab Step 2 */}
                {labSubStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                      {/* Row 1 */}
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

                      {/* Row 2 */}
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
                      <button type="button" onClick={() => setLabSubStep(1)} style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>Back</button>
                      <button 
                        type="button" 
                        onClick={handleAttachStaffSubmit}
                        style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ROLE C: PHARMACY WORKFLOW (1 Step) */}
            {staffRole === 'pharmacy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 16px' }}>
                  
                  {/* Row 1 */}
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
                      placeholder="DD/MM/YYYY" 
                      style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                    />
                  </div>

                  {/* Row 2 */}
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

                  {/* Row 3 */}
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

                  {/* Spacer cells */}
                  <div></div>
                  <div></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button 
                    type="button" 
                    onClick={handleAttachStaffSubmit}
                    style={{ background: '#0066ff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 36px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0, 102, 255, 0.2)' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* DEFAULT WIZARD NEXT BUTTONS (Only if role selector is showing) */}
            {staffRole === null && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px' }}>
                <button 
                  onClick={() => setCurrentStep(3)} 
                  style={{ background: '#ffffff', color: '#475569', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '12px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Back
                </button>
                <button 
                  onClick={() => setCurrentStep(5)} 
                  style={{ background: '#4a7cff', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: CASHLESS INSURANCES */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {insurancesList.map(ins => {
                const isSelected = selectedInsurances.includes(ins.name);
                return (
                  <div
                    key={ins.name}
                    onClick={() => handleToggleInsurance(ins.name)}
                    style={{
                      border: isSelected ? '2px solid #4a7cff' : '1.5px solid #cbd5e1',
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
                      color: '#4a7cff',
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
              <button
                onClick={() => setCurrentStep(4)}
                style={{
                  background: '#ffffff',
                  color: '#475569',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
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
                  padding: '12px 32px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(74, 124, 255, 0.25)',
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

export default HospitalSetupWizard;
