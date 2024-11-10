import axios from 'axios';
var BaseUrl = process?.env?.REACT_APP_BASE_URL || null;

const getToken = () => localStorage.getItem('token');

const api = {

  create: async (data) => {
    const token = getToken(); 
    try {
      const response = await axios.post(BaseUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
          'Session': `${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  read: async () => {
    const token = getToken(); 
    try {
      const response = await axios.get(BaseUrl, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Session': `${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  update: async (data) => {
    const token = getToken();  
    try {
      const response = await axios.put(BaseUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Session': `${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async () => {
    const token = getToken(); 
    try {
      const response = await axios.delete(BaseUrl, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Session': `${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
