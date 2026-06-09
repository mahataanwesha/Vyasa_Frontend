import React, { useState } from 'react';
import {
  Search,
  Download,
  Plus,
  ArrowLeft,
  Heart,
  Activity,
  MessageSquare,
  Users as UsersIcon,
  Check
} from 'lucide-react';
import { NewPatient } from './NewPatient';

interface Patient {
  id: string;
  name: string;
  ehrId: string;
  age: number;
  gender: string;
  type: 'IPD' | 'OPD' | 'Discharged' | 'Death';
  location: string;
  diagnosis: string;
  doctor: string;
  admittedDate: string;
  admittedTime: string;
  phone: string;
  bloodGroup: string;
  allergies: string;
  height?: string;
  weight?: string;
  bmi?: string;
  address?: string;
  pincode?: string;
  diseases?: string[];
  otherDisease?: string;
}

export const MyPatients: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'IPD' | 'OPD' | 'Discharged' | 'Death'>('IPD');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastPatientFlow, setShowPastPatientFlow] = useState(false);

  const [showAddNewPatient, setShowAddNewPatient] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newSex, setNewSex] = useState('Male');
  const [newPhone, setNewPhone] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newBmi, setNewBmi] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [otherDisease, setOtherDisease] = useState('');

  const calculateBmi = (heightCm: string, weightKg: string) => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) {
      const heightM = h / 100;
      const bmiVal = w / (heightM * heightM);
      return bmiVal.toFixed(1);
    }
    return '';
  };

  const handleHeightChange = (val: string) => {
    setNewHeight(val);
    setNewBmi(calculateBmi(val, newWeight));
  };

  const handleWeightChange = (val: string) => {
    setNewWeight(val);
    setNewBmi(calculateBmi(newHeight, val));
  };

  const diseasesList = [
    'Diabetes', 'Hypertension', 'Asthma', 'COPD', 'Heart Disease',
    'Chronic Kidney Disease', 'Liver Disease', 'Epilepsy', 'Thyroid Disorder',
    'Cancer', 'HIV/AIDS', 'Tuberculosis', 'Stroke', 'Obesity', 'Arthritis'
  ];

  // Sample Mock Patient Database matching mockup values
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'p1',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00024',
      age: 23,
      gender: 'Male',
      type: 'IPD',
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
      id: 'p2',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00025',
      age: 23,
      gender: 'Male',
      type: 'IPD',
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
      id: 'p3',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'IPD',
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
      id: 'p4',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00027',
      age: 23,
      gender: 'Male',
      type: 'IPD',
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
      id: 'p5',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00028',
      age: 23,
      gender: 'Male',
      type: 'IPD',
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
      id: 'p6',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00029',
      age: 23,
      gender: 'Male',
      type: 'IPD',
      location: 'Ward/Bed-ICU/A-4',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    // OPD Patients
    {
      id: 'p7',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'OPD',
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
      id: 'p8',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'OPD',
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
      id: 'p9',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'OPD',
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
      id: 'p10',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'OPD',
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
      id: 'p11',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'OPD',
      location: 'OPD',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    // Discharged Patients
    {
      id: 'p12',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'Discharged',
      location: 'Ward B-5',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    },
    {
      id: 'p13',
      name: 'Rohit Sharma',
      ehrId: 'EHR-00026',
      age: 23,
      gender: 'Male',
      type: 'Discharged',
      location: 'Ward B-5',
      diagnosis: 'Viral Fever',
      doctor: 'Dr. Arjun Mehta',
      admittedDate: '08 Apr 2025',
      admittedTime: '09:42 AM',
      phone: '5988685544',
      bloodGroup: 'A+',
      allergies: 'None Known'
    }
  ]);

  const filteredPatients = patients
    .filter(p => p.type === selectedTab)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.ehrId.toLowerCase().includes(searchQuery.toLowerCase()));

  // Render Detailed Patient Profile view
  const renderPatientDetail = (patient: Patient) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fade-in 0.3s ease' }}>
        {/* Back Button */}
        <button
          onClick={() => setSelectedPatient(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 700,
            alignSelf: 'flex-start'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to patients</span>
        </button>

        {/* Profile Header Banner */}
        <div style={{
          background: '#0c1a30',
          borderRadius: '16px',
          padding: '24px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(12, 26, 48, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#f8fafc',
              color: '#0c1a30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '20px',
              overflow: 'hidden'
            }}>
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{patient.name}</h2>
                <span style={{ background: 'rgba(255,255,255,0.12)', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>{patient.ehrId}</span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                {patient.age} Year, {patient.gender} • Admitted: {patient.admittedDate}, {patient.admittedTime}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span style={{ background: '#eef2ff', color: '#4a7cff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>{patient.type}</span>
                <span style={{ background: '#fee2e2', color: '#ef4444', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>{patient.location}</span>
                <span style={{ background: '#fff7ed', color: '#f97316', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>Emergency</span>
              </div>
            </div>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Download size={14} />
            <span>Download</span>
          </button>
        </div>

        {/* Detailed Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
          {/* Left Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Patient Information */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={sectionTitleStyle}>Patient Information</h3>
                <button style={{ background: '#4a7cff', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '5px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Edit</button>
              </div>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Full Name</span>
                  <div style={infoValueStyle}>{patient.name}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Admission Date</span>
                  <div style={infoValueStyle}>{patient.admittedDate} {patient.admittedTime}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Age / Sex</span>
                  <div style={infoValueStyle}>{patient.age} Years/{patient.gender}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Type</span>
                  <div style={infoValueStyle}>Emergency</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Blood Group</span>
                  <div style={infoValueStyle}>{patient.bloodGroup}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Allergies</span>
                  <div style={{ ...infoValueStyle, color: '#ef4444' }}>{patient.allergies}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Phone Number</span>
                  <div style={infoValueStyle}>{patient.phone}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Insurance</span>
                  <div style={infoValueStyle}>--</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Height</span>
                  <div style={infoValueStyle}>{patient.height ? `${patient.height} cm` : '--'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Weight</span>
                  <div style={infoValueStyle}>{patient.weight ? `${patient.weight} kg` : '--'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>BMI</span>
                  <div style={infoValueStyle}>{patient.bmi || '--'}</div>
                </div>
                <div style={{ ...infoItemStyle, gridColumn: 'span 2' }}>
                  <span style={infoLabelStyle}>Chronic Conditions</span>
                  <div style={{ ...infoValueStyle, color: '#ef4444' }}>
                    {patient.diseases && patient.diseases.length > 0 ? patient.diseases.join(', ') : 'None'}
                    {patient.otherDisease ? ` (Other: ${patient.otherDisease})` : ''}
                  </div>
                </div>
                <div style={{ ...infoItemStyle, gridColumn: 'span 2' }}>
                  <span style={infoLabelStyle}>Address</span>
                  <div style={infoValueStyle}>
                    {patient.address ? `${patient.address}${patient.pincode ? `, PIN: ${patient.pincode}` : ''}` : 'Not Provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals Section */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Vitals</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px', marginTop: '10px' }}>
                {[
                  { title: 'Blood Pressure', val: '120/80', unit: 'mmHg', color: '#10b981', bg: '#ecfdf5' },
                  { title: 'Heart Rate', val: '72', unit: 'bpm', color: '#ef4444', bg: '#fef2f2' },
                  { title: 'SpO2', val: '98%', unit: 'Oxygen', color: '#4a7cff', bg: '#f0f4ff' },
                  { title: 'Temp', val: '98.6', unit: '°F', color: '#f59e0b', bg: '#fffbeb' },
                ].map((vit, i) => (
                  <div key={i} style={{ background: vit.bg, padding: '14px', borderRadius: '12px', border: `1px solid rgba(0,0,0,0.02)` }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>{vit.title}</span>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: vit.color, display: 'block', marginTop: '4px' }}>{vit.val}</span>
                    <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>{vit.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Clinical Summary */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Clinical Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span style={infoLabelStyle}>Chief Complaint</span>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#475569', fontWeight: 600 }}>not recorded</p>
                </div>
                <div>
                  <span style={infoLabelStyle}>Diagnosis</span>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#0c1a30', fontWeight: 700 }}>{patient.diagnosis}</p>
                </div>
                <div>
                  <span style={infoLabelStyle}>ICD-10 Code</span>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748b', fontWeight: 500 }}>--</p>
                </div>
              </div>
            </div>

            {/* Care Team */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Care Team</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={infoLabelStyle}>Doctor</span>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>{patient.doctor}</p>
                  </div>
                  <span style={{ background: '#f0f4ff', color: '#4a7cff', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Lead</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <div>
                    <span style={infoLabelStyle}>Nurse Assigned</span>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>Clara Barton</p>
                  </div>
                  <span style={{ background: '#ecfdf5', color: '#10b981', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>On Duty</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Quick Stats</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#4a7cff', display: 'block' }}>0</span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Active Rx</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#f59e0b', display: 'block' }}>0</span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Lab Orders</span>
                </div>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#10b981', display: 'block' }}>0</span>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Vitals Log</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer Panel */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '16px 24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)'
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
    );
  };

  const renderAddNewPatientForm = () => {
    const handleSavePatient = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newName || !newAge) return;

      const finalDiseases = [...selectedDiseases];
      if (otherDisease) {
        finalDiseases.push(otherDisease);
      }

      const newPatient: Patient = {
        id: 'p_' + Date.now(),
        name: newName,
        ehrId: 'EHR-00' + Math.floor(100 + Math.random() * 900),
        age: parseInt(newAge),
        gender: newSex,
        type: selectedTab, // defaults to selected tab (IPD, OPD, Discharged)
        location: selectedTab === 'IPD' ? 'Ward/Bed-ICU/A-4' : selectedTab === 'OPD' ? 'OPD' : 'Ward B-5',
        diagnosis: finalDiseases.length > 0 ? finalDiseases[0] : 'General Assessment',
        doctor: 'Dr. Arjun Mehta',
        admittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        admittedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        phone: newPhone || '5988685544',
        bloodGroup: 'A+',
        allergies: 'None Known',
        
        // Extended details
        height: newHeight,
        weight: newWeight,
        bmi: newBmi,
        address: newAddress,
        pincode: newPincode,
        diseases: selectedDiseases,
        otherDisease: otherDisease
      };

      setPatients([newPatient, ...patients]);
      setShowAddNewPatient(false);

      // Reset Form Fields
      setNewName('');
      setNewAge('');
      setNewSex('Male');
      setNewPhone('');
      setNewHeight('');
      setNewWeight('');
      setNewBmi('');
      setNewAddress('');
      setNewPincode('');
      setSelectedDiseases([]);
      setOtherDisease('');
    };

    return (
      <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', animation: 'fade-in 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <Plus style={{ color: '#00a99d' }} size={24} />
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0c1a30', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Patient Information</h3>
        </div>

        <form onSubmit={handleSavePatient} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Landscape Layout Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px 24px' }}>
            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>FULL NAME <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="text" placeholder="Patient name" value={newName} onChange={(e) => setNewName(e.target.value)} required style={inputStyleLocal} />
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>AGE <span style={{ color: '#ef4444' }}>*</span></label>
              <input type="number" placeholder="Age" value={newAge} onChange={(e) => setNewAge(e.target.value)} required style={inputStyleLocal} />
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>SEX</label>
              <select value={newSex} onChange={(e) => setNewSex(e.target.value)} style={selectStyleLocal}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>PHONE</label>
              <input type="tel" placeholder="10-digit number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} style={inputStyleLocal} />
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>HEIGHT (CM)</label>
              <input type="number" placeholder="165" value={newHeight} onChange={(e) => handleHeightChange(e.target.value)} style={inputStyleLocal} />
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>WEIGHT (KG)</label>
              <input type="number" placeholder="70" value={newWeight} onChange={(e) => handleWeightChange(e.target.value)} style={inputStyleLocal} />
            </div>

            <div style={{ ...formGroupStyleLocal, gridColumn: 'span 3' }}>
              <label style={labelStyleLocal}>BMI (AUTO-CALCULATED)</label>
              <input type="text" readOnly placeholder="Enter height & weight" value={newBmi ? `${newBmi} (Auto-calculated)` : ''} style={{ ...inputStyleLocal, background: '#f8fafc', fontWeight: 700, color: '#0f172a' }} />
            </div>

            <div style={{ ...formGroupStyleLocal, gridColumn: 'span 2' }}>
              <label style={labelStyleLocal}>ADDRESS</label>
              <input type="text" placeholder="Street / Area" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} style={inputStyleLocal} />
            </div>

            <div style={formGroupStyleLocal}>
              <label style={labelStyleLocal}>PINCODE</label>
              <input type="text" placeholder="6-digit pincode" value={newPincode} onChange={(e) => setNewPincode(e.target.value)} style={inputStyleLocal} />
            </div>
          </div>

          {/* Chronic diseases checkboxes in landscape columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ ...labelStyleLocal, fontSize: '11px', color: '#64748b', fontWeight: 800 }}>CHRONIC / PRE-EXISTING DISEASES</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '12px' }}>
              {diseasesList.map(disease => {
                const isChecked = selectedDiseases.includes(disease);
                return (
                  <label key={disease} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#334155',
                    cursor: 'pointer',
                    background: isChecked ? '#f0fdfa' : '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isChecked ? '1px solid #00a99d' : '1px solid #e2e8f0',
                    fontWeight: 600,
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDiseases([...selectedDiseases, disease]);
                        } else {
                          setSelectedDiseases(selectedDiseases.filter(d => d !== disease));
                        }
                      }}
                      style={{ accentColor: '#00a99d' }}
                    />
                    <span>{disease}</span>
                  </label>
                );
              })}
            </div>
            
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Other (type here)"
                value={otherDisease}
                onChange={(e) => setOtherDisease(e.target.value)}
                style={{ ...inputStyleLocal, width: '100%', maxWidth: '400px' }}
              />
            </div>
          </div>

          {/* Action Buttons Panel */}
          <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '10px' }}>
            <button
              type="submit"
              style={{
                background: '#00a99d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(0, 169, 157, 0.2)'
              }}
            >
              <Check size={16} />
              <span>Save Consultation</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddNewPatient(false)}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (showPastPatientFlow) {
    return <NewPatient initialViewMode="past-patient" onBack={() => setShowPastPatientFlow(false)} />;
  }

  if (showAddNewPatient) {
    return renderAddNewPatientForm();
  }

  if (selectedPatient) {
    return renderPatientDetail(selectedPatient);
  }

  return (
    <div style={containerStyle}>
      {/* Title block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0c1a30', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
            {selectedTab === 'IPD' && 'IPD Patients'}
            {selectedTab === 'OPD' && 'OPD Patients'}
            {selectedTab === 'Discharged' && 'Discharged Patients'}
            {selectedTab === 'Death' && 'Deceased Records'}
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
            Manage and monitor patient records in real-time
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowAddNewPatient(true)}
            style={{
              background: '#e0e7ff',
              color: '#4a7cff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={16} />
            <span>New Patient</span>
          </button>
          <button style={{
            background: '#4a7cff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
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
        marginBottom: '24px'
      }} className="flex-responsive">
        {/* Search Box */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search Patients by Name or EHR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            const isActive = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
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
          onClick={() => setShowPastPatientFlow(true)}
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
      {filteredPatients.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredPatients.map((patient) => {
            // Colors based on Tab type
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
                className="patient-card-hover"
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
                      {patient.name.charAt(0).toUpperCase()}
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
                    <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700, display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Vitals & Chronic Info</span>
                    <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                      {patient.height || patient.weight || patient.bmi ? (
                        <span style={{ display: 'block', lineHeight: '1.5' }}>
                          Height: <strong>{patient.height || '--'} cm</strong> | Weight: <strong>{patient.weight || '--'} kg</strong> | BMI: <strong>{patient.bmi || '--'}</strong>
                          {patient.diseases && patient.diseases.length > 0 && (
                            <span style={{ display: 'block', marginTop: '4px', color: '#ef4444', fontWeight: 700 }}>
                              Chronic: {patient.diseases.join(', ')}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>
                          {patient.type === 'IPD' && 'No vitals recorded yet. Check back after the next assessment.'}
                          {patient.type === 'OPD' && 'No Patient Summary. Check back after the next assessment.'}
                          {patient.type === 'Discharged' && 'No Discharge summary. Check back after the next assessment.'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}>
                  {patient.type === 'IPD' ? (
                    <>
                      <button style={{ ...cardActionBtnStyle, background: '#ef4444', color: '#ffffff', flex: 1 }}>SOS Alert</button>
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        style={{ ...cardActionBtnStyle, background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', flex: 1.5 }}
                      >
                        View Profile
                      </button>
                    </>
                  ) : patient.type === 'OPD' ? (
                    <button style={{ ...cardActionBtnStyle, background: '#4a7cff', color: '#ffffff', width: '100%' }}>Consult</button>
                  ) : (
                    <button
                      onClick={() => setSelectedPatient(patient)}
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
  );
};

/* Core Styled Objects */
const containerStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  animation: 'fade-in 0.3s ease'
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)'
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 800,
  color: '#0c1a30',
  fontFamily: 'Outfit, sans-serif',
  margin: '0 0 16px 0'
};

const infoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px'
};

const infoItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 700,
  textTransform: 'uppercase'
};

const infoValueStyle: React.CSSProperties = {
  fontSize: '13.5px',
  color: '#0f172a',
  fontWeight: 600
};

const actionBtnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '10px',
  padding: '12px 20px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s'
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

const formGroupStyleLocal: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyleLocal: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 700,
  textTransform: 'uppercase'
};

const inputStyleLocal: React.CSSProperties = {
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

const selectStyleLocal: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0c1a30',
  outline: 'none',
  background: '#ffffff'
};

export default MyPatients;
