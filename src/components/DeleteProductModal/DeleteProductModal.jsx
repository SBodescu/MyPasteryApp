import { useDispatch } from 'react-redux';
import { deleteProductFromCatalogue } from '../../store/productSlice';
import './DeleteProductModal.scss';

export default function DeleteModal({ setIsDeleting, product }) {
  const dispatch = useDispatch();
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this product?</h3>
        <div className="modal-actions">
          <button
            className="confirm-btn"
            onClick={() => dispatch(deleteProductFromCatalogue(product))}
          >
            Yes, Delete
          </button>
          <button className="cancel-btn" onClick={() => setIsDeleting(false)}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
