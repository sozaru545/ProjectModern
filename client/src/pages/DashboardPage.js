import { useEffect, useState } from "react";
import { getPlayers } from "../api/players";
import { getTeams } from "../api/teams";

function DashboardPage() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const playerData = await getPlayers();
      const teamData = await getTeams();

      setPlayers(playerData);
      setTeams(teamData);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>NBA Statistics Dashboard</h1>
      <p>Welcome to the analytics platform.</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>{players.length}</h2>
          <p>Total Players</p>
        </div>

        <div style={styles.card}>
          <h2>{teams.length}</h2>
          <p>Total Teams</p>
        </div>

        <div style={styles.card}>
          <h2>{teams.filter(t => t.conference === "East").length}</h2>
          <p>Eastern Teams</p>
        </div>

        <div style={styles.card}>
          <h2>{teams.filter(t => t.conference === "West").length}</h2>
          <p>Western Teams</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
  }
};

export default DashboardPage;