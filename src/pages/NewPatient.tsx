import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
  ArrowLeft,
  Plus,
  Activity,
  Heart,
  MessageSquare,
  Users as UsersIcon,
  FileText,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Eye,
  Check,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface Patient {
  name: string;
  ehrId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string;
  phone: string;
  insurance: string;
}

interface NewPatientProps {
  initialViewMode?: 'onboarding' | 'past-patient';
  onBack?: () => void;
}

export const NewPatient: React.FC<NewPatientProps> = ({ initialViewMode = 'onboarding', onBack }) => {
  const { user } = useAuthStore();
  const role = user?.role || 'Doctor';

  // Nurse Dashboard specific States
  const [nurseActiveTab, setNurseActiveTab] = useState<'IPD' | 'OPD' | 'Discharged' | 'Death'>('IPD');
  const [nurseSearchQuery, setNurseSearchQuery] = useState('');

  // Navigation: 'onboarding' | 'past-patient'
  const [viewMode, setViewMode] = useState<'onboarding' | 'past-patient'>(initialViewMode);
  
  // Tab within Past Patient workflow
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<
    'Summary' | 'History' | 'Medication' | 'Complaints' | 'Vitals' | 'Lab' | 'Radiology' | 'Admission' | 'Procedures' | 'CarePlan' | 'Alerts'
  >('Summary');

  // Interactive states
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Registration Form States
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formGender, setFormGender] = useState('Male');
  const [formPhone, setFormPhone] = useState('');
  const [formBlood, setFormBlood] = useState('O+');
  const [formAllergies, setFormAllergies] = useState('');
  const [registeredPatients, setRegisteredPatients] = useState<Patient[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const mockPastPatient: Patient = {
    name: 'Rohit Sharma',
    ehrId: 'EHR-00024',
    age: 23,
    gender: 'Male',
    bloodGroup: 'A+',
    allergies: 'None Known',
    phone: '+91 9876543210',
    insurance: 'RES0005030 - Active'
  };

  const nursePatients = [
    {
      id: 'n1',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00024',
      age: 23,
      gender: 'Male',
      type: 'IPD' as const,
      location: 'Ward/Bed-ICU/A-4',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'n2',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00025',
      age: 23,
      gender: 'Male',
      type: 'IPD' as const,
      location: 'Ward/Bed-ICU/A-4',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'n3',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'IPD' as const,
      location: 'Ward/Bed-ICU/A-4',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'n4',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00027',
      age: 23,
      gender: 'Male',
      type: 'IPD' as const,
      location: 'Ward/Bed-ICU/A-4',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'n5',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00025',
      age: 23,
      gender: 'Male',
      type: 'OPD' as const,
      location: 'OPD',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'n6',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'Discharged' as const,
      location: 'Ward B-5',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    }
  ];

  const filteredNursePatients = nursePatients
    .filter(p => p.type === nurseActiveTab)
    .filter(p => p.name.toLowerCase().includes(nurseSearchQuery.toLowerCase()) || p.ehrId.toLowerCase().includes(nurseSearchQuery.toLowerCase()));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formAge) return;

    const newPatient: Patient = {
      name: formName,
      ehrId: `EHR-00${Math.floor(1000 + Math.random() * 9000)}`,
      age: parseInt(formAge),
      gender: formGender,
      bloodGroup: formBlood,
      allergies: formAllergies || 'None Known',
      phone: formPhone || '+91 9999999999',
      insurance: 'Pending Verification'
    };

    setRegisteredPatients([newPatient, ...registeredPatients]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);

    // Reset Form
    setFormName('');
    setFormAge('');
    setFormPhone('');
    setFormAllergies('');
  };

  // Zoom/Pan helpers for Radiology X-ray & Coronary Angiogram
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', animation: 'fade-in 0.3s ease', position: 'relative' }}>
      
      {/* Toast Notification for Registration */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: '#10b981',
          color: '#ffffff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <ShieldCheck size={24} />
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px' }}>Patient Registered Successfully</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.9 }}>EHR record created & queued for triage.</p>
          </div>
        </div>
      )}

      {/* Mode A: New Patient Landing & Registration Onboarding */}
      {viewMode === 'onboarding' && (
        role === 'Nurse' ? (
          /* Nurse Patient Grid View (Mockup #32 layout rules) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Title Block */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0c1a30', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
                  My Patients
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                  Manage and monitor patient records in real-time
                </p>
              </div>
              <button disabled style={{
                background: '#c4b5a6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: 0.8
              }}>
                <Plus size={16} />
                <span>New Patient</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }} className="flex-responsive">
              
              {/* Search Box */}
              <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search Patients by Name or EHR..."
                  value={nurseSearchQuery}
                  onChange={(e) => setNurseSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 38px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    fontWeight: 500,
                    outline: 'none'
                  }}
                />
              </div>

              {/* Tab Switch Pills */}
              <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                {(['IPD', 'OPD', 'Discharged', 'Death'] as const).map((tab) => {
                  const isActive = nurseActiveTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setNurseActiveTab(tab)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: isActive ? '#4a7cff' : 'transparent',
                        color: isActive ? '#ffffff' : '#64748b',
                        transition: 'all 0.2s'
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setViewMode('past-patient');
                  setActiveWorkflowTab('Summary');
                }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                View Past Patient
              </button>
            </div>

            {/* Grid of Patient Cards */}
            {filteredNursePatients.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {filteredNursePatients.map((patient) => {
                  const headerBg =
                    patient.type === 'IPD' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' :
                    patient.type === 'OPD' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' :
                    'linear-gradient(135deg, #4f4f4f 0%, #2f2f2f 100%)';

                  return (
                    <div
                      key={patient.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {/* Card Header */}
                      <div style={{ background: headerBg, padding: '16px', color: '#ffffff', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '15px'
                          }}>
                            RS
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{patient.name}</h4>
                            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#cbd5e1', fontWeight: 500 }}>
                              {patient.ehrId} • {patient.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Body Info */}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
                          <div>
                            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Diagnosis</span>
                            <span style={{ color: '#0c1a30', fontWeight: 700 }}>{patient.diagnosis}</span>
                          </div>
                          <div>
                            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Doctor</span>
                            <span style={{ color: '#0c1a30', fontWeight: 700 }}>{patient.doctor}</span>
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Admitted</span>
                            <span style={{ color: '#475569', fontWeight: 600 }}>{patient.admittedDate}</span>
                          </div>
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '10.5px', textTransform: 'uppercase' }}>Time</span>
                            <span style={{ color: '#475569', fontWeight: 600 }}>{patient.admittedTime}</span>
                          </div>
                        </div>

                        {/* Vitals summary block */}
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #f1f5f9',
                          borderRadius: '8px',
                          padding: '12px',
                          marginTop: '4px',
                          textAlign: 'center'
                        }}>
                          <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Vitals</span>
                          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, fontStyle: 'italic' }}>
                            {patient.type === 'IPD' && 'No vitals recorded yet. Check back after the next assessment.'}
                            {patient.type === 'OPD' && 'No Patient Summary. Check back after the next assessment.'}
                            {patient.type === 'Discharged' && 'No Discharge summary. Check back after the next assessment.'}
                            {(patient.type as string) === 'Death' && 'No Discharge summary. Check back after the next assessment.'}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}>
                        {patient.type === 'IPD' ? (
                          <>
                            <button style={{ ...cardActionBtnStyle, background: '#ef4444', color: '#ffffff', flex: 1 }}>SOS Alert</button>
                            <button
                              onClick={() => {
                                setViewMode('past-patient');
                                setActiveWorkflowTab('Summary');
                              }}
                              style={{ ...cardActionBtnStyle, background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', flex: 1.5 }}
                            >
                              View Profile
                            </button>
                          </>
                        ) : patient.type === 'OPD' ? (
                          <button
                            onClick={() => {
                              setViewMode('past-patient');
                              setActiveWorkflowTab('Summary');
                            }}
                            style={{ ...cardActionBtnStyle, background: '#4a7cff', color: '#ffffff', width: '100%' }}
                          >
                            Consult
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setViewMode('past-patient');
                              setActiveWorkflowTab('Summary');
                            }}
                            style={{ ...cardActionBtnStyle, background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', width: '100%' }}
                          >
                            View Profile
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#64748b', fontSize: '15px', fontWeight: 600 }}>No patients found in this section.</p>
              </div>
            )}
          </div>
        ) : (
          /* Doctor Onboarding Landing View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Header section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0c1a30', margin: '0 0 6px 0', fontFamily: 'Outfit, sans-serif' }}>
                  New Patient Center
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0 }}>
                  Register new incoming patients or access historical records for triage analysis.
                </p>
              </div>

              {/* Quick past patient action button */}
              <button
                onClick={() => {
                  setViewMode('past-patient');
                  setActiveWorkflowTab('Summary');
                }}
                style={{
                  background: '#0c1a30',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(12, 26, 48, 0.15)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <UserCheck size={16} />
                <span>View Past Patient (Rohit Sharma)</span>
              </button>
            </div>

            {/* Cards & Form Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }} className="grid-responsive">
              
              {/* Form Panel */}
              <div style={panelStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                  <Plus style={{ color: '#4a7cff' }} size={24} />
                  <h3 style={{ ...panelTitleStyle, fontSize: '18px', margin: 0 }}>Register New Patient</h3>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }} className="grid-responsive">
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Age <span style={{ color: '#ef4444' }}>*</span></label>
                      <input
                        type="number"
                        placeholder="Years"
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }} className="grid-responsive">
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Gender</label>
                      <select value={formGender} onChange={(e) => setFormGender(e.target.value)} style={selectStyle}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Blood Group</label>
                      <select value={formBlood} onChange={(e) => setFormBlood(e.target.value)} style={selectStyle}>
                        <option>O+</option>
                        <option>O-</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Contact Number</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Allergies / Critical Symptoms</label>
                    <textarea
                      rows={3}
                      placeholder="Describe any known drug allergies or immediate critical complaints..."
                      value={formAllergies}
                      onChange={(e) => setFormAllergies(e.target.value)}
                      style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#4a7cff',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(74, 124, 255, 0.25)',
                      transition: 'background 0.2s',
                      marginTop: '10px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = '#3563df')}
                    onMouseOut={(e) => (e.currentTarget.style.background = '#4a7cff')}
                  >
                    Create EHR Profile & Onboard
                  </button>
                </form>
              </div>

              {/* Quick Action Guides & Recent Onboards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Historical Archive Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  color: '#ffffff',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>View Past Patient Scans</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
                    Analyze vitals trend, medication adherence logs, complaints record, and past radiological scans of previous patients directly.
                  </p>
                  <button
                    onClick={() => {
                      setViewMode('past-patient');
                      setActiveWorkflowTab('Summary');
                    }}
                    style={{
                      background: '#ffffff',
                      color: '#0f172a',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                    onMouseOut={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <Eye size={16} />
                    <span>Access Historical Flow</span>
                  </button>
                </div>

                {/* Recent Onboards list */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Recently Registered (This Session)</h4>
                  {registeredPatients.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {registeredPatients.map((p, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>{p.name}</p>
                            <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{p.ehrId} • {p.age} Yrs • {p.gender}</p>
                          </div>
                          <span style={{ fontSize: '10px', background: '#e0e7ff', color: '#4a7cff', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
                            Onboarded
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px 0', border: '1px dashed #cbd5e1', borderRadius: '12px' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>No patient added yet in this session.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Mode B: Past Patient Workflow (Rohit Sharma - EHR-00024) */}
      {viewMode === 'past-patient' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Row */}
          <button
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                setViewMode('onboarding');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: 700,
              alignSelf: 'flex-start'
            }}
          >
            <ArrowLeft size={16} />
            <span>{onBack ? 'Back to Patients' : 'Back to Registration Center'}</span>
          </button>

          {/* Patient Info Banner Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0c1a30 0%, #1a2f4c 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(12, 26, 48, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#0c1a30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '22px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                RS
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                    {mockPastPatient.name}
                  </h2>
                  <span style={{ background: 'rgba(255, 255, 255, 0.12)', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
                    {mockPastPatient.ehrId}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px', fontSize: '12px', color: '#cbd5e1', fontWeight: 500 }}>
                  <span><strong>Blood Group:</strong> {mockPastPatient.bloodGroup}</span>
                  <span>|</span>
                  <span><strong>Allergies:</strong> <span style={{ color: '#f87171', fontWeight: 700 }}>{mockPastPatient.allergies}</span></span>
                  <span>|</span>
                  <span><strong>Primary Contact:</strong> {mockPastPatient.phone}</span>
                  <span>|</span>
                  <span><strong>Insurance:</strong> <span style={{ color: '#4ade80', fontWeight: 700 }}>{mockPastPatient.insurance}</span></span>
                </div>
              </div>
            </div>

            {/* Context-aware action buttons in patient header banner */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {activeWorkflowTab === 'Radiology' && (
                <button style={actionBtnHeaderStyle}><Plus size={14} /> Add Radiology</button>
              )}
              {activeWorkflowTab === 'Admission' && (
                <button style={actionBtnHeaderStyle}><Plus size={14} /> Add Admission</button>
              )}
              {activeWorkflowTab === 'Procedures' && (
                <button style={actionBtnHeaderStyle}><Plus size={14} /> Add Procedures</button>
              )}
              {activeWorkflowTab === 'CarePlan' && (
                <button style={actionBtnHeaderStyle}><Plus size={14} /> Add Follow Up</button>
              )}
              {activeWorkflowTab === 'Alerts' && (
                <button style={actionBtnHeaderStyle}><Plus size={14} /> Add Alerts</button>
              )}
              
              <button
                onClick={() => setShowSummaryModal(true)}
                style={{
                  background: '#4a7cff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(74, 124, 255, 0.2)'
                }}
              >
                <FileText size={14} />
                <span>Patient Summary</span>
              </button>
            </div>
          </div>

          {/* Workflow Tabs Navbar */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '6px',
            border: '1px solid #e2e8f0',
            gap: '6px'
          }} className="hide-scrollbar">
            {[
              { id: 'Summary', label: 'Patient Summary' },
              { id: 'History', label: 'Past History' },
              { id: 'Medication', label: 'Medication & Adherence' },
              { id: 'Complaints', label: 'Complaints' },
              { id: 'Vitals', label: 'Vitals Trend' },
              { id: 'Lab', label: 'Lab Reports' },
              { id: 'Radiology', label: 'Radiology' },
              { id: 'Admission', label: 'Admission Details' },
              { id: 'Procedures', label: 'Procedures' },
              { id: 'CarePlan', label: 'Follow Up & Care Plan' },
              { id: 'Alerts', label: 'Alerts & Reminders' }
            ].map(tab => {
              const isActive = activeWorkflowTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkflowTab(tab.id as any)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: isActive ? '#4a7cff' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Workflow Views Wrapper */}
          <div style={{ animation: 'fade-in 0.35s ease-out' }}>
            
            {/* TAB 1: Summary */}
            {activeWorkflowTab === 'Summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="grid-responsive">
                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>NCD Status</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>Hypertension / Coronary Artery Disease</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444' }}>High Risk (2.79% daily dev)</span>
                    </div>
                  </div>
                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Last Clinical Visit</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>OPD Cardiology Care Team</p>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#4a7cff', marginTop: '12px' }}>
                      28 May 2026 - Dr. Anil Sharma
                    </div>
                  </div>
                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Recent Lab Orders</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>Lipid Profile & HbA1c</p>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', marginTop: '12px' }}>
                      Completed - Normal Ranges
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="grid-responsive">
                  <div style={panelStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={panelTitleStyle}>EHR Document Summaries</h4>
                      <button onClick={() => setShowSummaryModal(true)} style={panelActionBtnStyle}>Open Directory Modal</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { title: 'Cardiology Past Medical History', date: '12 Oct 2024', tag: 'History' },
                        { title: 'Adherence Trend & Medication Audit', date: '14 Nov 2025', tag: 'Medications' },
                        { title: 'Encounter Clinical Examination Note', date: '18 May 2026', tag: 'Complaints' },
                        { title: 'Chest Radiograph Scan PA View', date: '28 May 2026', tag: 'Radiology' }
                      ].map((item, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: '#f8fafc',
                          borderRadius: '10px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>{item.title}</p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>Recorded on {item.date}</p>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#4a7cff', background: '#eef2ff', padding: '3px 8px', borderRadius: '6px' }}>
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Active Care Coordinators</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#1e40af' }}>AS</div>
                        <div>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>Dr. Anil Sharma</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Lead Cardiologist</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#065f46' }}>AM</div>
                        <div>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>Dr. Arjun Mehta</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Assigned Resident</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Past History */}
            {activeWorkflowTab === 'History' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }} className="grid-responsive">
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Medical History</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Year</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Condition</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Status</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Severity</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Treatment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: '2022', cond: 'Hypertension', status: 'Active (Since 2022)', sev: 'Stage 1', treat: 'Amlodipine 5mg' },
                          { year: '2023', cond: 'Type 2 Diabetes Mellitus', status: 'Controlled (Since 2023)', sev: 'Mild', treat: 'Metformin' },
                          { year: '2024', cond: 'Coronary Artery Disease', status: 'Stable (Post PCI-2024)', sev: 'Severe', treat: 'Clopidogrel' },
                          { year: '2025', cond: 'Hyperlipidemia', status: 'Controlled', sev: 'Moderate', treat: 'Atorvastatin' },
                          { year: '2026', cond: 'Angina Pectoris', status: 'High Risk (Worsening)', sev: 'Severe', treat: 'Glyceryl Trinitrate' }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 700 }}>{row.year}</td>
                            <td style={{ padding: '12px 10px', color: '#0f172a', fontWeight: 700 }}>{row.cond}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{row.status}</td>
                            <td style={{ padding: '12px 10px' }}>
                              <span style={{
                                padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
                                background: row.sev === 'Severe' ? '#fef2f2' : row.sev === 'Moderate' ? '#fffbeb' : '#ecfdf5',
                                color: row.sev === 'Severe' ? '#ef4444' : row.sev === 'Moderate' ? '#d97706' : '#10b981'
                              }}>{row.sev}</span>
                            </td>
                            <td style={{ padding: '12px 10px', color: '#475569', fontWeight: 600 }}>{row.treat}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Lifestyle Factors</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <div style={detailRowStyle}><span>Smoking</span><span style={{ fontWeight: 700 }}>Never Smoked</span></div>
                      <div style={detailRowStyle}><span>Alcohol</span><span style={{ fontWeight: 700 }}>Occasionally</span></div>
                      <div style={detailRowStyle}><span>Diet</span><span style={{ fontWeight: 700 }}>Low Salt, Vegetarian</span></div>
                      <div style={detailRowStyle}><span>Exercise</span><span style={{ fontWeight: 700 }}>Sedentary Lifestyle</span></div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Immunization</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <div style={detailRowStyle}><span>Influenza Vaccine</span><span style={{ color: '#10b981', fontWeight: 700 }}>Received (Oct 2025)</span></div>
                      <div style={detailRowStyle}><span>Pneumococcal Vaccine</span><span style={{ color: '#10b981', fontWeight: 700 }}>Received (May 2024)</span></div>
                      <div style={detailRowStyle}><span>COVID-19 Booster</span><span style={{ color: '#64748b', fontWeight: 600 }}>2 Doses</span></div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Note</h4>
                    <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginTop: '6px', fontStyle: 'italic' }}>
                      Patient is compliant with medication schedule but report sedentary behavior.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Medication & Adherence */}
            {activeWorkflowTab === 'Medication' && (
              role === 'Nurse' ? (
                /* Nurse Medication MAR View (Medication MAR mockup #32 layout rules) */
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                  }}>
                    {/* Pink/Red Gradient Header */}
                    <div style={{
                      background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                      padding: '24px',
                      color: '#ffffff',
                      textAlign: 'left'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '18px'
                        }}>
                          RS
                        </div>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Rohit Sharma</h3>
                          <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.9 }}>EHR-00026</p>
                        </div>
                      </div>
                      <div style={{ marginTop: '16px', fontSize: '13px', fontWeight: 600, display: 'flex', gap: '10px' }}>
                        <span>23M</span>
                        <span>|</span>
                        <span>🩺 Ward/Bed-ICU/A-4</span>
                      </div>
                    </div>

                    {/* Medication List */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      
                      {/* Med 1 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#dbeafe',
                            color: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
                              <line x1="12" y1="6" x2="12" y2="18"></line>
                            </svg>
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Tab. Amlodipine</h4>
                            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>5 mg | Oral | OD</p>
                          </div>
                        </div>
                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>⋮</button>
                      </div>

                      {/* Med 2 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#f3e8ff',
                            color: '#9333ea',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 2l4 4M17 7l3-3M19 9.5L23 12M2 22l6-6M9.5 14.5l4-4M5 16l3-3M6.5 12.5L12 18" />
                            </svg>
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Inj. Labetalol</h4>
                            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>20 mg | IV | SOS</p>
                          </div>
                        </div>
                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>⋮</button>
                      </div>

                      <button style={{
                        background: '#4a7cff',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '14px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(74,124,255,0.2)',
                        marginTop: '10px',
                        textAlign: 'center'
                      }}>
                        Download
                      </button>

                    </div>
                  </div>
                </div>
              ) : (
                /* Doctor Medication & Adherence View */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }} className="grid-responsive">
                    <div style={panelStyle}>
                      <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Current Medications</h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                              <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Medication</th>
                              <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Dose</th>
                              <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Frequency</th>
                              <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>StartDate</th>
                              <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Prescribed By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'Telmisartan', dose: '40 mg', freq: 'Once Daily', date: '12 Oct 2023', doc: 'Dr. Anil Sharma' },
                              { name: 'Aspirin', dose: '75 mg', freq: 'Once Daily', date: '29 Jun 2024', doc: 'Dr. A. Sharma' },
                              { name: 'Atorvastatin', dose: '20 mg', freq: 'Once Daily', date: '24 Aug 2022', doc: 'Dr. A. Sharma' },
                              { name: 'Metformin', dose: '500 mg', freq: 'Twice Daily', date: '12 Jan 2023', doc: 'Dr. A. Sharma' }
                            ].map((med, i) => (
                              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0f172a' }}>{med.name}</td>
                                <td style={{ padding: '12px 10px', color: '#475569' }}>{med.dose}</td>
                                <td style={{ padding: '12px 10px', color: '#475569' }}>{med.freq}</td>
                                <td style={{ padding: '12px 10px', color: '#64748b' }}>{med.date}</td>
                                <td style={{ padding: '12px 10px', color: '#475569', fontWeight: 600 }}>{med.doc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Adherence Gauges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h4 style={panelTitleStyle}>Adherence Overview</h4>
                        
                        {/* Circular Gauge */}
                        <div style={{ position: 'relative', width: '130px', height: '130px', margin: '20px 0' }}>
                          <svg width="130" height="130" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#10b981"
                              strokeWidth="10"
                              strokeDasharray="251.3"
                              strokeDashoffset="45.2" // 82%
                              strokeLinecap="round"
                            />
                          </svg>
                          <div style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center'
                          }}>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0c1a30' }}>82%</p>
                            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>Good</span>
                          </div>
                        </div>
                        
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                          The patient is taking prescribed meds regularly.
                        </p>
                      </div>

                      {/* Adherence Trend SVG chart */}
                      <div style={panelStyle}>
                        <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Adherence Trend (Last 6 Months)</h4>
                        <div style={{ width: '100%', height: '80px', position: 'relative' }}>
                          <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
                            <path d="M 0 50 L 0 35 L 40 45 L 80 20 L 120 15 L 160 30 L 200 10 L 200 60 Z" fill="rgba(74, 124, 255, 0.1)" />
                            <path d="M 0 35 L 40 45 L 80 20 L 120 15 L 160 30 L 200 10" fill="none" stroke="#4a7cff" strokeWidth="2.5" />
                          </svg>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '6px' }}>
                            <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Medication History</h4>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                            <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Medication / Dose</th>
                            <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Status</th>
                            <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Start Date</th>
                            <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Changed Date</th>
                            <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Prescribed By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Amlodipine 5mg', stat: 'Started', start: '12 Oct 2023', change: '12 Oct 2023', doc: 'Dr. A. Sharma' },
                            { name: 'Aspirin 75mg', stat: 'Started', start: '29 Jun 2024', change: '29 Jun 2024', doc: 'Dr. A. Sharma' },
                            { name: 'Metformin 500mg', stat: 'Started', start: '12 Jan 2023', change: '12 Jan 2023', doc: 'Dr. A. Sharma' },
                            { name: 'Atorvastatin 20mg', stat: 'Started', start: '24 Aug 2022', change: '24 Aug 2022', doc: 'Dr. A. Sharma' }
                          ].map((hist, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0f172a' }}>{hist.name}</td>
                              <td style={{ padding: '12px 10px' }}>
                                <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '10.5px', fontWeight: 700 }}>
                                  {hist.stat}
                                </span>
                              </td>
                              <td style={{ padding: '12px 10px', color: '#64748b' }}>{hist.start}</td>
                              <td style={{ padding: '12px 10px', color: '#64748b' }}>{hist.change}</td>
                              <td style={{ padding: '12px 10px', color: '#475569', fontWeight: 600 }}>{hist.doc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* TAB 4: Complaints */}
            {activeWorkflowTab === 'Complaints' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Encounter Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                      <div style={detailRowStyle}><span>Date</span><span style={{ fontWeight: 700 }}>18 May 2026</span></div>
                      <div style={detailRowStyle}><span>Type</span><span style={{ fontWeight: 700 }}>OPD</span></div>
                      <div style={detailRowStyle}><span>Department</span><span style={{ fontWeight: 700 }}>Cardiology</span></div>
                      <div style={detailRowStyle}><span>Doctor</span><span style={{ fontWeight: 700 }}>Dr. Anil Sharma</span></div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Chief Complaints</h4>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', fontWeight: 600, lineHeight: '1.6' }}>
                      • Chest pain on exertion since 3 days<br />
                      • Mild breathlessness
                    </p>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Differential Diagnosis</h4>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', fontWeight: 600, lineHeight: '1.6' }}>
                      1. Unstable Angina<br />
                      2. GERD<br />
                      3. Musculoskeletal Pain
                    </p>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Clinical Examination</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '10px' }}>
                      <div style={vitalMiniStyle}>
                        <span>BP</span>
                        <strong>130/80 mmHg</strong>
                      </div>
                      <div style={vitalMiniStyle}>
                        <span>Pulse</span>
                        <strong>78/min</strong>
                      </div>
                      <div style={vitalMiniStyle}>
                        <span>SpO2</span>
                        <strong>98%</strong>
                      </div>
                      <div style={vitalMiniStyle}>
                        <span>Temp</span>
                        <strong>98.4 F</strong>
                      </div>
                      <div style={vitalMiniStyle}>
                        <span>RR</span>
                        <strong>18/min</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Provisional Diagnosis</h4>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#0c1a30', fontWeight: 700, background: '#fef2f2', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                      Angina Pectoris
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Associated with coronary artery disease.</p>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>History of Present Illness</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                      Patient reports with complaints of chest pain which started 3 days ago. It occurs, particularly, when he is associated with mild exercises. No radiation of pain, but complains of short of breath same since last 2 days.
                    </p>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Plan</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                      <div style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#10b981' }} /><span>ECG</span></div>
                      <div style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#10b981' }} /><span>TMT Test</span></div>
                      <div style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#10b981' }} /><span>Echo</span></div>
                      <div style={{ display: 'flex', gap: '8px' }}><Check size={16} style={{ color: '#10b981' }} /><span>Advice: Avoid Strenuous exercise</span></div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '8px' }}>Doctor's Notes</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic', lineHeight: '1.6' }}>
                      Patient advised for chest pain evaluation and monitoring.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Vitals Trend */}
            {activeWorkflowTab === 'Vitals' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 5 Vitals Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }} className="grid-responsive">
                  {[
                    { label: 'Temperature', val: '130/80', unit: 'mmHg', stat: 'NORMAL', bg: '#f0fdf4', border: '#bbf7d0', color: '#10b981' },
                    { label: 'Blood Pressure', val: '97', unit: 'bpm', stat: 'NORMAL', bg: '#f0fdf4', border: '#bbf7d0', color: '#10b981' },
                    { label: 'Pulse Rate', val: '98.4', unit: '°F', stat: 'NORMAL', bg: '#f0fdf4', border: '#bbf7d0', color: '#10b981' },
                    { label: 'Oxygen Level', val: '98', unit: '%', stat: 'NORMAL', bg: '#f0fdf4', border: '#bbf7d0', color: '#10b981' },
                    { label: 'Respiratory Rate', val: '18', unit: 'bpm', stat: 'NORMAL', bg: '#f0fdf4', border: '#bbf7d0', color: '#10b981' }
                  ].map((vit, i) => (
                    <div key={i} style={{
                      background: vit.bg,
                      border: `1.5px solid ${vit.border}`,
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{vit.label}</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0c1a30', margin: '6px 0 2px 0' }}>{vit.val}</h4>
                      <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{vit.unit}</p>
                      <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 800, color: vit.color, marginTop: '8px', background: '#ffffff', padding: '2px 8px', borderRadius: '12px', border: `1px solid ${vit.border}` }}>
                        {vit.stat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Vitals Trend Line Chart */}
                <div style={panelStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={panelTitleStyle}>Vitals Trend (Last 7 Days)</h4>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Systolic/Diastolic</span>
                  </div>

                  <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Systolic Line (Blue) */}
                      <path d="M 0 50 L 80 48 L 160 55 L 240 40 L 320 38 L 400 45 L 480 30" fill="none" stroke="#4a7cff" strokeWidth="3" />
                      <circle cx="240" cy="40" r="4" fill="#4a7cff" />

                      {/* Diastolic Line (Red) */}
                      <path d="M 0 95 L 80 100 L 160 92 L 240 105 L 320 90 L 400 98 L 480 85" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <circle cx="240" cy="105" r="4" fill="#ef4444" />
                    </svg>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '10px', padding: '0 10px' }}>
                      <span>13 May 2026</span>
                      <span>14 May</span>
                      <span>15 May</span>
                      <span>16 May</span>
                      <span>17 May</span>
                      <span>18 May</span>
                      <span>19 May 2026</span>
                    </div>
                  </div>
                </div>

                {/* Vitals Log Table */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Vitals Log</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Date</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Time</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>BP (mmHg)</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Pulse (/min)</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>SpO2 (%)</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Pulse (/min)</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>SpO2 (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: '18 May 2026', time: '10:00 AM', bp: '130/80', pulse: '88', spo2: '98', p2: '78', s2: '98' },
                          { date: '15 May 2026', time: '02:30 PM', bp: '125/82', pulse: '87', spo2: '98', p2: '78', s2: '98' },
                          { date: '13 May 2026', time: '11:15 AM', bp: '132/80', pulse: '82', spo2: '98', p2: '78', s2: '98' },
                          { date: '11 May 2026', time: '09:30 AM', bp: '128/84', pulse: '87', spo2: '98', p2: '78', s2: '98' }
                        ].map((log, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0f172a' }}>{log.date}</td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{log.time}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 600 }}>{log.bp}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{log.pulse}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{log.spo2}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{log.p2}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{log.s2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Lab Reports */}
            {activeWorkflowTab === 'Lab' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="grid-responsive">
                
                {/* Diabetes Profile */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Diabetes Profile</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Test Name</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Result</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Unit</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Reference Range</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Haemoglobin (HbA1c)', res: '6.5', unit: '%', ref: '5.7-6.4 %', date: '28 May 2026', alert: true },
                          { name: 'FBS', res: '110', unit: 'mg/dL', ref: '70-100', date: '28 May 2026', alert: false },
                          { name: 'PPBS', res: '150', unit: 'mg/dL', ref: '120-140', date: '28 May 2026', alert: true }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 800, color: row.alert ? '#ef4444' : '#0c1a30' }}>
                              {row.res} {row.alert && '🔴'}
                            </td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{row.unit}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{row.ref}</td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Lipid Profile */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Lipid Profile</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Test Name</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Result</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Unit</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Reference Range</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Total Cholesterol', res: '230', unit: 'mg/dL', ref: '< 200', date: '28 May 2026', alert: true },
                          { name: 'HDL', res: '38', unit: 'mg/dL', ref: '> 40', date: '28 May 2026', alert: true },
                          { name: 'LDL', res: '160', unit: 'mg/dL', ref: '< 100', date: '28 May 2026', alert: true },
                          { name: 'Triglycerides', res: '180', unit: 'mg/dL', ref: '< 150', date: '28 May 2026', alert: true }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 800, color: row.alert ? '#ef4444' : '#0c1a30' }}>
                              {row.res} {row.alert && '🔴'}
                            </td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{row.unit}</td>
                            <td style={{ padding: '12px 10px', color: '#475569' }}>{row.ref}</td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: Radiology */}
            {activeWorkflowTab === 'Radiology' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
                
                {/* Main Scan View */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ ...panelStyle, background: '#090d16', borderColor: '#1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ ...panelTitleStyle, color: '#ffffff' }}>X-Ray Chest (PA View)</h4>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>28 May 2026</span>
                    </div>

                    {/* Interactive Zoom/Pan canvas representation */}
                    <div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '350px',
                        background: '#020408',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: isDragging ? 'grabbing' : 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #1e293b'
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                          width: '260px',
                          height: '260px',
                          position: 'relative'
                        }}
                      >
                        {/* Styled Medical Chest X-Ray SVG Vector illustration */}
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.15))' }}>
                          <rect width="100" height="100" fill="#000" rx="6" />
                          {/* Spine structure */}
                          <path d="M 50 10 L 50 90" stroke="#444" strokeWidth="2.5" strokeDasharray="2,2" />
                          {/* Left Lung border outline */}
                          <path d="M 45 20 C 30 18 15 25 15 50 C 15 75 32 80 44 82 C 45 70 42 30 45 20 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#64748b" strokeWidth="1" />
                          {/* Right Lung border outline */}
                          <path d="M 55 20 C 70 18 85 25 85 50 C 85 75 68 80 56 82 C 55 70 58 30 55 20 Z" fill="rgba(100, 116, 139, 0.25)" stroke="#64748b" strokeWidth="1" />
                          {/* Heart Outline overlay */}
                          <path d="M 46 52 C 46 65 52 70 60 70 C 64 70 68 62 68 52 C 68 45 58 45 46 52 Z" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" />
                          {/* Rib cage arcs left */}
                          <path d="M 17 35 Q 32 38 46 32 M 16 45 Q 30 48 45 42 M 16 55 Q 30 58 45 52 M 18 65 Q 31 68 44 62" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
                          {/* Rib cage arcs right */}
                          <path d="M 83 35 Q 68 38 54 32 M 84 45 Q 70 48 55 42 M 84 55 Q 70 58 55 52 M 82 65 Q 69 68 56 62" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
                        </svg>
                      </div>

                      {/* On-screen control HUD */}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 12px',
                        borderRadius: '30px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                      }}>
                        <button onClick={handleZoomIn} style={hudBtnStyle} title="Zoom In"><ZoomIn size={14} /></button>
                        <button onClick={handleZoomOut} style={hudBtnStyle} title="Zoom Out"><ZoomOut size={14} /></button>
                        <button onClick={handleResetZoom} style={hudBtnStyle} title="Reset"><RefreshCw size={14} /></button>
                        <span style={{ fontSize: '10.5px', color: '#cbd5e1', fontWeight: 700, padding: '0 4px' }}>
                          {Math.round(zoomLevel * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Radiology notes */}
                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Radiological Findings</h4>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                      • Lung fields are clear. No active parenchymal lesions or pleural effusion observed.<br />
                      • Cardiomegaly is present with cardiothoracic ratio of approximately 55%. Cardiac silhouette is prominent.<br />
                      • Hilar structures are normal. Bony thorax and dome of diaphragm are normal.
                    </p>
                  </div>
                </div>

                {/* Sidebar list of scans */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>All Radiology Scans</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { title: 'X-Ray Chest (PA View)', date: '28 May 2026', type: 'X-Ray', active: true },
                        { title: '2D Echo', date: '24 May 2024', type: 'Echo', active: false },
                        { title: 'CT Coronary Angiography', date: '15 Jul 2023', type: 'CT Scan', active: false },
                        { title: 'USG Abdomen', date: '12 Jan 2023', type: 'Ultrasound', active: false }
                      ].map((scan, i) => (
                        <div key={i} style={{
                          padding: '14px',
                          borderRadius: '12px',
                          border: `1.5px solid ${scan.active ? '#4a7cff' : '#e2e8f0'}`,
                          background: scan.active ? '#f0f4ff' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}>
                          <div>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: scan.active ? '#4a7cff' : '#0c1a30' }}>
                              {scan.title}
                            </p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                              {scan.date}
                            </p>
                          </div>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: scan.active ? '#4a7cff' : '#f1f5f9',
                            color: scan.active ? '#ffffff' : '#64748b'
                          }}>{scan.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: Admission Details */}
            {activeWorkflowTab === 'Admission' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px' }} className="grid-responsive">
                  
                  {/* Detailed admission items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* General Info */}
                    <div style={panelStyle}>
                      <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Admission Info</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
                        <div style={detailRowStyle}><span>Admission ID</span><span style={{ fontWeight: 700 }}>IPD-2026-0528-98</span></div>
                        <div style={detailRowStyle}><span>Admission Date</span><span style={{ fontWeight: 700 }}>28 May 2026 10:30 PM</span></div>
                        <div style={detailRowStyle}><span>Department</span><span style={{ fontWeight: 700 }}>Cardiology</span></div>
                        <div style={detailRowStyle}><span>Room/Bed</span><span style={{ fontWeight: 700 }}>ICU/A-4</span></div>
                        <div style={detailRowStyle}><span>Ward Bed</span><span style={{ fontWeight: 700 }}>30 May 2026 02:00 PM</span></div>
                        <div style={detailRowStyle}><span>Admission Type</span><span style={{ fontWeight: 700 }}>IPD</span></div>
                      </div>
                    </div>

                    {/* Follow Up */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Follow Up</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                        • Review after 7 days.<br />
                        • Repeat TMT in 3 months.
                      </p>
                    </div>

                    {/* Procedures Done */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Procedures Done</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                        • ECG Done<br />
                        • TMT test
                      </p>
                    </div>

                    {/* Differential Diagnosis */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Differential Diagnosis</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                        • Cardiac ischemia<br />
                        • GERD<br />
                        • Non cardiothoracic Pain
                      </p>
                    </div>

                    {/* Discharge Summary */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Discharge Summary</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                        Patient is hemodynamically stable and discharged in stable condition. Advised to take medications regularly and follow up as recommended.
                      </p>
                    </div>
                  </div>

                  {/* Sidebar plan and advice */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Clinical Plan */}
                    <div style={panelStyle}>
                      <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Plan</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <div style={detailRowStyle}><span>BP</span><span style={{ fontWeight: 700 }}>140/80 mmHg</span></div>
                        <div style={detailRowStyle}><span>Pulse</span><span style={{ fontWeight: 700 }}>82/min</span></div>
                        <div style={detailRowStyle}><span>SpO2</span><span style={{ fontWeight: 700 }}>98%</span></div>
                        <div style={detailRowStyle}><span>Temp</span><span style={{ fontWeight: 700 }}>98.6 F</span></div>
                        <div style={detailRowStyle}><span>Weight</span><span style={{ fontWeight: 700 }}>72 kg</span></div>
                        <div style={detailRowStyle}><span>BMI</span><span style={{ fontWeight: 700 }}>23.8 kg/m2</span></div>
                      </div>
                    </div>

                    {/* Final Diagnosis */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Final Diagnosis</h4>
                      <p style={{ fontSize: '13px', color: '#0c1a30', fontWeight: 700, marginTop: '8px' }}>
                        Unstable Angina
                      </p>
                    </div>

                    {/* Advice */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Advice</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                        • Regular walking 30 minutes<br />
                        • Avoid smoking & alcohol
                      </p>
                    </div>

                    {/* Hospital Course */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Hospital Course</h4>
                      <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginTop: '10px' }}>
                        Patient was admitted with complaints of chest pain on exertion. Evaluated with ECG, TMT, Echo and labs. Treated in ward. Patient reports relief in symptoms. Managed with medications and advised lifestyle modifications.
                      </p>
                    </div>

                    {/* Admission Notes */}
                    <div style={panelStyle}>
                      <h4 style={panelTitleStyle}>Admission Notes</h4>
                      <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginTop: '10px', fontStyle: 'italic' }}>
                        Patient advised for chest pain evaluation and monitoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: Procedures */}
            {activeWorkflowTab === 'Procedures' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
                
                {/* Left side details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '14px' }}>Procedure Details</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <div style={detailRowStyle}><span>Procedure Name</span><span style={{ fontWeight: 700 }}>Coronary Angioplasty</span></div>
                      <div style={detailRowStyle}><span>Procedure Date</span><span style={{ fontWeight: 700 }}>15 July 2023</span></div>
                      <div style={detailRowStyle}><span>Indication</span><span style={{ fontWeight: 700 }}>90% blockage in LAD</span></div>
                      <div style={detailRowStyle}><span>Surgeon</span><span style={{ fontWeight: 700 }}>Dr. Anil Sharma</span></div>
                      <div style={detailRowStyle}><span>Duration</span><span style={{ fontWeight: 700 }}>60 mins</span></div>
                      <div style={detailRowStyle}><span>Outcome</span><span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>SUCCESSFUL</span></div>
                    </div>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={panelTitleStyle}>Procedure Notes</h4>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                      Stent placed in LAD. Procedure was uneventful.
                    </p>
                  </div>

                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '12px' }}>Procedural Materials Used</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11.5px', fontWeight: 700 }}>
                      <span style={materialBadgeStyle}>• Guiding Catheter</span>
                      <span style={materialBadgeStyle}>• Balloon Catheter</span>
                      <span style={materialBadgeStyle}>• Drug Eluting Stent</span>
                      <span style={materialBadgeStyle}>• Guidewire 0.014</span>
                      <span style={materialBadgeStyle}>• Contrast Media</span>
                    </div>
                  </div>
                </div>

                {/* Right side angiogram scan graphic representation */}
                <div style={{ ...panelStyle, background: '#090d16', borderColor: '#1e293b', alignSelf: 'flex-start' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ ...panelTitleStyle, color: '#ffffff' }}>Coronary Angiogram Scan</h4>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>15 July 2023</span>
                  </div>

                  {/* Interactive Zoom/Pan coronary graphic */}
                  <div
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      background: '#020408',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: isDragging ? 'grabbing' : 'grab',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #1e293b'
                    }}
                  >
                    <div
                      style={{
                        transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                        transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                        width: '200px',
                        height: '200px',
                        position: 'relative'
                      }}
                    >
                      {/* Styled Angiogram coronary artery SVG illustration */}
                      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.1))' }}>
                        <rect width="100" height="100" fill="#000" rx="6" />
                        {/* Aorta main curve */}
                        <path d="M 30 90 Q 30 20 60 20 T 90 90" fill="none" stroke="#222" strokeWidth="12" />
                        {/* Left Main Coronary Artery tree branch */}
                        <path d="M 50 20 Q 35 25 30 35 T 25 60 T 20 85" fill="none" stroke="#e0e7ff" strokeWidth="2.5" />
                        {/* Sub-branches */}
                        <path d="M 30 35 Q 40 40 45 55 T 50 75" fill="none" stroke="#e0e7ff" strokeWidth="1.8" />
                        <path d="M 25 60 Q 35 62 38 72" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
                        {/* LAD blockage area circle marker */}
                        <circle cx="30" cy="35" r="4.5" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="1.5,1" />
                        <text x="36" y="34" fill="#ef4444" fontSize="4.5" fontWeight="bold">90% Blockage (LAD)</text>
                      </svg>
                    </div>

                    {/* HUD Control Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(15, 23, 42, 0.85)',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '30px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center'
                    }}>
                      <button onClick={handleZoomIn} style={hudBtnStyle}><ZoomIn size={12} /></button>
                      <button onClick={handleZoomOut} style={hudBtnStyle}><ZoomOut size={12} /></button>
                      <button onClick={handleResetZoom} style={hudBtnStyle}><RefreshCw size={12} /></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 10: Care Plan */}
            {activeWorkflowTab === 'CarePlan' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }} className="grid-responsive">
                {/* Left side: Upcoming Appointments */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '20px' }}>Upcoming Appointments</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { date: '25 May 2024', time: '10:00 AM', desc: 'Follow-up with Dr. Anil Sharma' },
                      { date: '20 Jun 2024', time: '09:30 AM', desc: 'TMT Test' },
                      { date: '20 Jul 2024', time: '09:30 AM', desc: 'Lipid Profile' },
                      { date: '20 Jul 2024', time: '09:30 AM', desc: 'HbA1c Test' },
                      { date: '20 Jul 2024', time: '09:30 AM', desc: 'Lipid Profile' },
                      { date: '20 Jul 2024', time: '09:30 AM', desc: 'HbA1c Test' },
                    ].map((apt, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #f1f5f9'
                      }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#0c1a30' }}>{apt.date}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{apt.time}</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#4a7cff', fontWeight: 700 }}>{apt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Care Plan & Reminders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Care Plan Card */}
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Care Plan</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600 }}>
                      <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Continue medications</div>
                      <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Regular exercise</div>
                      <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Monitor BP and Sugar</div>
                      <div>Follow low salt, low fat diet</div>
                    </div>
                  </div>

                  {/* Reminders Card */}
                  <div style={panelStyle}>
                    <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Reminders</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600 }}>
                      <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Medication refills in 12 days</div>
                      <div>Follow-up due in 9 days</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 11: Alerts & Reminders */}
            {activeWorkflowTab === 'Alerts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Active Alerts Table */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Active Alerts</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Severity</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Alert</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Date</th>
                          <th style={{ padding: '10px', color: '#64748b', fontWeight: 700 }}>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { sev: 'High', msg: 'Chest pain reported', date: '15 May 2024', time: '10:00 AM', color: '#ef4444' },
                          { sev: 'High', msg: 'Follow-up due in 9 days', date: '16 May 2024', time: '09:00 AM', color: '#f59e0b' },
                          { sev: 'High', msg: 'Medication refills in 12 days', date: '15 May 2024', time: '09:00 AM', color: '#3b82f6' },
                          { sev: 'High', msg: 'TMT test pending', date: '15 May 2024', time: '09:00 AM', color: '#10b981' }
                        ].map((alert, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px', fontWeight: 800, color: alert.color }}>
                              ⚠️ {alert.sev}
                            </td>
                            <td style={{ padding: '12px 10px', color: '#0c1a30', fontWeight: 700 }}>{alert.msg}</td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{alert.date}</td>
                            <td style={{ padding: '12px 10px', color: '#64748b' }}>{alert.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reminders Card */}
                <div style={panelStyle}>
                  <h4 style={{ ...panelTitleStyle, marginBottom: '16px' }}>Reminders</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#334155', fontWeight: 600 }}>
                    <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Take medications regularly</div>
                    <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Drink plenty of water</div>
                    <div style={{ paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>Regular walking 30 mins/day</div>
                    <div>Next appointment on 25 May 2024</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick Actions Sticky Bottom Bar */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 24px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
            flexWrap: 'wrap'
          }}>
            <button style={{ ...actionBtnStyle, background: '#10b981', color: '#ffffff' }}>
              <Activity size={16} />
              <span>Consult + Prescribe</span>
            </button>
            <button style={{ ...actionBtnStyle, background: '#4a7cff', color: '#ffffff' }}>
              <Heart size={16} />
              <span>Record Vitals</span>
            </button>
            <button style={{ ...actionBtnStyle, background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1' }}>
              <MessageSquare size={16} />
              <span>Chat with Nurse</span>
            </button>
            <button style={{ ...actionBtnStyle, background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', marginLeft: 'auto' }}>
              <UsersIcon size={16} />
              <span>Manage Care Team</span>
            </button>
          </div>

        </div>
      )}

      {/* Patient Summary Pop-Up Modal Dialog (Matches Second Image, 3rd screenshot) */}
      {showSummaryModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid #e2e8f0',
            animation: 'modal-appear 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ ...panelTitleStyle, fontSize: '17px', margin: 0 }}>Patient Summary Directory</h3>
              <button
                onClick={() => setShowSummaryModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                ✖
              </button>
            </div>

            {/* Modal Body: Directory buttons */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                Select a summary section to jump directly to its detailed view:
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Past History', target: 'History' },
                  { label: 'Medication & Adherence', target: 'Medication' },
                  { label: 'Complaints', target: 'Complaints' },
                  { label: 'Vitals Trend', target: 'Vitals' },
                  { label: 'Lab Reports', target: 'Lab' },
                  { label: 'Radiology', target: 'Radiology' },
                  { label: 'Past History Records', target: 'History' },
                  { label: 'Medication Logs', target: 'Medication' }
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveWorkflowTab(btn.target as any);
                      setShowSummaryModal(false);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: '#0c1a30',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f0f4ff';
                      e.currentTarget.style.borderColor = '#4a7cff';
                      e.currentTarget.style.color = '#4a7cff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.color = '#0c1a30';
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowSummaryModal(false)}
                style={{
                  background: 'transparent',
                  border: '1.5px solid #cbd5e1',
                  color: '#475569',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSummaryModal(false)}
                style={{
                  background: '#4a7cff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(74, 124, 255, 0.2)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation classes definitions */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes modal-appear {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
};

/* Styles & Tokens */
const panelStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
  position: 'relative'
};

const panelTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 800,
  color: '#0c1a30',
  fontFamily: 'Outfit, sans-serif',
  margin: 0
};

const panelActionBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#4a7cff',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  padding: 0
};

const formGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 700,
  textTransform: 'uppercase'
};

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0c1a30',
  outline: 'none',
  background: '#ffffff',
  transition: 'border-color 0.2s'
};

const selectStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0c1a30',
  outline: 'none',
  background: '#ffffff'
};

const detailRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '8px',
  borderBottom: '1px solid #f1f5f9'
};

const vitalMiniStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '8px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px'
};

const actionBtnHeaderStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '8px',
  padding: '8px 14px',
  fontSize: '12.5px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const hudBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  width: '26px',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const materialBadgeStyle: React.CSSProperties = {
  background: '#eef2ff',
  color: '#4a7cff',
  padding: '4px 10px',
  borderRadius: '6px',
  border: '1px solid #dbeafe'
};

const actionBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '10px',
  padding: '12px 20px',
  fontSize: '12.5px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'transform 0.15s ease'
};

const cardActionBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};

export default NewPatient;
