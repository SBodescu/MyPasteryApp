import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/productSlice';
import DeleteModal from '../DeleteProductModal/DeleteProductModal';

import { useState } from 'react';

export default function ProductCard({ product, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isAdmin } = useSelector((state) => state.auth);
  const { name, price, image_url, category, description } = product;

  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p className="category">{category}</p>
      <img src={image_url} alt={name} className="product-image" />
      <div className="product-info">
        <p className="description">{description}</p>
        <p className="price">{price} RON</p>
      </div>
      {user && !isAdmin && (
        <button className="order-btn" onClick={() => dispatch(addToCart(product))}>
          Comandă Acum
        </button>
      )}
      {isAdmin && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => setIsDeleting(true)}>
            Delete
          </button>
        </div>
      )}
      {isDeleting && <DeleteModal setIsDeleting={setIsDeleting} product={product} />}
    </div>
  );
}
