import { SKINCARE_PRODUCTS } from '../data/products';
const USE_MOCK = false;
const BASE_URL = 'https://jaanmak-backend.onrender.com';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || res.statusText);
  }
  return res.json();
};

export const api = {
  products: {
    getAll: async () => { if (USE_MOCK) return SKINCARE_PRODUCTS; const res = await fetch(`${BASE_URL}/products`); return handleResponse(res); },
    create: async (d: any, t: string) => { const res = await fetch(`${BASE_URL}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify(d) }); return handleResponse(res); },
    update: async (id: string, d: any, t: string) => { const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify(d) }); return handleResponse(res); },
    delete: async (id: string, t: string) => { const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } }); if (!res.ok) throw new Error('Failed to delete'); }
  },
  auth: {
    login: async (e: string, p: string) => { const res = await fetch(`${BASE_URL}/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, password: p }) }); return handleResponse(res); },
    register: async (d: any) => { const res = await fetch(`${BASE_URL}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); return handleResponse(res); },
    updateProfile: async (d: any, t: string) => { const res = await fetch(`${BASE_URL}/users/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify(d) }); return handleResponse(res); },
    forgotPassword: async (email: string) => { const res = await fetch(`${BASE_URL}/users/forgot-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); return handleResponse(res); },
    resetPassword: async (e: string, pin: string, p: string) => { const res = await fetch(`${BASE_URL}/users/reset-password`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, pin, password: p }) }); return handleResponse(res); },
    verifyEmail: async (e: string, pin: string) => { const res = await fetch(`${BASE_URL}/users/verify-email`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, pin }) }); return handleResponse(res); }
  },
  users: {
    getAll: async (t: string) => { const res = await fetch(`${BASE_URL}/users`, { headers: { 'Authorization': `Bearer ${t}` } }); return handleResponse(res); },
    delete: async (id: string, t: string) => { const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${t}` } }); if (!res.ok) throw new Error('Failed to delete'); }
  },
  orders: {
    create: async (d: any, t: string) => { const res = await fetch(`${BASE_URL}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify(d) }); return handleResponse(res); },
    verifyPayment: async (oid: string, ref: string, t: string) => { const res = await fetch(`${BASE_URL}/orders/${oid}/pay`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify({ reference: ref }) }); return handleResponse(res); },
    getAll: async (t: string) => { const res = await fetch(`${BASE_URL}/orders`, { headers: { 'Authorization': `Bearer ${t}` } }); return handleResponse(res); },
    getMyOrders: async (t: string) => { const res = await fetch(`${BASE_URL}/orders/myorders`, { headers: { 'Authorization': `Bearer ${t}` } }); return handleResponse(res); },
    updateStatus: async (id: string, status: string, t: string) => { const res = await fetch(`${BASE_URL}/orders/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` }, body: JSON.stringify({ status }) }); return handleResponse(res); },
    cancel: async (id: string, t: string) => { const res = await fetch(`${BASE_URL}/orders/${id}/cancel`, { method: 'PUT', headers: { 'Authorization': `Bearer ${t}` } }); return handleResponse(res); }
  },
  contact: {
    send: async (d: any) => { const res = await fetch(`${BASE_URL}/email`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); return handleResponse(res); }
  }
};
