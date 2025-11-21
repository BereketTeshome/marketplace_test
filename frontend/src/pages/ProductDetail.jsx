import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductReq } from "../services/api";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductReq(id)
      .then((res) => {
        setProduct(res.data?.data); // FIXED HERE
      })
      .catch((err) => {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "Failed to load product"
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: 60 }}>Loading...</div>;
  if (error)
    return (
      <div style={{ color: "#b91c1c", textAlign: "center", marginTop: 60 }}>
        {error}
      </div>
    );
  if (!product)
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        Product not found
      </div>
    );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
      <div style={{ background: "#fff", padding: 18, borderRadius: 8 }}>
        <img
          src={product.image || "https://via.placeholder.com/800"}
          alt={product.name}
          style={{
            width: "100%",
            height: 420,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <h2 style={{ marginTop: 12 }}>{product.name}</h2>
        <p style={{ color: "#6b7280" }}>{product.description}</p>
      </div>

      <aside
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          height: "fit-content",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20 }}>${product.price}</div>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => addToCart(product, 1)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              background: "#111827",
              color: "#fff",
              border: "none",
            }}
          >
            Add to cart
          </button>
        </div>
      </aside>
    </div>
  );
}
