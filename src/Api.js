import axios from 'axios';

const BaseUrl = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('sessionToken');

const api = {
  create: async (data) => {
    try {
      const response = await axios.post(BaseUrl, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  consume: async (url) => {
    try {
      const response = await axios.get(`${BaseUrl}${url}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  read: async (url) => {
    try {
      const response = await axios.get(`${BaseUrl}${url}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (data, url) => {
    try {
      const response = await axios.put(`${BaseUrl}${url}`, data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(`${BaseUrl}${url}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};


const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Session': `${token}`,
  };
};

const handleError = (error) => {
  throw error.response?.data || error.message;
};

export default api;
