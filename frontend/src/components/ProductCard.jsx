import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || FALLBACK_IMAGE}
        alt={product.name}
        className="product-card__image"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p className="product-card__description">
          {product.description || "No description available"}
        </p>
        <p className="product-card__price">₹ {product.price}</p>
        <p className="product-card__stock">Stock: {product.stockQuantity}</p>

        <Link to={`/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}
