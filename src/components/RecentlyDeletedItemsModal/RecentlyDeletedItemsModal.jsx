import { useDispatch, useSelector } from 'react-redux';
import { restoreProudctInCatalogue, fetchProducts } from '../../store/productSlice';
import { useEffect } from 'react';
import './RecentlyDeletedItemsModal.scss';

export default function RecentlyDeletedItemsModal({ onClose }) {
  const { items, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deletedItems = items.filter((item) => item.isDeleted);

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Recently Deleted</h2>

        <div className="deleted-items-list">
          {deletedItems.length > 0 ? (
            deletedItems.map((item) => (
              <div key={item.id} className="deleted-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                </div>
                <button
                  className="restore-btn"
                  onClick={() => dispatch(restoreProudctInCatalogue(item))}
                >
                  Restore
                </button>
              </div>
            ))
          ) : (
            <p className="empty-msg">No deleted items found.</p>
          )}
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
