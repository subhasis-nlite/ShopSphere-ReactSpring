import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../api/productApi";
import ProductForm from "../components/ProductForm";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load products.");
    }
  };

  const handleCreate = async (payload) => {
    try {
      await createProduct(payload);
      setMessage("Product created successfully.");
      setErrorMessage("");
      await loadProducts();
    } catch (error) {
      console.error(error);
      setMessage("");
      setErrorMessage("Failed to create product.");
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await updateProduct(editingProduct.id, payload);
      setMessage("Product updated successfully.");
      setErrorMessage("");
      setEditingProduct(null);
      await loadProducts();
    } catch (error) {
      console.error(error);
      setMessage("");
      setErrorMessage("Failed to update product.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully.");
      setErrorMessage("");
      await loadProducts();
    } catch (error) {
      console.error(error);
      setMessage("");
      setErrorMessage("Failed to delete product.");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setMessage("");
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage products in ShopSphere V1</p>
      </div>

      {message && <div className="success-box">{message}</div>}
      {errorMessage && <div className="error-box">{errorMessage}</div>}

      <section className="admin-section">
        <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

        <ProductForm
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          initialData={editingProduct}
          submitButtonText={editingProduct ? "Update Product" : "Add Product"}
          onCancelEdit={editingProduct ? handleCancelEdit : null}
        />
      </section>

      <section className="admin-section">
        <h2>All Products</h2>

        {products.length === 0 ? (
          <div className="page-message">No products available.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>₹ {product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.active ? "Yes" : "No"}</td>
                    <td className="table-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
