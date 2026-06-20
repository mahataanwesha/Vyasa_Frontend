import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

export const InviteRouter: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (!token) {
      addToast('Invalid invite link.', 'error');
      navigate('/login');
      return;
    }

    // Set invite token in localStorage so setup wizards know they are in "Invite Mode"
    localStorage.setItem('vyasa_invite_token', token);
    localStorage.setItem('vyasa_invite_role', role || '');

    // Redirect to correct setup page based on role
    switch (role?.toLowerCase()) {
      case 'doctor':
        navigate('/doctor-setup');
        break;
      case 'nurse':
        navigate('/nurse-setup');
        break;
      case 'pharmacist':
        navigate('/pharmacy-setup');
        break;
      case 'labs':
        navigate('/lab-setup');
        break;
      case 'receptionist':
        // If we don't have a specific wizard yet, maybe use nurse or create a generic one.
        // We will route to nurse setup for now as generic staff, or create one if needed.
        navigate('/receptionist-setup');
        break;
      default:
        addToast('Unknown role in invite link.', 'error');
        navigate('/login');
    }
  }, [role, token, navigate, addToast]);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020d20', color: 'white' }}>
      <h2>Verifying Invite Link...</h2>
    </div>
  );
};
