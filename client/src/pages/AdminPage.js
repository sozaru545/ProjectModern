function AdminPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage system data and platform settings.</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>User Management</h3>
          <p>Manage platform users and roles.</p>
        </div>

        <div style={styles.card}>
          <h3>Player Management</h3>
          <p>Add, edit, or remove players.</p>
        </div>

        <div style={styles.card}>
          <h3>Team Management</h3>
          <p>Add, edit, or remove teams.</p>
        </div>

        <div style={styles.card}>
          <h3>Reports Oversight</h3>
          <p>Review created reports and activity.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
};

export default AdminPage;