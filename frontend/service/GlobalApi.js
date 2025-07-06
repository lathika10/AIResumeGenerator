import axios from 'axios';

// API Key and Base URL from your .env file
const API_KEY = import.meta.env.VITE_STRAPI_API;
const BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

// Axios instance with default headers
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default {
  // ✅ Get a resume by numeric ID
  getResumeDetailById: async (id) => {
    try {
      const response = await axiosClient.get(`/user-resumes/${id}?populate=*`);
      return response.data;
    } catch (error) {
      console.error('❌ Fetch resume detail error:', error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Create a new resume
 CreateNewResume: async (formData) => {
  try {
    const payload = {
      data: {
        title: formData.title, // ✅ Add this
        firstName: formData.firstName,
        lastName: formData.lastName,
        userEmail: formData.userEmail,
        jobTitle: formData.jobTitle,
        phone: formData.phone,
        address: formData.address,
      }
    };

    console.log("📤 Creating resume with data:", payload);

    const response = await axiosClient.post('/user-resumes', payload);
    return response.data;
  } catch (error) {
    console.error('❌ Create resume error:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message,
      details: error.response?.data?.error?.details,
    });
    throw error;
  }
},

  // ✅ Get all resumes by user email
  GetUserResume: async (userEmail) => {
    try {
      const response = await axiosClient.get(
        `/user-resumes?filters[userEmail][$eq]=${userEmail}&populate=*`
      );
      return response.data;
    } catch (error) {
      console.error('❌ Fetch resumes by email error:', error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Get resume numeric ID using a custom user ID field
  getResumeIdByUserId: async (customUserId) => {
    try {
      const response = await axiosClient.get(
        `/user-resumes?filters[userId][$eq]=${customUserId}`
      );
      const found = response.data?.data?.[0];
      if (!found) throw new Error('Resume not found for userId');
      return found.id;
    } catch (error) {
      console.error('❌ Get resume ID by userId error:', error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Update resume by numeric ID
  updateResumeDetail: async (id, formData) => {
    try {
      const payload = {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          // Add other fields exactly as defined in your Strapi content type
        }
      };

      console.log('🛠 Updating resume ID', id, 'with data:', payload);

      const response = await axiosClient.put(`/user-resumes/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('❌ Full update error:', {
        status: error.response?.status,
        message: error.response?.data?.error?.message,
        details: error.response?.data?.error?.details,
      });
      throw error;
    }
  }
};