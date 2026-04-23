import { useEffect, useState } from "react";
import { getPlayers } from "../api/players";
import { createFavorite } from "../api/favorites";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        setMessage("Failed to load players.");
      }
    };

    fetchPlayers();
  }, []);

  const saveFavorite = async (playerId) => {
    if (!user) {
      setMessage("You must be logged in to add favorites.");
      return;
    }

    try {
      await createFavorite(playerId);
      setMessage("Added to favorites!");
    } catch (error) {
      setMessage("Failed to add favorite.");
    }
  };

  const filteredPlayers = players.filter((player) =>
    `${player.firstName} ${player.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Players</h1>

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {message && <p style={styles.message}>{message}</p>}

      {filteredPlayers.length === 0 ? (
        <p>No players found.</p>
      ) : (
        filteredPlayers.map((player) => (
          <div key={player._id} style={styles.card}>
            <h3>
              {player.firstName} {player.lastName}
            </h3>
            <p>Player ID: {player.playerId}</p>
            <p>Team ID: {player.teamId}</p>

            <button
              onClick={() => saveFavorite(player.playerId)}
              style={styles.button}
            >
              Add to Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  input: {
    padding: "12px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  card: {
    background: "white",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  button: {
    marginTop: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  message: {
    marginBottom: "15px",
    fontWeight: "bold"
  }
};

export default PlayersPage;