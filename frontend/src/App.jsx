import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";

/**
 * App holds token and cart state and passes them down via props only (no Context).
 */
export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cart, setCart] = useState([]); // items: { product, quantity }
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to login if token removed
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const handleLogin = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
    navigate("/products");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCart([]);
    navigate("/login");
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: newQty } : i
      )
    );
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((i) => i.product.id !== productId));

  const clearCart = () => setCart([]);

  // Protected wrapper: simple route-level protection
  const Protected = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        minHeight: "100vh",
        background: "#f7f7f8",
      }}
    >
      <Navbar
        token={token}
        onLogout={handleLogout}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      <main style={{ maxWidth: 1100, margin: "28px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/products"
            element={
              <Protected>
                <Products addToCart={addToCart} />
              </Protected>
            }
          />

          <Route
            path="/products/:id"
            element={
              <Protected>
                <ProductDetail addToCart={addToCart} />
              </Protected>
            }
          />

          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
