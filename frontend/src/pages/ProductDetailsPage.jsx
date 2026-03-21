import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";

const FALLBACK_IMAGE =
  "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-message">Loading product details...</div>;
  }

  if (errorMessage) {
    return <div className="page-message error-text">{errorMessage}</div>;
  }

  if (!product) {
    return <div className="page-message">Product not found.</div>;
  }

  return (
    <div className="page-container">
      <div className="details-card">
        <div className="details-card__image-wrap">
          <img
            src={product.imageUrl || FALLBACK_IMAGE}
            alt={product.name}
            className="details-card__image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </div>

        <div className="details-card__content">
          <h1>{product.name}</h1>
          <p>{product.description || "No description available."}</p>
          <p>
            <strong>Price:</strong> ₹ {product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stockQuantity}
          </p>
          <p>
            <strong>Status:</strong> {product.active ? "Active" : "Inactive"}
          </p>

          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
