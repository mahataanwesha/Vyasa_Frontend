import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import {
  VyasaLogo,
  DoctorIllustration,
  HospitalIllustration,
  WatermarkStethoscope,
} from '../components/Icons';
import { auth, googleProvider } from '../config/firebase';
import {
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { ArrowLeft, Loader2, Eye, EyeOff, Phone, Chrome } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const Login: React.FC = () => {
  // Navigation states
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Selection state
  const [selectedRole, setSelectedRole] = useState<'Doctor' | 'Admin'>('Doctor');
  
  // Auth Method: 'email' | 'phone'
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  
  // OTP Verification states
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  
  // Role selector for Hospital/Staff signup
  const [signupRole, setSignupRole] = useState<'Admin' | 'Doctor' | 'Nurse' | 'Pharmacist' | 'Lab Technician'>('Admin');
  
  // Utility states
  const [showPassword, setShowPassword] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);

  // Zustand Store
  const { login, signup, isLoading } = useAuthStore();
  const { addToast } = useToastStore();

  const handleNextStep = () => {
    setStep('form');
  };

  // 1. Core Email + Password Authenticator
  const handleEmailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill in all credentials.', 'warning');
      return;
    }

    try {
      if (authMode === 'login') {
        await login({ email, password });
        addToast('Welcome back to VYASA!', 'success');
      } else {
        if (!fullName) {
          addToast('Full name is required for registration.', 'warning');
          return;
        }
        if (password !== confirmPassword) {
          addToast('Passwords do not match.', 'error');
          return;
        }
        await signup({
          email,
          password,
          fullName,
          role: selectedRole === 'Doctor' ? 'Doctor' : signupRole,
          phone: phone || undefined,
          hospitalName: selectedRole === 'Admin' ? hospitalName : undefined,
        });
        addToast('Registration successful!', 'success');
      }
    } catch (err: any) {
      addToast(err.message || 'Authentication failed.', 'error');
    }
  };

  // 2. Firebase Google Sign-In Authenticator
  const handleGoogleSignIn = async () => {
    setCustomLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userFirebase = result.user;

      if (!userFirebase.email) {
        throw new Error('Google account did not provide an email address.');
      }

      // Synchronize authenticated session details with the Express backend
      const response = await fetch(`${API_URL}/auth/firebase-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: userFirebase.email,
          fullName: userFirebase.displayName || userFirebase.email.split('@')[0],
          uid: userFirebase.uid,
          role: selectedRole === 'Doctor' ? 'Doctor' : signupRole,
          phone: userFirebase.phoneNumber || undefined,
          hospitalName: selectedRole === 'Admin' ? hospitalName || 'Associated Hospital' : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Database synchronization failed.');
      }

      // Populate Zustand store
      useAuthStore.setState({ user: data.user, isAuthenticated: true, isLoading: false });
      addToast('Authenticated with Google successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Google authentication failed.', 'error');
    } finally {
      setCustomLoading(false);
    }
  };

  // Initialize Recaptcha element for Phone verification
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-anchor', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA resolved.');
          }
        });
      } catch (err) {
        console.error('reCAPTCHA config failed', err);
      }
    }
  };

  // 3. Send SMS Verification (OTP) via Firebase
  const handleSendOTP = async () => {
    if (!phone) {
      addToast('Please enter a valid phone number with country code (e.g. +15551234567).', 'warning');
      return;
    }

    setCustomLoading(true);
    try {
      setupRecaptcha();
      const verifier = (window as any).recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      
      setConfirmationResult(confirmation);
      setOtpSent(true);
      addToast('SMS Verification OTP code dispatched!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Error dispatching SMS OTP. Double check format.', 'error');
    } finally {
      setCustomLoading(false);
    }
  };

  // 4. Verify OTP Code & Register/Login on Backend
  const handleVerifyOTP = async () => {
    if (!otpCode) {
      addToast('Please enter the 6-digit OTP code received.', 'warning');
      return;
    }

    setCustomLoading(true);
    try {
      const result = await confirmationResult.confirm(otpCode);
      const userFirebase = result.user;

      // Automatically register/sign-in this phone number on our Node backend
      const response = await fetch(`${API_URL}/auth/firebase-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phone: phone,
          email: userFirebase.email || `${phone}@nurselink.phone`,
          fullName: fullName || 'Clinician Staff Member',
          uid: userFirebase.uid,
          role: selectedRole === 'Doctor' ? 'Doctor' : signupRole,
          hospitalName: selectedRole === 'Admin' ? hospitalName || 'Associated Hospital' : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'OTP validation synchronization failed.');
      }

      useAuthStore.setState({ user: data.user, isAuthenticated: true, isLoading: false });
      addToast('Authenticated via Phone OTP successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Invalid or expired OTP verification code.', 'error');
    } finally {
      setCustomLoading(false);
    }
  };

  const isFormLoading = isLoading || customLoading;

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Hidden anchor needed for Firebase Recaptcha */}
      <div id="recaptcha-anchor"></div>

      {/* Background Watermark decorations */}
      <div style={{ position: 'absolute', right: '-120px', top: '10%', opacity: 0.08, zIndex: 1 }}>
        <WatermarkStethoscope />
      </div>
      <div style={{ position: 'absolute', left: '-150px', bottom: '5%', opacity: 0.06, zIndex: 1 }}>
        <WatermarkStethoscope />
      </div>

      {/* Brand Stethoscope Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '20px',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <VyasaLogo />
        <h1
          style={{
            color: '#ffffff',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '1px',
            marginTop: '4px',
          }}
        >
          VYASA
        </h1>
      </div>

      {/* Main card */}
      <div
        className="animate-slide-up"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '480px',
          padding: '36px',
          zIndex: 2,
          transition: 'all 0.3s ease',
        }}
      >
        {step === 'select' ? (
          /* STEP 1: SELECT ROLE OPTIONS */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2
              style={{
                color: '#0c1a30',
                fontSize: '24px',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '6px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Sign Up
            </h2>
            <p
              style={{
                color: '#5e6e85',
                fontSize: '14px',
                fontWeight: 500,
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              Secure Login for Doctors & Hospitals
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%',
                marginBottom: '32px',
              }}
            >
              {/* Doctor Selector */}
              <div
                onClick={() => setSelectedRole('Doctor')}
                style={{
                  border: selectedRole === 'Doctor' ? '2.5px solid #4a7cff' : '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  background: selectedRole === 'Doctor' ? '#f0f4ff' : '#ffffff',
                  transition: 'all 0.25s ease',
                  transform: selectedRole === 'Doctor' ? 'scale(1.02)' : 'none',
                }}
              >
                <DoctorIllustration />
                <span style={{ color: '#0c1a30', fontSize: '13px', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                  Individual Doctor
                </span>
              </div>

              {/* Hospital Selector */}
              <div
                onClick={() => setSelectedRole('Admin')}
                style={{
                  border: selectedRole === 'Admin' ? '2.5px solid #4a7cff' : '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  background: selectedRole === 'Admin' ? '#f0f4ff' : '#ffffff',
                  transition: 'all 0.25s ease',
                  transform: selectedRole === 'Admin' ? 'scale(1.02)' : 'none',
                }}
              >
                <HospitalIllustration />
                <span style={{ color: '#0c1a30', fontSize: '13px', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                  Hospital / Institution
                </span>
              </div>
            </div>

            <button
              onClick={handleNextStep}
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
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 15px rgba(74, 124, 255, 0.3)',
                letterSpacing: '0.5px',
              }}
            >
              NEXT
            </button>
          </div>
        ) : (
          /* STEP 2: CHOOSE METHOD (EMAIL OR PHONE) + AUTH FIELDS */
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => {
                setStep('select');
                setOtpSent(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#5e6e85',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                alignSelf: 'flex-start',
                marginBottom: '20px',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to role select</span>
            </button>

            <h2 style={{ color: '#0c1a30', fontSize: '22px', fontWeight: 700, marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
              {authMode === 'login' ? 'Welcome Back' : 'Sign Up Account'}
            </h2>
            <p style={{ color: '#5e6e85', fontSize: '13px', marginBottom: '24px', fontWeight: 500 }}>
              {selectedRole === 'Doctor' ? 'Individual Doctor Portal' : 'Hospital / Institution Portal'}
            </p>

            {/* TAB SELECTORS: EMAIL OR PHONE NUMBER */}
            <div
              style={{
                display: 'flex',
                background: '#f1f5f9',
                padding: '4px',
                borderRadius: '10px',
                marginBottom: '24px',
              }}
            >
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: authMethod === 'email' ? '#ffffff' : 'transparent',
                  color: authMethod === 'email' ? '#0c1a30' : '#64748b',
                  boxShadow: authMethod === 'email' ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Email & Pass
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: authMethod === 'phone' ? '#ffffff' : 'transparent',
                  color: authMethod === 'phone' ? '#0c1a30' : '#64748b',
                  boxShadow: authMethod === 'phone' ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                Phone (OTP)
              </button>
            </div>

            {authMethod === 'email' ? (
              /* A. EMAIL FORM */
              <form onSubmit={handleEmailFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {authMode === 'signup' && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Dr. John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#0c1a30',
                          fontWeight: 500,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+15551234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#0c1a30',
                          fontWeight: 500,
                          outline: 'none',
                        }}
                      />
                    </div>

                    {selectedRole === 'Admin' && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Hospital Name</label>
                          <input
                            type="text"
                            placeholder="City General Hospital"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            required
                            style={{
                              padding: '12px 14px',
                              borderRadius: '10px',
                              border: '1.5px solid #e2e8f0',
                              fontSize: '14px',
                              color: '#0c1a30',
                              fontWeight: 500,
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Designated Staff Role</label>
                          <select
                            value={signupRole}
                            onChange={(e) => setSignupRole(e.target.value as any)}
                            style={{
                              padding: '12px 14px',
                              borderRadius: '10px',
                              border: '1.5px solid #e2e8f0',
                              fontSize: '14px',
                              color: '#0c1a30',
                              fontWeight: 500,
                              background: '#ffffff',
                              outline: 'none',
                            }}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Pharmacist">Pharmacist</option>
                            <option value="Lab Technician">Lab Technician</option>
                          </select>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="john.doe@nurselink.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '14px',
                      color: '#0c1a30',
                      fontWeight: 500,
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Password</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        paddingRight: '40px',
                        borderRadius: '10px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '14px',
                        color: '#0c1a30',
                        fontWeight: 500,
                        outline: 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '14px',
                        color: '#0c1a30',
                        fontWeight: 500,
                        outline: 'none',
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isFormLoading}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(74, 124, 255, 0.3)',
                    marginTop: '10px',
                  }}
                >
                  {isFormLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Securing entry...</span>
                    </>
                  ) : (
                    <span>{authMode === 'login' ? 'LOGIN' : 'SIGN UP'}</span>
                  )}
                </button>
              </form>
            ) : (
              /* B. FIREBASE PHONE OTP FORM */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {authMode === 'signup' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Dr. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '14px',
                        color: '#0c1a30',
                        fontWeight: 500,
                        outline: 'none',
                      }}
                    />
                  </div>
                )}

                {selectedRole === 'Admin' && authMode === 'signup' && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Hospital Name</label>
                      <input
                        type="text"
                        placeholder="City General Hospital"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#0c1a30',
                          fontWeight: 500,
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Designated Staff Role</label>
                      <select
                        value={signupRole}
                        onChange={(e) => setSignupRole(e.target.value as any)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#0c1a30',
                          fontWeight: 500,
                          background: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                      </select>
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Phone Number (with Country Code)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        type="tel"
                        placeholder="+15551234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
                          borderRadius: '10px',
                          border: '1.5px solid #e2e8f0',
                          fontSize: '14px',
                          color: '#0c1a30',
                          fontWeight: 500,
                          outline: 'none',
                        }}
                      />
                    </div>
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={isFormLoading}
                        style={{
                          background: '#4a7cff',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '0 16px',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {isFormLoading ? <Loader2 size={16} className="animate-spin" /> : 'SEND OTP'}
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                    <label style={{ color: '#0c1a30', fontSize: '12px', fontWeight: 600 }}>Enter 6-Digit OTP Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #4a7cff',
                        fontSize: '16px',
                        letterSpacing: '6px',
                        textAlign: 'center',
                        color: '#0c1a30',
                        fontWeight: 700,
                        outline: 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={isFormLoading}
                      style={{
                        width: '100%',
                        background: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                        marginTop: '10px',
                      }}
                    >
                      {isFormLoading ? <Loader2 size={18} className="animate-spin" /> : 'VERIFY & SIGN UP'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SEPARATOR DIVIDER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
              <span style={{ padding: '0 12px' }}>OR</span>
              <div style={{ flex: 1, height: '1.5px', background: '#cbd5e1' }}></div>
            </div>

            {/* GOOGLE THIRD PARTY LOGIN BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isFormLoading}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#94a3b8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
            >
              <Chrome size={18} style={{ color: '#ea4335' }} />
              <span>Continue with Google</span>
            </button>

            {/* Form Mode Toggle */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  setOtpSent(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4a7cff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {authMode === 'login'
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
