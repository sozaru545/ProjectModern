import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getPlayers = async () => {
  const response = await axios.get(`${API_BASE}/players`);
  return response.data.players || [];
};