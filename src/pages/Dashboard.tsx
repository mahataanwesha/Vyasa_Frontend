import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
  Users,
  Activity,
  AlertTriangle,
  FolderHeart,
  Building,
  Plus,
  Clock,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const role = user?.role || 'Doctor';

  // State for OPD Queue Tab
  const [opdTab, setOpdTab] = useState<'All' | 'Waiting' | 'Consulting' | 'Completed'>('All');
  
  // State for Pending Tasks Tab
  const [tasksTab, setTasksTab] = useState<'All' | 'Pending' | 'Completed'>('All');

  // Helper: Format today's date matching Figma "Wednesday, 15 April, 2026"
  const getFormattedDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const doctorSpecialty = user?.doctorProfile?.specialization || 'Cardiology';

  // Render Left (Individual Doctor Dashboard)
  const renderDoctorDashboard = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Welcome Greeting Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#0c1a30',
                margin: '0 0 6px 0',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Good Morning, {user?.fullName || (role === 'Nurse' ? 'Priya Sharma' : 'Dr. Arjun Mehta')}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0 }}>
              {getFormattedDate()} - {role === 'Nurse' ? 'Nurse' : doctorSpecialty}
            </p>
          </div>
          <button
            disabled={role === 'Nurse'}
            style={{
              background: role === 'Nurse' ? '#c4b5a6' : '#0c1a30',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: role === 'Nurse' ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              boxShadow: role === 'Nurse' ? 'none' : '0 4px 12px rgba(12, 26, 48, 0.2)',
              opacity: role === 'Nurse' ? 0.8 : 1,
            }}
            onMouseOver={(e) => {
              if (role !== 'Nurse') {
                e.currentTarget.style.background = '#1a3154';
              }
            }}
            onMouseOut={(e) => {
              if (role !== 'Nurse') {
                e.currentTarget.style.background = '#0c1a30';
              }
            }}
          >
            <Plus size={16} />
            <span>New Patient</span>
          </button>
        </div>

        {/* Marquee Alerts Bar */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#fef2f2',
              color: '#ef4444',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              zIndex: 2,
              whiteSpace: 'nowrap',
              border: '1px solid #fee2e2',
              marginRight: '16px',
            }}
          >
            <AlertTriangle size={12} />
            <span>ALERTS</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              animation: 'marquee-scroll 25s linear infinite',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
            }}
          >
            <span>Coronary Artery Disease - 102 <span style={{ color: '#ef4444' }}>🔴 2.79%</span></span>
            <span>Hypertension - 102 <span style={{ color: '#10b981' }}>🟢 1.79%</span></span>
            <span>Hypertension - 102 <span style={{ color: '#10b981' }}>🟢 1.76%</span></span>
            <span>Diabetes Mellitus - 84 <span style={{ color: '#ef4444' }}>🔴 3.25%</span></span>
            <span>Chronic Kidney Disease - 19 <span style={{ color: '#10b981' }}>🟢 0.42%</span></span>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* Card 1 */}
          <div style={cardStyle}>
            <div>
              <span style={cardLabelStyle}>Active IPD</span>
              <h3 style={cardValueStyle}>100</h3>
              <span style={{ ...cardBadgeStyle, color: '#10b981', background: '#ecfdf5' }}>
                <TrendingUp size={12} /> 0.5% from yesterday
              </span>
            </div>
            <div style={{ ...cardIconWrapperStyle, background: '#eef2ff', color: '#4a7cff' }}>
              <Users size={22} />
            </div>
          </div>
          {/* Card 2 */}
          <div style={cardStyle}>
            <div>
              <span style={cardLabelStyle}>OPD Today</span>
              <h3 style={cardValueStyle}>23</h3>
              <span style={{ ...cardBadgeStyle, color: '#10b981', background: '#ecfdf5' }}>
                <TrendingUp size={12} /> 1.2% from past week
              </span>
            </div>
            <div style={{ ...cardIconWrapperStyle, background: '#f0fdf4', color: '#10b981' }}>
              <Activity size={22} />
            </div>
          </div>
          {/* Card 3 */}
          <div style={cardStyle}>
            <div>
              <span style={cardLabelStyle}>Total Patients</span>
              <h3 style={cardValueStyle}>36</h3>
              <span style={{ ...cardBadgeStyle, color: '#10b981', background: '#ecfdf5' }}>
                <TrendingUp size={12} /> 1.8% from yesterday
              </span>
            </div>
            <div style={{ ...cardIconWrapperStyle, background: '#fff7ed', color: '#f97316' }}>
              <FolderHeart size={22} />
            </div>
          </div>
          {/* Card 4 */}
          <div style={cardStyle}>
            <div>
              <span style={cardLabelStyle}>Total Consultation Hour</span>
              <h3 style={cardValueStyle}>10:45 min</h3>
              <span style={{ ...cardBadgeStyle, color: '#ef4444', background: '#fef2f2' }}>
                <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} /> 4.3% Avg consultation
              </span>
            </div>
            <div style={{ ...cardIconWrapperStyle, background: '#f0fdfa', color: '#0d9488' }}>
              <Clock size={22} />
            </div>
          </div>
        </div>

        {/* Main Grid: Left Details & Right Analytics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }} className="grid-responsive">
          {/* Left Columns: Tables & Queues */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Active IPD Patients */}
            <div style={panelStyle}>
              <div style={panelHeaderStyle}>
                <h3 style={panelTitleStyle}>Active IPD Patients</h3>
                <button style={panelActionBtnStyle}>View All</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f1f5f9', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>Patient Name</th>
                      <th style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>Department</th>
                      <th style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>Bed</th>
                      <th style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Ramesh Gupta', 'Ramesh Gupta', 'Ramesh Gupta', 'Ramesh Gupta', 'Ramesh Gupta'].map((name, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '12px 8px', fontWeight: 700, color: '#0f172a' }}>{name}</td>
                        <td style={{ padding: '12px 8px', color: '#475569' }}>{i % 2 === 0 ? 'Cardiology' : 'ICU'}</td>
                        <td style={{ padding: '12px 8px', color: '#475569' }}>Bed A-4</td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                            Round
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* OPD Queue Today */}
            <div style={panelStyle}>
              <div style={panelHeaderStyle}>
                <h3 style={panelTitleStyle}>OPD Queue Today</h3>
                <button style={panelActionBtnStyle}>View All</button>
              </div>

              {/* Custom Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: '#f8fafc', padding: '4px', borderRadius: '8px', alignSelf: 'flex-start' }}>
                {(['All', 'Waiting', 'Consulting', 'Completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOpdTab(tab)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: opdTab === tab ? '#4a7cff' : 'transparent',
                      color: opdTab === tab ? '#ffffff' : '#64748b',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab === 'All' ? 'All' : `${tab} (${tab === 'Waiting' ? 5 : tab === 'Consulting' ? 2 : 7})`}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { num: '01', name: 'Rohit Sharma', status: 'Waiting', color: '#f59e0b', bg: '#fffbeb' },
                  { num: '02', name: 'Rohit Sharma', status: 'Waiting', color: '#f59e0b', bg: '#fffbeb' },
                  { num: '03', name: 'Rohit Sharma', status: 'Consulting', color: '#4a7cff', bg: '#eef2ff' },
                  { num: '04', name: 'Rohit Sharma', status: 'Consulting', color: '#4a7cff', bg: '#eef2ff' },
                  { num: '05', name: 'Rohit Sharma', status: 'Consulting', color: '#4a7cff', bg: '#eef2ff' },
                ]
                  .filter((p) => opdTab === 'All' || p.status === opdTab)
                  .map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8' }}>{p.num}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>{p.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ background: p.bg, color: p.color, fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>
                          {p.status}
                        </span>
                        <button
                          style={{
                            background: '#e2e8f0',
                            color: '#0c1a30',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = '#4a7cff';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = '#e2e8f0';
                            e.currentTarget.style.color = '#0c1a30';
                          }}
                        >
                          <span>Consult</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div style={panelStyle}>
              <div style={panelHeaderStyle}>
                <h3 style={panelTitleStyle}>{role === 'Nurse' ? 'Referral/Pending Tasks' : 'Pending Tasks'}</h3>
                <button style={panelActionBtnStyle}>View All</button>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: '#f8fafc', padding: '4px', borderRadius: '8px', alignSelf: 'flex-start' }}>
                {(['All', 'Pending', 'Completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTasksTab(tab)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: tasksTab === tab ? '#4a7cff' : 'transparent',
                      color: tasksTab === tab ? '#ffffff' : '#64748b',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab === 'All' ? 'All' : `${tab} (${tab === 'Pending' ? 5 : 7})`}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(role === 'Nurse' ? [
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Referral Pending', color: '#f59e0b', bg: '#fffbeb' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Lab reports pending', color: '#f97316', bg: '#fff7ed' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                ] : [
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Pending', color: '#f59e0b', bg: '#fffbeb' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Pending', color: '#f59e0b', bg: '#fffbeb' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                  { name: 'Rohit Sharma', detail: 'No Complaint', status: 'Open', color: '#4a7cff', bg: '#eef2ff' },
                ])
                  .filter((t) => tasksTab === 'All' || (tasksTab === 'Pending' && (t.status === 'Pending' || t.status === 'Referral Pending' || t.status === 'Lab reports pending')) || (tasksTab === 'Completed' && t.status === 'Open'))
                  .map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        borderRadius: '10px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={16} style={{ color: '#64748b' }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0c1a30' }}>{t.name}</p>
                          <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{t.detail}</p>
                        </div>
                      </div>
                      <span style={{ background: t.bg, color: t.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                        {t.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Pie/Donut Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ ...panelTitleStyle, margin: 0 }}>Statistics</h3>
                <select
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 600,
                    outline: 'none',
                    background: '#ffffff',
                  }}
                >
                  <option>Day</option>
                  <option>Week</option>
                  <option selected>Month</option>
                  <option>Year</option>
                </select>
              </div>

              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Patients
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0c1a30', margin: '4px 0 20px 0' }}>811</h2>

              {/* Premium SVG Donut Chart */}
              <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '24px' }}>
                <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Outer Background Ring */}
                  <circle cx="100" cy="100" r="80" fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
                  
                  {/* Segments: OPD (Blue), Discharge (Green), IPD (Purple) */}
                  {/* OPD segment: 55% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#4a7cff"
                    strokeWidth="24"
                    strokeDasharray="502.6"
                    strokeDashoffset="226.1"
                  />
                  {/* Discharge segment: 25% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="24"
                    strokeDasharray="502.6"
                    strokeDashoffset="351.8"
                    style={{ transform: 'rotate(198deg)', transformOrigin: '100px 100px' }}
                  />
                  {/* IPD segment: 20% */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#6366f1"
                    strokeWidth="24"
                    strokeDasharray="502.6"
                    strokeDashoffset="402.1"
                    style={{ transform: 'rotate(288deg)', transformOrigin: '100px 100px' }}
                  />
                </svg>
                {/* Center Content */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                    IPD
                  </p>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0c1a30' }}>
                    811
                  </p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#64748b', fontWeight: 600 }}>
                    Total: 2,000
                  </p>
                </div>
              </div>

              {/* Legends */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', padding: '16px 0 0 0', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }}></div>
                  <span>Total Patients</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4a7cff' }}></div>
                  <span>OPD</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                  <span>Discharge</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }}></div>
                  <span>IPD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Right (Hospital Insights Dashboard - Admin)
  const renderHospitalDashboard = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Block */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#0c1a30',
                margin: '0 0 6px 0',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Welcome to Hospital Insights!
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0 }}>
              Real-Time Hospital Metrics And Analytics
            </p>
          </div>
          <button
            style={{
              background: '#0c1a30',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#1a3154')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#0c1a30')}
          >
            <Plus size={16} />
            <span>New Patient</span>
          </button>
        </div>

        {/* Institution Filters Block */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>
            Search Institutuion
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Name of institution</label>
              <select style={inputStyle}>
                <option>{user?.hospitalName || 'City General Hospital'}</option>
                <option>Vyasa Healthcare Center</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Name of Department</label>
              <select style={inputStyle}>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Emergency</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-end', paddingTop: '10px' }}>
              <button style={{ ...btnStyle, background: '#4a7cff', color: '#ffffff' }}>Search</button>
              <button style={{ ...btnStyle, background: '#10b981', color: '#ffffff' }}>Request Access</button>
            </div>
          </div>
        </div>

        {/* 3 Stats KPI Cards in Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '8px' }} className="grid-responsive">
          {/* Card 1: Active Staff */}
          <div style={{
            background: '#ffffff',
            border: '2px solid rgba(74, 124, 255, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(74, 124, 255, 0.03)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#eef2ff', color: '#4a7cff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>Active Staff</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Real-time count of active doctor and nurses</p>
                </div>
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Live
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Doctor Avatar */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="11" r="5" fill="#1e40af" />
                    <path d="M6 26C6 20.4772 10.4772 16 16 16C21.5228 16 26 20.4772 26 26" fill="#1e40af" />
                    <path d="M14 16V22H18V16" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#4a7cff' }}>Doctor: 45</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Nurse Avatar */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="12" r="5" fill="#065f46" />
                    <path d="M6 26C6 20.4772 10.4772 16 16 16C21.5228 16 26 20.4772 26 26" fill="#065f46" />
                    {/* Nurse Cap */}
                    <path d="M12 7H20L19 10H13L12 7Z" fill="#ffffff" stroke="#065f46" strokeWidth="1" />
                    <path d="M16 7V9" stroke="#ef4444" strokeWidth="1" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>Nurses: 65</span>
              </div>
            </div>
          </div>

          {/* Card 2: Clinical Records */}
          <div style={{
            background: '#ffffff',
            border: '2px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.03)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#fff7ed', color: '#f97316', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>Clinical Records</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Overview of recorded NCDs and infections</p>
                </div>
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Live
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Heart Icon */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444' }}>NCD :- 45</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Germs Icon */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316' }}>Infections:- 65</span>
              </div>
            </div>
          </div>

          {/* Card 3: Discharged */}
          <div style={{
            background: '#ffffff',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.03)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#f5f3ff', color: '#8b5cf6', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0c1a30', fontFamily: 'Outfit, sans-serif' }}>Discharged</h4>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Overview of recorded NCDs and infections</p>
                </div>
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                Live
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Discharge Icon */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a7cff" strokeWidth="2.5">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#4a7cff' }}>Discharge:- 45</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* Death Icon */}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 15h8M9 9h.01M15 9h.01" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#f43f5e' }}>Death:- 65</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }} className="grid-responsive">
          {/* Left Chart: OPD Patients Today Line Chart */}
          <div style={panelStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ ...panelTitleStyle, margin: 0 }}>OPD Patients Today</h3>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Real-Time Hospital Metrics And Analytics</span>
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                1.2% <CheckCircle2 size={12} /> VS LAST WEEK
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a7cff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4a7cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Area under curve */}
                <path
                  d="M 0 200 L 0 150 Q 80 130 150 160 T 300 80 T 420 120 L 500 60 L 500 200 Z"
                  fill="url(#chartGradient)"
                />
                {/* Smooth Curve */}
                <path
                  d="M 0 150 Q 80 130 150 160 T 300 80 T 420 120 L 500 60"
                  fill="none"
                  stroke="#4a7cff"
                  strokeWidth="3.5"
                />

                {/* Hotspot/Tooltip Point */}
                <circle cx="300" cy="80" r="6" fill="#4a7cff" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Tooltip Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '25px',
                  left: '52%',
                  transform: 'translateX(-50%)',
                  background: '#0c1a30',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: '11px',
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: '9px', textTransform: 'uppercase', marginBottom: '2px' }}>11.45 AM</div>
                <div>Patients: 10</div>
              </div>
            </div>

            {/* X-Axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px 0 10px', fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
              <span>8 AM</span>
              <span>10 AM</span>
              <span>12 PM</span>
              <span>2 PM</span>
              <span>4 PM</span>
              <span>6 PM</span>
              <span>8 PM</span>
            </div>
          </div>

          {/* Right Chart: Patient Distribution by Department Pie Chart */}
          <div style={panelStyle}>
            <h3 style={{ ...panelTitleStyle, marginBottom: '20px' }}>Patient Distribution by Department</h3>
            
            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px auto' }}>
              <svg width="180" height="180" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                {/* Outer Ring */}
                <circle cx="100" cy="100" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                
                {/* OPD Today: Green segment */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="439.8"
                  strokeDashoffset="220"
                />
                
                {/* IPD Today: Red segment */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray="439.8"
                  strokeDashoffset="308"
                  style={{ transform: 'rotate(180deg)', transformOrigin: '100px 100px' }}
                />

                {/* Emergency: Orange segment */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="20"
                  strokeDasharray="439.8"
                  strokeDashoffset="352"
                  style={{ transform: 'rotate(288deg)', transformOrigin: '100px 100px' }}
                />
              </svg>

              {/* Center Content / Tooltip Overlay inside the donut hole */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#0c1a30',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: '11px',
                  fontWeight: 700,
                  pointerEvents: 'none',
                  textAlign: 'center',
                  minWidth: '90px'
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: '9px', textTransform: 'uppercase', marginBottom: '2px' }}>OPD Today</div>
                <div>2,000</div>
              </div>
            </div>

            {/* Department Split Legends */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '11px', fontWeight: 600, color: '#475569', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <span>OPD Today</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                <span>IPD Today</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <span>Emergency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid of 6 Progress Rings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Beds Occupancy', value: '79%', desc: '142 / 180', color: '#4a7cff', offset: 52.8 },
            { label: 'OPD/Day Footfall', value: '79%', desc: '142 / 180', color: '#8b5cf6', offset: 52.8 },
            { label: 'Total Admitted', value: '79%', desc: '142 / 180', color: '#14b8a6', offset: 52.8 },
            { label: 'Operations Done', value: '79%', desc: '142 / 180', color: '#10b981', offset: 52.8 },
            { label: 'Discharged', value: '79%', desc: '142 / 180', color: '#f59e0b', offset: 52.8 },
            { label: 'Deaths', value: '79%', desc: '142 / 180', color: '#ef4444', offset: 52.8 },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
              }}
            >
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                {item.label}
              </span>
              
              {/* SVG Circular Progress Ring */}
              <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '10px' }}>
                <svg width="90" height="90" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray="251.3"
                    strokeDashoffset={item.offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#0c1a30',
                  }}
                >
                  {item.value}
                </div>
              </div>

              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return role === 'Admin' ? renderHospitalDashboard() : renderDoctorDashboard();
};

/* Core Styled Component Tokens & Reusable CSS Objects */
const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)',
  transition: 'all 0.25s ease',
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 700,
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '6px',
};

const cardValueStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 800,
  color: '#0c1a30',
  margin: '0 0 8px 0',
  fontFamily: 'Outfit, sans-serif',
};

const cardBadgeStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  padding: '3px 8px',
  borderRadius: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
};

const cardIconWrapperStyle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const panelStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
};

const panelHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const panelTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 800,
  color: '#0c1a30',
  fontFamily: 'Outfit, sans-serif',
  margin: 0,
};

const panelActionBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#4a7cff',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '13px',
  fontWeight: 500,
  color: '#0c1a30',
  outline: 'none',
  background: '#ffffff',
};

const btnStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '8px',
  padding: '10px 18px',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s',
};

export default Dashboard;
