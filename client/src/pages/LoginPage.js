import { useState } from "react";
import { loginUser } from "../api/auth";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <div>
      <h1>Login</h1>

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

        <button type="submit">Login</button>
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

export default LoginPage;