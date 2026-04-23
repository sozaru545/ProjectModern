import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../api/favorites";
import { getPlayers } from "../api/players";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favoriteData, playerData] = await Promise.all([
          getFavorites(),
          getPlayers()
        ]);

        setFavorites(favoriteData);
        setPlayers(playerData);
      } catch (error) {
        setMessage("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemove = async (playerId) => {
    try {
      await deleteFavorite(playerId);
      setFavorites((prev) =>
        prev.filter((favorite) => Number(favorite.playerId) !== Number(playerId))
      );
      setMessage("Favorite removed.");
    } catch (error) {
      setMessage("Failed to remove favorite.");
    }
  };

  const favoritePlayers = favorites.map((favorite) => {
    const player = players.find(
      (p) => Number(p.playerId) === Number(favorite.playerId)
    );

    return {
      ...favorite,
      player
    };
  });

  if (!user) {
    return (
      <div>
        <h1>Favorites</h1>
        <p>You must be logged in to view favorites.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>
      <p>View and manage your saved favorite players.</p>

      {message && <p style={styles.message}>{message}</p>}

      {loading ? (
        <p>Loading favorites...</p>
      ) : favoritePlayers.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favoritePlayers.map((favorite) => (
          <div key={favorite._id} style={styles.card}>
            <h3>
              {favorite.player
                ? `${favorite.player.firstName} ${favorite.player.lastName}`
                : `Player ID: ${favorite.playerId}`}
            </h3>

            <p>Player ID: {favorite.playerId}</p>

            {favorite.player && <p>Team ID: {favorite.player.teamId}</p>}

            <button
              onClick={() => handleRemove(favorite.playerId)}
              style={styles.button}
            >
              Remove Favorite
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  button: {
    marginTop: "10px",
    background: "#dc2626",
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

export default FavoritesPage;