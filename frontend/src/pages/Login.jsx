import React, { useState } from "react";
import { loginReq } from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginReq(email, password);

      // backend: { success, message, data: { token, user } }
      const token = res.data?.data?.token;

      if (!token) throw new Error("Token missing in response");

      onLogin(token);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "60px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ margin: 0, marginBottom: 12 }}>Sign in</h2>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
          }}
        />

        <button
          disabled={loading}
          type="submit"
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            background: "#111827",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && <div style={{ color: "#b91c1c" }}>{error}</div>}

        <div style={{ fontSize: 13, color: "#6b7280" }}>
          Test: john.doe@example.com / password123
        </div>
      </form>
    </div>
  );
}
