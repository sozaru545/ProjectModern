import { useState } from "react";
import { registerUser } from "../api/auth";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "fan"
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="fan">Fan</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px"
  }
};

export default RegisterPage;