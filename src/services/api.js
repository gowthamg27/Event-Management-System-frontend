import axios from 'axios';

const API_URL = 'https://event-management-system-iji2.onrender.com/api';

// Speaker functions
export const createSpeaker = async (speakerData) => {
  const response = await axios.post(`${API_URL}/speakers`, speakerData);
  return response.data;
};

export const getAllSpeakers = async () => {
  const response = await axios.get(`${API_URL}/speakers`);
  return response.data;
};

export const updateSpeaker = async (id, speakerData) => {
  const response = await axios.put(`${API_URL}/speakers/${id}`, speakerData);
  return response.data;
};

export const deleteSpeaker = async (id) => {
  const response = await axios.delete(`${API_URL}/speakers/${id}`);
  return response.data;
};

// Sponsor functions
export const getAllSponsors = async () => {
  try {
    const response = await axios.get(`${API_URL}/sponsors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sponsors:', error.response?.data || error.message);
    throw error;
  }
};

export const getSponsorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sponsors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sponsor:', error.response?.data || error.message);
    throw error;
  }
};

export const createSponsor = async (sponsorData) => {
  try {
    console.log('Sending sponsor data:', sponsorData);
    const response = await axios.post(`${API_URL}/sponsors`, sponsorData);
    return response.data;
  } catch (error) {
    console.error('Error creating sponsor:', error.response?.data || error.message);
    throw error;
  }
};

export const updateSponsor = async (id, sponsorData) => {
  try {
    const response = await axios.put(`${API_URL}/sponsors/${id}`, sponsorData);
    return response.data;
  } catch (error) {
    console.error("Error updating sponsor:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteSponsor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/sponsors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sponsor:', error.response?.data || error.message);
    throw error;
  }
};

export const getSponsorStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/sponsors/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sponsor stats:', error.response?.data || error.message);
    throw error;
  }
};