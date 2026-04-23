import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getPlayers = async () => {
  const response = await axios.get(`${API_BASE}/players`);
  return response.data.players || [];
};