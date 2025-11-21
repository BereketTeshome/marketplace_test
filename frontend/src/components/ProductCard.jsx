import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={{ height: 140, overflow: "hidden", borderRadius: 8 }}>
          <img
            src={product.image || "../assets/no.jpg"}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700 }}>{product.name}</div>
          <div style={{ color: "#6b7280" }}>${product.price}</div>
        </div>
      </Link>
    </div>
  );
}
