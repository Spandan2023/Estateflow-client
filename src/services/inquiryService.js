import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/inquiries`;

// ==============================
// Create Inquiry (Public)
// ==============================

export const createInquiry = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

// ==============================
// Get All Inquiries (Admin)
// ==============================

export const getAllInquiries = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==============================
// Get Single Inquiry
// ==============================

export const getInquiryById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==============================
// Assign Inquiry
// ==============================

export const assignInquiry = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}/${id}/assign`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==============================
// Update Inquiry Status
// ==============================

export const updateInquiryStatus = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${BASE_URL}/${id}/status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==============================
// Delete Inquiry
// ==============================

export const deleteInquiry = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==============================
// Employee - Get My Assigned Inquiries
// ==============================

export const getMyInquiries = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};