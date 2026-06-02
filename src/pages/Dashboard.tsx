import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
  Users,
  Activity,
  AlertTriangle,
  FolderHeart,
  UserCheck,
  Building
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const role = user?.role || 'Doctor';

  // Metrics database based on clinician role
  const metrics = {
    Admin: [
      { label: 'Hospital Staff', value: '14 Active', icon: <Users size={24} style={{ color: '#4a7cff' }} />, bg: '#f0f4ff' },
      { label: 'Active Facilities', value: '4 Main Wings', icon: <Building size={24} style={{ color: '#10b981' }} />, bg: '#ecfdf5' },
      { label: 'Telemetry Terminals', value: '28 Node Enpoints', icon: <Activity size={24} style={{ color: '#f59e0b' }} />, bg: '#fffbeb' },
    ],
    Doctor: [
      { label: 'My Patients', value: '8 Scheduled', icon: <FolderHeart size={24} style={{ color: '#4a7cff' }} />, bg: '#f0f4ff' },
      { label: 'Pending Lab Review', value: '3 Reports', icon: <AlertTriangle size={24} style={{ color: '#f43f5e' }} />, bg: '#fff5f5' },
      { label: 'Shift Rounds', value: '2 Completed', icon: <UserCheck size={24} style={{ color: '#10b981' }} />, bg: '#ecfdf5' },
    ],
    Nurse: [
      { label: 'Ward Patients', value: '12 Checked-in', icon: <FolderHeart size={24} style={{ color: '#4a7cff' }} />, bg: '#f0f4ff' },
      { label: 'Outstanding Vitals Log', value: '4 Pending', icon: <Activity size={24} style={{ color: '#f59e0b' }} />, bg: '#fffbeb' },
      { label: 'Shift Duty Room', value: 'Bed Ward B', icon: <UserCheck size={24} style={{ color: '#10b981' }} />, bg: '#ecfdf5' },
    ],
    Pharmacist: [
      { label: 'Active Prescriptions', value: '16 Pending', icon: <FolderHeart size={24} style={{ color: '#4a7cff' }} />, bg: '#f0f4ff' },
      { label: 'Controlled Substance Audit', value: 'Safe Lock A', icon: <AlertTriangle size={24} style={{ color: '#f43f5e' }} />, bg: '#fff5f5' },
    ],
    'Lab Technician': [
      { label: 'Pending Blood Assays', value: '6 In-Queue', icon: <Activity size={24} style={{ color: '#4a7cff' }} />, bg: '#f0f4ff' },
      { label: 'Analyzers Status', value: '3 Active', icon: <UserCheck size={24} style={{ color: '#10b981' }} />, bg: '#ecfdf5' },
    ],
  };

  const currentMetrics = metrics[role] || metrics.Doctor;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in">
      {/* Dynamic welcome header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #020d20 0%, #071735 100%)',
          borderRadius: '20px',
          padding: '36px',
          color: '#ffffff',
          boxShadow: '0 10px 25px rgba(2, 13, 32, 0.15)',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
          Hello, {user?.fullName}!
        </h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}>
          {role === 'Admin' 
            ? `Hospital Registrar Console — Managing staff credentials for ${user?.hospitalName}`
            : `Secured Clinical Portal — Accessing credentials under licensed NurseLink parameters.`
          }
        </p>
      </div>

      {/* Grid containing Quick KPI Metrics cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {currentMetrics.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                {item.label}
              </p>
              <p style={{ fontSize: '20px', color: '#0f172a', fontWeight: 800 }}>
                {item.value}
              </p>
            </div>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Details Panel */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          border: '1px solid #e2e8f0',
          padding: '24px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px', fontFamily: 'Outfit, sans-serif' }}>
          {role === 'Admin' ? 'Active Ward Allocations & Units' : 'Urgent Patient Vitals Queue'}
        </h3>

        {role === 'Admin' ? (
          /* Table for Admin displaying units */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #cbd5e1' }}>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 600 }}>Clinical Department</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 600 }}>Lead Caretaker</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 600 }}>Facility Level</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>Emergency Care Center</td>
                  <td style={{ padding: '16px', color: '#475569' }}>Dr. Sarah Jenkins</td>
                  <td style={{ padding: '16px' }}><span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>Optimal</span></td>
                  <td style={{ padding: '16px', color: '#475569' }}>Level 1 Trauma</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>Pediatric Intensive Care (PICU)</td>
                  <td style={{ padding: '16px', color: '#475569' }}>Dr. Raymond Holt</td>
                  <td style={{ padding: '16px' }}><span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>Optimal</span></td>
                  <td style={{ padding: '16px', color: '#475569' }}>Pediatric A1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>Cardiology telemetry wing</td>
                  <td style={{ padding: '16px', color: '#475569' }}>Dr. Gregory House</td>
                  <td style={{ padding: '16px' }}><span style={{ background: '#fffbeb', color: '#f59e0b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>High Occupancy</span></td>
                  <td style={{ padding: '16px', color: '#475569' }}>Cardio ICU</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          /* List for Clinicians displaying patient vitals */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#fafafa' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>Patient #104 — Aaron Swartz</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Bed B2 • Cardiology Unit</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#f43f5e' }}>BP: 148/95 mmHg</p>
                <p style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 700 }}>Hypertensive Alert</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#fafafa' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>Patient #209 — Ada Lovelace</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Bed A8 • ICU Ward</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>Pulse: 72 bpm</p>
                <p style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>Stable Telemetry</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
