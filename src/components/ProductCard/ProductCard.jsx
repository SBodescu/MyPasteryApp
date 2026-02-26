import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/productSlice';
import { useState } from 'react';
import DeleteModal from '../DeleteProductModal/DeleteProductModal';
import './ProductCard.scss';

export default function ProductCard({ product, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { user, isAdmin, isWorker } = useSelector((state) => state.auth);
  const { name, price, image_url, category, description } = product;

  const isStaff = isAdmin || isWorker;

  const addedText = 'Adăugat! ✓';
  const notAddedText = 'Comandă Acum';

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p className="category">{category}</p>
      <img src={image_url} alt={name} className="product-image" />
      <div className="product-info">
        <p className="description">{description}</p>
        <p className="price">{price} RON</p>
      </div>
      {user && !isStaff && (
        <button
          className={`order-btn ${isAddedToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? addedText : notAddedText}
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
