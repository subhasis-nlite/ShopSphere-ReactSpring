import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-message">Loading products...</div>;
  }

  if (errorMessage) {
    return <div className="page-message error-text">{errorMessage}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Products</h1>
        <p>Welcome to ShopSphere V1</p>
      </div>

      {products.length === 0 ? (
        <div className="page-message">No products found.</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
