import axios from "axios";

const BASE_URL = "http://localhost:7000/api/employees";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPendingEmployeeRequests = async () => {
  const response = await axios.get(
    `${BASE_URL}/pending`,
    getAuthConfig()
  );

  return response.data;
};

export const reviewEmployeeRequest = async (employeeId, data) => {
  const response = await axios.patch(
    `${BASE_URL}/${employeeId}/review`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const getEmployees = async (params = {}) => {
  const response = await axios.get(BASE_URL, {
    ...getAuthConfig(),
    params,
  });

  return response.data;
};

export const updateEmployeeStatus = async (employeeId, status) => {
  const response = await axios.patch(
    `${BASE_URL}/${employeeId}/status`,
    { status },
    getAuthConfig()
  );

  return response.data;
};

export const updateEmployeeDetails = async (employeeId, data) => {
  const response = await axios.patch(
    `${BASE_URL}/${employeeId}`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const updateMyPhone = async (phone) => {
  const response = await axios.patch(
    `${BASE_URL}/me/phone`,
    { phone },
    getAuthConfig()
  );

  return response.data;
};