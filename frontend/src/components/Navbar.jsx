import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ token, onLogout, cartCount }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#111827",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <Link
          to="/products"
          style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}
        >
          Marketplace
        </Link>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link
          to="/products"
          style={{ color: "#cbd5e1', textDecoration: 'none" }}
        >
          <span style={{ color: "#e5e7eb" }}>Products</span>
        </Link>

        <Link to="/cart" style={{ color: "#e5e7eb", textDecoration: "none" }}>
          <span>🛒 {cartCount}</span>
        </Link>

        {token ? (
          <button
            onClick={onLogout}
            style={{
              marginLeft: 8,
              padding: "6px 12px",
              background: "#ef4444",
              border: "none",
              color: "white",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{ color: "#e5e7eb", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
