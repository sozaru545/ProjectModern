import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>NBA Analytics</h2>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Dashboard</Link>
        <Link style={styles.link} to="/players">Players</Link>
        <Link style={styles.link} to="/teams">Teams</Link>
        <Link style={styles.link} to="/reports">Reports</Link>
        <Link style={styles.link} to="/compare">Compare</Link>

        {user && (
          <Link style={styles.link} to="/favorites">Favorites</Link>
        )}

        {!user ? (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>
              {user.email} ({user.role})
            </span>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <Link style={styles.link} to="/admin">Admin</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#111827",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },
  user: {
    fontSize: "14px"
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;