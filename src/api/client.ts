const API_BASE = 'https://nurselink-backend-8pr3.onrender.com/api';

export const getAuthToken = () => {
  return localStorage.getItem('auth-storage') 
    ? JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.token 
    : null;
};

export async function apiGet(path: string) {
  const token = getAuthToken();
  try {
    const res = await fetch(API_BASE + path, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`[API GET ${path}] ${res.status}:`, err);
      return null;
    }
    return await res.json();
  } catch (e: any) {
    console.error(`[API GET ${path}] Network error:`, e.message);
    return null;
  }
}

export async function apiPost(path: string, body: any) {
  const token = getAuthToken();
  try {
    const res = await fetch(API_BASE + path, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`[API POST ${path}] ${res.status}:`, err);
      return null;
    }
    return await res.json();
  } catch (e: any) {
    console.error(`[API POST ${path}] Network error:`, e.message);
    return null;
  }
}

export async function apiPatch(path: string, body: any) {
  const token = getAuthToken();
  try {
    const res = await fetch(API_BASE + path, {
      method: 'PATCH',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`[API PATCH ${path}] ${res.status}:`, err);
      return null;
    }
    return await res.json();
  } catch (e: any) {
    console.error(`[API PATCH ${path}] Network error:`, e.message);
    return null;
  }
}
