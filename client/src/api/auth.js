import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_BASE}/auth/register`,
    userData
  );
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_BASE}/auth/login`,
    userData
  );
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_BASE}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};