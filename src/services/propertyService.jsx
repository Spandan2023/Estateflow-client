import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/properties`;

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Admin creates an approved property.
// Employee creates a pending property submission.
export const createProperty = async (formData) => {
  const response = await axios.post(
    BASE_URL,
    formData,
    getAuthConfig()
  );

  return response.data;
};

export const getPublicProperties = async (params = {}) => {
  const response = await axios.get(BASE_URL, { params });

  return response.data;
};

export const getFeaturedProperties = async () => {
  const response = await axios.get(`${BASE_URL}/featured`);

  return response.data;
};

export const getMyPropertySubmissions = async () => {
  const response = await axios.get(
    `${BASE_URL}/my/submissions`,
    getAuthConfig()
  );

  return response.data;
};

export const getAllProperties = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/admin/all`, {
    ...getAuthConfig(),
    params,
  });

  return response.data;
};

export const updateProperty = async (propertyId, formData) => {
  const response = await axios.put(
    `${BASE_URL}/${propertyId}`,
    formData,
    getAuthConfig()
  );

  return response.data;
};

export const reviewProperty = async (propertyId, data) => {
  const response = await axios.patch(
    `${BASE_URL}/${propertyId}/review`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const deleteProperty = async (propertyId) => {
  const response = await axios.delete(
    `${BASE_URL}/${propertyId}`,
    getAuthConfig()
  );

  return response.data;
};