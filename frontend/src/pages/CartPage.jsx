import React from "react";

export default function CartPage({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Cart</h1>
      {cart.length === 0 && <div>Your cart is empty</div>}

      {cart.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: 12,
            background: "#fff",
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <img
            src={item.product.image}
            alt=""
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{item.product.name}</div>
            <div style={{ color: "#6b7280" }}>${item.product.price}</div>
          </div>
          <div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(
                  item.product.id,
                  Math.max(1, Number(e.target.value))
                )
              }
              style={{
                width: 64,
                padding: 6,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
          <button
            onClick={() => removeFromCart(item.product.id)}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={clearCart}
            style={{ padding: "8px 12px", borderRadius: 6 }}
          >
            Clear
          </button>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              background: "#111827",
              color: "#fff",
              border: "none",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
