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

export const getFavorites = async () => {
  const response = await axios.get(
    `${API_BASE}/favorites`,
    getAuthHeaders()
  );

  return response.data.favorites || [];
};

export const createFavorite = async (playerId) => {
  const response = await axios.post(
    `${API_BASE}/favorites`,
    { playerId },
    getAuthHeaders()
  );

  return response.data;
};

export const deleteFavorite = async (playerId) => {
  const response = await axios.delete(
    `${API_BASE}/favorites/${playerId}`,
    getAuthHeaders()
  );

  return response.data;
};