import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:7000/api" : "")
).replace(/\/+$/, "");

const getBaseUrl = () => {
  if (!API_URL) {
    throw new Error(
      "API URL is missing. Set VITE_API_URL in your Vercel environment variables.",
    );
  }

  return `${API_URL}/inquiries`;
};

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Public - Create Inquiry
export const createInquiry = async (data) => {
  const response = await axios.post(getBaseUrl(), data);
  return response.data;
};

// Admin - Get All Inquiries
export const getAllInquiries = async () => {
  const response = await axios.get(getBaseUrl(), getAuthConfig());
  return response.data;
};

// Admin - Get Single Inquiry
export const getInquiryById = async (id) => {
  const response = await axios.get(
    `${getBaseUrl()}/${id}`,
    getAuthConfig(),
  );

  return response.data;
};

// Admin - Assign Inquiry
export const assignInquiry = async (id, data) => {
  const response = await axios.patch(
    `${getBaseUrl()}/${id}/assign`,
    data,
    getAuthConfig(),
  );

  return response.data;
};

// Admin - Update Inquiry Status
export const updateInquiryStatus = async (id, data) => {
  const response = await axios.patch(
    `${getBaseUrl()}/${id}/status`,
    data,
    getAuthConfig(),
  );

  return response.data;
};

// Admin - Delete Inquiry
export const deleteInquiry = async (id) => {
  const response = await axios.delete(
    `${getBaseUrl()}/${id}`,
    getAuthConfig(),
  );

  return response.data;
};

// Employee - Get My Assigned Inquiries
export const getMyInquiries = async () => {
  const response = await axios.get(
    `${getBaseUrl()}/my`,
    getAuthConfig(),
  );

  return response.data;
};