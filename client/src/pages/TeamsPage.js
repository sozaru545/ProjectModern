import { useEffect, useState } from "react";
import { getTeams } from "../api/teams";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <h2>Loading teams...</h2>;

  return (
    <div>
      <h1>Teams</h1>

      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team._id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{team.name}</h3>
            <p>Abbreviation: {team.abbreviation}</p>
            <p>Conference: {team.conference}</p>
            <p>Division: {team.division}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TeamsPage;