import ProductCard from "../components/ProductCard";

export default function Home({ products, cart }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="text-xl">🛒 {cart.length}</div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
