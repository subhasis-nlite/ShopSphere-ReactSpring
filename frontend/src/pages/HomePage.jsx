import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (customFilters = null) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const filters = customFilters || {
        search,
        activeFilter,
        sort,
      };

      const params = {};

      if (filters.search && filters.search.trim()) {
        params.search = filters.search.trim();
      }

      if (filters.activeFilter === "true") {
        params.active = true;
      } else if (filters.activeFilter === "false") {
        params.active = false;
      }

      if (filters.sort) {
        params.sort = filters.sort;
      }

      const data = await getAllProducts(params);
      setProducts(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    loadProducts();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: "",
      activeFilter: "all",
      sort: "",
    };

    setSearch("");
    setActiveFilter("all");
    setSort("");

    loadProducts(resetFilters);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Products</h1>
        <p>Welcome to ShopSphere V1</p>
      </div>

      <section className="catalog-toolbar">
        <div className="toolbar-grid">
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by product name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Default</option>
              <option value="nameAsc">Name A-Z</option>
              <option value="priceAsc">Price Low to High</option>
              <option value="priceDesc">Price High to Low</option>
            </select>
          </div>
        </div>

        <div className="toolbar-actions">
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply
          </button>
          <button className="btn btn-secondary" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </section>

      {loading ? (
        <div className="page-message">Loading products...</div>
      ) : errorMessage ? (
        <div className="page-message error-text">{errorMessage}</div>
      ) : products.length === 0 ? (
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
