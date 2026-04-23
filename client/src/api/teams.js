import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getTeams = async () => {
  const response = await axios.get(`${API_BASE}/teams`);
  return response.data.teams || [];
};