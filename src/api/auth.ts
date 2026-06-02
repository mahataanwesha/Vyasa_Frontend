const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Pharmacist' | 'Lab Technician';
  phone?: string;
  hospitalName?: string;
  profileCompleted?: boolean;
  doctorProfile?: any;
  hospitalProfile?: any;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Global fetch wrapper that automatically passes cookies
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // CRITICAL: Ensures httpOnly cookies are stored/sent
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data as T;
};

export const authApi = {
  signup: (userData: Omit<User, 'id'> & { password?: string }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: (credentials: { email?: string; password?: string }): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe: (): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/me', {
      method: 'GET',
    });
  },

  updateDoctorProfile: (doctorProfile: any): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/doctor-profile', {
      method: 'POST',
      body: JSON.stringify({ doctorProfile }),
    });
  },

  updateHospitalProfile: (hospitalProfile: any): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/hospital-profile', {
      method: 'POST',
      body: JSON.stringify({ hospitalProfile }),
    });
  },

  logout: (): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/logout', {
      method: 'POST',
    });
  },
};
