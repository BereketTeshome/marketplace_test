import React, { useEffect, useState } from "react";
import { getProductsReq } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductsReq()
      .then((res) => {
        if (!mounted) return;
        const p = res.data?.data?.products || res.data?.products || [];
        setProducts(p);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load products"
        );
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#b91c1c", textAlign: "center", marginTop: 60 }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{ background: "#fff", padding: 12, borderRadius: 8 }}
          >
            <ProductCard product={product} />
            <div style={{ marginTop: 10, textAlign: "center" }}>
              <button
                onClick={() => addToCart(product, 1)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "#111827",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
