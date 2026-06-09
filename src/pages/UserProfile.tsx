import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Building,
  Activity,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  LogOut
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out securely.', 'success');
    } catch (err) {
      addToast('Logout error.', 'error');
    }
  };

  if (!user) {
    return (
      <div style={containerStyle}>
        <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 600 }}>No active session found.</p>
      </div>
    );
  }

  const isDoctor = user.role === 'Doctor';

  const renderDoctorProfile = () => {
    const profile = user.doctorProfile || {};
    const degrees = profile.degrees || [];
    const opdTimings = profile.opdTimings || {};

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Banner Card */}
        <div style={{ ...bannerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={avatarContainerStyle}>
            <div style={avatarStyle}>
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={profileNameStyle}>{user.fullName}</h2>
              <p style={profileRoleStyle}>{profile.specialization || 'General Practitioner'} • {profile.experienceYears || '5 Years'} Exp</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span style={badgeStyle}><ShieldCheck size={12} /> Verified Clinician</span>
                <span style={{ ...badgeStyle, background: '#ecfdf5', color: '#10b981' }}>Active</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: '#f43f5e',
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
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.2)',
            }}
          >
            <LogOut size={16} />
            <span>Secure Logout</span>
          </button>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
          {/* Left Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Personal Information */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Personal Information</h3>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Full Name</span>
                  <div style={infoValueStyle}><UserIcon size={14} style={iconStyle} /> {profile.title || 'Dr.'} {user.fullName}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Date of Birth</span>
                  <div style={infoValueStyle}><Calendar size={14} style={iconStyle} /> {profile.dob || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Gender</span>
                  <div style={infoValueStyle}><UserIcon size={14} style={iconStyle} /> {profile.gender || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Nationality</span>
                  <div style={infoValueStyle}><Activity size={14} style={iconStyle} /> {profile.nationality || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Languages Spoken</span>
                  <div style={infoValueStyle}>
                    <Activity size={14} style={iconStyle} />{' '}
                    {Array.isArray(profile.languages) ? profile.languages.join(', ') : profile.languages || 'Not Provided'}
                  </div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Email Address</span>
                  <div style={infoValueStyle}><Mail size={14} style={iconStyle} /> {user.email}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Phone Number</span>
                  <div style={infoValueStyle}><Phone size={14} style={iconStyle} /> {profile.phone || user.phone || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>WhatsApp Number</span>
                  <div style={infoValueStyle}><Phone size={14} style={iconStyle} /> {profile.whatsappNumber || 'Not Provided'}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '16px', paddingTop: '16px' }}>
                <span style={infoLabelStyle}>Residential Address</span>
                <div style={{ ...infoValueStyle, marginTop: '4px' }}>
                  <MapPin size={14} style={iconStyle} />{' '}
                  {profile.address
                    ? `${profile.address}, ${profile.district || ''}, ${profile.cityState || ''} - ${profile.pinCode || ''}`
                    : 'Not Provided'}
                </div>
              </div>
            </div>

            {/* Professional Credentials */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Professional Credentials</h3>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Medical Council Registration</span>
                  <div style={infoValueStyle}><Award size={14} style={iconStyle} /> {profile.registrationNumber || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Medical Council</span>
                  <div style={infoValueStyle}><Building size={14} style={iconStyle} /> {profile.medicalCouncil || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Date of Registration</span>
                  <div style={infoValueStyle}><Calendar size={14} style={iconStyle} /> {profile.dateOfRegistration || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Years of Experience</span>
                  <div style={infoValueStyle}><Briefcase size={14} style={iconStyle} /> {profile.experienceYears || 'Not Provided'}</div>
                </div>
              </div>

              {/* Degrees List */}
              <div style={{ marginTop: '20px' }}>
                <span style={infoLabelStyle}>Degrees & Qualifications</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                  {degrees.length > 0 ? (
                    degrees.map((deg: any, i: number) => (
                      <div key={i} style={qualificationBadgeStyle}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#0c1a30' }}>
                            {deg.degree} in {deg.specialization || 'General Medicine'}
                          </p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                            {deg.college}, {deg.university} ({deg.country || 'India'})
                          </p>
                        </div>
                        <span style={yearBadgeStyle}>{deg.year}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No qualification degrees configured.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Clinic Details */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Clinic Setup</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={infoLabelStyle}>Clinic Name</span>
                  <div style={{ ...infoValueStyle, fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>
                    <Building size={14} style={iconStyle} /> {profile.clinicName || 'Not Provided'}
                  </div>
                </div>
                <div>
                  <span style={infoLabelStyle}>Clinic Address</span>
                  <div style={{ ...infoValueStyle, marginTop: '2px' }}>
                    <MapPin size={14} style={iconStyle} /> {profile.clinicAddress || 'Not Provided'}
                  </div>
                </div>
                <div>
                  <span style={infoLabelStyle}>Consultation Fee</span>
                  <div style={{ ...infoValueStyle, color: '#10b981', fontWeight: 700, fontSize: '15px', marginTop: '2px' }}>
                    {profile.consultationFee || 'Not Provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* OPD Timing Schedule */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>OPD Timing Availability</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.keys(opdTimings).length > 0 ? (
                  Object.keys(opdTimings).map((day) => {
                    const t = opdTimings[day];
                    return (
                      <div key={day} style={scheduleRowStyle}>
                        <span style={{ fontWeight: 700, color: t.active ? '#0c1a30' : '#94a3b8' }}>{day}</span>
                        {t.active ? (
                          <span style={{ color: '#4a7cff', fontWeight: 600 }}>
                            {t.start} - {t.end}
                          </span>
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 600 }}>Closed</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No OPD schedules configured.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHospitalProfile = () => {
    const profile = user.hospitalProfile || {};
    const services = profile.servicesOffered || [];
    const insurances = profile.supportedInsurances || [];
    const doctors = profile.attachedDoctors || [];
    const nurses = profile.attachedNurses || [];
    const staff = profile.attachedStaff || [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Banner Card */}
        <div style={{ ...bannerStyle, background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={avatarContainerStyle}>
            <div style={{ ...avatarStyle, background: '#eff6ff', color: '#3b82f6', border: '2.5px solid #3b82f6' }}>
              <Building size={24} />
            </div>
            <div>
              <h2 style={profileNameStyle}>{profile.institutionName || user.fullName}</h2>
              <p style={profileRoleStyle}>Hospital Authority Workspace • Establish: {profile.establishmentYears || 'Not Provided'}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span style={badgeStyle}><ShieldCheck size={12} /> Registered Institution</span>
                <span style={{ ...badgeStyle, background: '#ecfdf5', color: '#10b981' }}>Active</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: '#f43f5e',
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
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.2)',
            }}
          >
            <LogOut size={16} />
            <span>Secure Logout</span>
          </button>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="grid-responsive">
          {/* Left Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Institution Details */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Institution Details</h3>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Institution Name</span>
                  <div style={infoValueStyle}><Building size={14} style={iconStyle} /> {profile.institutionName || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Legal Status</span>
                  <div style={infoValueStyle}><Activity size={14} style={iconStyle} /> {profile.legalStatus || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>License Number</span>
                  <div style={infoValueStyle}><Award size={14} style={iconStyle} /> {profile.licenseNumber || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>GST Number</span>
                  <div style={infoValueStyle}><Award size={14} style={iconStyle} /> {profile.gstNumber || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Contact Phone</span>
                  <div style={infoValueStyle}><Phone size={14} style={iconStyle} /> {profile.phone || user.phone || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Facility Email</span>
                  <div style={infoValueStyle}><Mail size={14} style={iconStyle} /> {profile.institutionEmail || user.email || 'Not Provided'}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '16px', paddingTop: '16px' }}>
                <span style={infoLabelStyle}>Facility Address</span>
                <div style={{ ...infoValueStyle, marginTop: '4px' }}>
                  <MapPin size={14} style={iconStyle} /> {profile.address || 'Not Provided'}
                </div>
              </div>
            </div>

            {/* Admin (Institutional Owner) Info */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Admin / Institutional Owner Info</h3>
              <div style={infoGridStyle}>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Name</span>
                  <div style={infoValueStyle}><UserIcon size={14} style={iconStyle} /> {profile.adminName || user.fullName}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Age</span>
                  <div style={infoValueStyle}><Activity size={14} style={iconStyle} /> {profile.adminAge || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Gender</span>
                  <div style={infoValueStyle}><UserIcon size={14} style={iconStyle} /> {profile.adminGender || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Date of Birth</span>
                  <div style={infoValueStyle}><Calendar size={14} style={iconStyle} /> {profile.adminDob || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Phone Number</span>
                  <div style={infoValueStyle}><Phone size={14} style={iconStyle} /> {profile.adminPhone || user.phone || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Email Address</span>
                  <div style={infoValueStyle}><Mail size={14} style={iconStyle} /> {profile.adminEmail || user.email || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Department</span>
                  <div style={infoValueStyle}><Briefcase size={14} style={iconStyle} /> {profile.adminDept || 'Not Provided'}</div>
                </div>
                <div style={infoItemStyle}>
                  <span style={infoLabelStyle}>Designation</span>
                  <div style={infoValueStyle}><Briefcase size={14} style={iconStyle} /> {profile.adminDesignation || 'Not Provided'}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '16px', paddingTop: '16px' }}>
                <span style={infoLabelStyle}>Admin Address</span>
                <div style={{ ...infoValueStyle, marginTop: '4px' }}>
                  <MapPin size={14} style={iconStyle} /> {profile.adminAddress || 'Not Provided'}
                </div>
              </div>
            </div>

            {/* Attached Doctors Directory */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ ...sectionTitleStyle, margin: 0 }}>Attached Doctors Directory</h3>
                <span style={{ fontSize: '11px', color: '#4a7cff', fontWeight: 700, background: '#f0f4ff', padding: '3px 8px', borderRadius: '12px' }}>
                  Total: {doctors.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {doctors.length > 0 ? (
                  doctors.map((doc: any, i: number) => (
                    <div key={i} style={directoryRowStyle}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: '#0c1a30' }}>
                          {doc.title || 'Dr.'} {doc.name}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                          {doc.designation || 'Consultant'} • {doc.department || 'Outpatient Unit'}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', display: 'block', marginBottom: '4px' }}>
                          {doc.degree || 'MBBS'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>{doc.speciality || 'Fee Configured'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No attached doctors configured.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Services Offered */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Services Offered</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {services.length > 0 ? (
                  services.map((service: string) => (
                    <span key={service} style={serviceBadgeStyle}>
                      <CheckCircle size={12} /> {service}
                    </span>
                  ))
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No services specified.</p>
                )}
              </div>
            </div>

            {/* Attached Nurses & Staff */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Nurses & Support Staff</h3>
              
              {/* Nurses */}
              <div style={{ marginBottom: '16px' }}>
                <span style={infoLabelStyle}>Nurses ({nurses.length})</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {nurses.map((nurse: any, i: number) => (
                    <div key={i} style={staffItemStyle}>
                      <span style={{ fontWeight: 600, color: '#0c1a30' }}>{nurse.name}</span>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>{nurse.shift || 'Day Shift'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Staff */}
              <div>
                <span style={infoLabelStyle}>Other Staff ({staff.length})</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {staff.map((member: any, i: number) => (
                    <div key={i} style={staffItemStyle}>
                      <span style={{ fontWeight: 600, color: '#0c1a30' }}>{member.name}</span>
                      <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{member.role || 'Pharmacist'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurance Companies */}
            <div style={cardStyle}>
              <h3 style={sectionTitleStyle}>Supported Insurances</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {insurances.length > 0 ? (
                  insurances.map((ins: string) => (
                    <div key={ins} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                      <span>{ins}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No insurance companies configured.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {isDoctor ? renderDoctorProfile() : renderHospitalProfile()}
    </div>
  );
};

/* Component Styles */
const containerStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  animation: 'fade-in 0.3s ease',
};

const bannerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  color: '#ffffff',
  borderRadius: '16px',
  padding: '28px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
};

const avatarContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const avatarStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  background: '#eff6ff',
  color: '#4a7cff',
  border: '2.5px solid #4a7cff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '24px',
};

const profileNameStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '22px',
  fontWeight: 800,
  fontFamily: 'Outfit, sans-serif',
};

const profileRoleStyle: React.CSSProperties = {
  margin: '2px 0 0 0',
  fontSize: '13px',
  color: '#94a3b8',
  fontWeight: 600,
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: 700,
  background: 'rgba(255,255,255,0.1)',
  padding: '3px 8px',
  borderRadius: '12px',
  color: '#ffffff',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 800,
  color: '#0c1a30',
  fontFamily: 'Outfit, sans-serif',
  margin: '0 0 16px 0',
};

const infoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const infoItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 700,
  textTransform: 'uppercase',
};

const infoValueStyle: React.CSSProperties = {
  fontSize: '13.5px',
  color: '#0f172a',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const iconStyle: React.CSSProperties = {
  color: '#64748b',
};

const qualificationBadgeStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: '#f8fafc',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
};

const yearBadgeStyle: React.CSSProperties = {
  background: '#4a7cff',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: '6px',
};

const scheduleRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #f1f5f9',
  fontSize: '13px',
};

const serviceBadgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: '#ecfdf5',
  color: '#10b981',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 700,
  border: '1.5px solid #a7f3d0',
};

const directoryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: '#f8fafc',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
};

const staffItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#f8fafc',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '12.5px',
  border: '1px solid #f1f5f9',
};

export default UserProfile;
