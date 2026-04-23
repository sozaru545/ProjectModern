import { useEffect, useState } from "react";
import { getPlayers } from "../api/players";

function ComparePage() {
  const [players, setPlayers] = useState([]);
  const [playerOneId, setPlayerOneId] = useState("");
  const [playerTwoId, setPlayerTwoId] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  const playerOne = players.find(
    (player) => String(player.playerId) === playerOneId
  );

  const playerTwo = players.find(
    (player) => String(player.playerId) === playerTwoId
  );

  return (
    <div>
      <h1>Compare Players</h1>
      <p>Select two players to compare their details.</p>

      <div style={styles.selectRow}>
        <select
          value={playerOneId}
          onChange={(e) => setPlayerOneId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Player 1</option>
          {players.map((player) => (
            <option key={player._id} value={player.playerId}>
              {player.firstName} {player.lastName}
            </option>
          ))}
        </select>

        <select
          value={playerTwoId}
          onChange={(e) => setPlayerTwoId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Player 2</option>
          {players.map((player) => (
            <option key={player._id} value={player.playerId}>
              {player.firstName} {player.lastName}
            </option>
          ))}
        </select>
      </div>

      {playerOne && playerTwo && (
        <div style={styles.compareGrid}>
          <div style={styles.card}>
            <h2>
              {playerOne.firstName} {playerOne.lastName}
            </h2>
            <p>Player ID: {playerOne.playerId}</p>
            <p>Team ID: {playerOne.teamId}</p>
          </div>

          <div style={styles.card}>
            <h2>
              {playerTwo.firstName} {playerTwo.lastName}
            </h2>
            <p>Player ID: {playerTwo.playerId}</p>
            <p>Team ID: {playerTwo.teamId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  selectRow: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  select: {
    padding: "12px",
    width: "260px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
};

export default ComparePage;