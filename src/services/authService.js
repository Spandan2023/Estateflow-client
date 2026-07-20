import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const signupUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/signup`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};