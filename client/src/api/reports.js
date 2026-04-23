import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getReports = async () => {
  const response = await axios.get(
    `${API_BASE}/reports`,
    getAuthHeaders()
  );

  return response.data.reports || [];
};

export const createReport = async (reportData) => {
  const response = await axios.post(
    `${API_BASE}/reports`,
    reportData,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteReport = async (id) => {
  const response = await axios.delete(
    `${API_BASE}/reports/${id}`,
    getAuthHeaders()
  );

  return response.data;
};