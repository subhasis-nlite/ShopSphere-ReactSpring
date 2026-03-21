import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stockQuantity: "",
  imageUrl: "",
  active: true,
};

export default function ProductForm({
  onSubmit,
  initialData = null,
  submitButtonText = "Save Product",
  onCancelEdit = null,
  validationErrors = {},
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        price: initialData.price ?? "",
        stockQuantity: initialData.stockQuantity ?? "",
        imageUrl: initialData.imageUrl ?? "",
        active: initialData.active ?? true,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      price: formData.price === "" ? "" : Number(formData.price),
      stockQuantity:
        formData.stockQuantity === "" ? "" : Number(formData.stockQuantity),
    };

    const success = await onSubmit(payload);

    if (success && !initialData) {
      setFormData(emptyForm);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {validationErrors.name && (
          <small className="field-error">{validationErrors.name}</small>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
        {validationErrors.description && (
          <small className="field-error">{validationErrors.description}</small>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {validationErrors.price && (
            <small className="field-error">{validationErrors.price}</small>
          )}
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
          {validationErrors.stockQuantity && (
            <small className="field-error">
              {validationErrors.stockQuantity}
            </small>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Enter direct image URL"
        />
        {validationErrors.imageUrl && (
          <small className="field-error">{validationErrors.imageUrl}</small>
        )}
      </div>

      <div className="form-checkbox">
        <input
          id="active"
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
        <label htmlFor="active">Active</label>
      </div>

      {validationErrors.active && (
        <small className="field-error">{validationErrors.active}</small>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitButtonText}
        </button>

        {onCancelEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
