import { useState, useEffect, use } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductInCatalogue, addProductToCatalogue } from '../../store/productSlice';
import './ProductModal.scss';

export default function ProductModal({ product, onClose }) {
  const categories = ['Cakes', 'Desserts', 'Bakery'];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    category: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    setFormErrors((prev) => {
      const errs = { ...prev };
      switch (name) {
        case 'name':
          if (!value.trim()) {
            errs.name = 'Name is required.';
          } else {
            delete errs.name;
          }
          break;
        case 'price':
          if (!value) {
            errs.price = 'Price is required.';
          } else if (Number(value) <= 0) {
            errs.price = 'Price must be positive.';
          } else {
            delete errs.price;
          }
          break;
        case 'category':
          if (!value) {
            errs.category = 'Category must be selected.';
          } else {
            delete errs.category;
          }
          break;
        case 'image_url':
          if (!value.trim()) {
            errs.image_url = 'Image URL is required.';
          } else {
            try {
              new URL(value);
              delete errs.image_url;
            } catch {
              errs.image_url = 'Enter a valid URL.';
            }
          }
          break;
        case 'description':
          if (!value.trim()) {
            errs.description = 'Description is required.';
          } else {
            delete errs.description;
          }
          break;
        default:
          break;
      }
      return errs;
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category ? product.category.toLowerCase() : '',
        description: product.description,
        image_url: product.image_url,
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image_url: '',
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ['name', 'price', 'category', 'image_url', 'description'].forEach((field) => {
      validateField(field, formData[field]);
    });
    if (Object.keys(formErrors).length) return;

    if (product) {
      dispatch(updateProductInCatalogue(formData));
    } else {
      dispatch(addProductToCatalogue(formData));
    }
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                validateField('name', e.target.value);
              }}
              placeholder="Product Name"
            />
            {formErrors.name && <span className="field-error">{formErrors.name}</span>}
          </div>
          <div className="input-group">
            <input
              type="number"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
                validateField('price', e.target.value);
              }}
              placeholder="Price"
            />
            {formErrors.price && <span className="field-error">{formErrors.price}</span>}
          </div>
          <div className="input-group">
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                validateField('description', e.target.value);
              }}
              placeholder="Description"
            />
            {formErrors.description && (
              <span className="field-error">{formErrors.description}</span>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => {
                setFormData({ ...formData, image_url: e.target.value });
                validateField('image_url', e.target.value);
              }}
              placeholder="Image URL"
            />
            {formErrors.image_url && <span className="field-error">{formErrors.image_url}</span>}
          </div>
          <div className="input-group">
            <label>Category:</label>
            <div className="radio-group">
              {categories.map((cat) => (
                <label key={cat}>
                  <input
                    type="radio"
                    name="category"
                    value={cat.toLowerCase()}
                    checked={formData.category === cat.toLowerCase()}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      validateField('category', e.target.value);
                    }}
                  />{' '}
                  {cat}
                </label>
              ))}
            </div>
            {formErrors.category && <span className="field-error">{formErrors.category}</span>}
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
