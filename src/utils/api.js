const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

const commonHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
}

const authHeaders = (token) => ({
  ...commonHeaders,
  'Authorization': `Bearer ${token}`
})

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

// Auth API
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify(userData)
  })
  return handleResponse(response)
}

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/local`, {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify(credentials)
  })
  return handleResponse(response)
}

// Profile API
export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    headers: authHeaders(token)
  })
  return handleResponse(response)
}

export const updateUserProfile = async (profileData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(profileData)
  })
  return handleResponse(response)
}

// Advertisements API
export const fetchAds = async () => {
  const response = await fetch(`${API_BASE_URL}/api/advertisements`, {
    headers: commonHeaders
  })
  return handleResponse(response)
}

// In utils/api.js
export const fetchAdById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/advertisements?id=${id}`, {
    headers: commonHeaders
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to fetch ad with ID ${id}`);
  }
  
  const data = await response.json();
  
  // Since your API returns an array, find the matching ad
  const ad = Array.isArray(data) 
    ? data.find(item => item.id.toString() === id.toString())
    : data;
  
  if (!ad) {
    throw new Error(`Ad with ID ${id} not found`);
  }
  
  return ad;
};

export const createAd = async (adData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/advertisements`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(adData)
  })
  return handleResponse(response)
}

export const deleteAd = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/api/advertisements/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token)
  })
  return handleResponse(response)
}