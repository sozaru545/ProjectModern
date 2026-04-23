import { useEffect, useState } from "react";
import { getReports, createReport, deleteReport } from "../api/reports";

function ReportsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content are required.");
      return;
    }

    try {
      await createReport({ title, content });
      setTitle("");
      setContent("");
      setMessage("Report created successfully.");
      fetchReports();
    } catch (error) {
      setMessage("Failed to create report.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      setMessage("Report deleted successfully.");
      fetchReports();
    } catch (error) {
      setMessage("Failed to delete report.");
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Reports</h1>
        <p>You must be logged in to manage reports.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Reports</h1>
      <p>Create and manage basketball analytics reports.</p>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Report title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Write your report..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleCreate} style={styles.button}>
          Create Report
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      <div style={{ marginTop: "30px" }}>
        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No reports created yet.</p>
        ) : (
          reports.map((report) => (
            <div key={report._id || report.id} style={styles.card}>
              <h3>{report.title}</h3>
              <p>{report.content}</p>

              {report.createdAt && (
                <small>{new Date(report.createdAt).toLocaleString()}</small>
              )}

              <br />

              <button
                onClick={() => handleDelete(report._id || report.id)}
                style={styles.delete}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "500px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "12px",
    minHeight: "120px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px"
  },
  delete: {
    marginTop: "10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold"
  }
};

export default ReportsPage;