import { useDispatch, useSelector } from 'react-redux';
import { restoreProudctInCatalogue, fetchProducts } from '../../store/productSlice';
import { useEffect } from 'react';
import withLoading from '../../utils/hocs/loadingHoc';
import './RecentlyDeletedModal.scss';

function DeletedItemsGrid({ items, onRestore }) {
  if (items.length === 0) {
    return <p className="empty-msg">No deleted items found.</p>;
  }

  return (
    <div className="deleted-items-list">
      {items.map((item) => (
        <div key={item.id} className="deleted-item">
          <div className="item-info">
            <h3>{item.name}</h3>
          </div>
          <button className="restore-btn" onClick={() => onRestore(item)}>
            Restore
          </button>
        </div>
      ))}
    </div>
  );
}

const DeletedItemsListWithLoading = withLoading(DeletedItemsGrid);

export default function RecentlyDeletedItemsModal({ onClose }) {
  const { items, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deletedItems = items.filter((item) => item.isDeleted);

  const handleRestore = (item) => {
    dispatch(restoreProudctInCatalogue(item));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Recently Deleted</h2>

        <DeletedItemsListWithLoading
          isLoading={loading}
          loadingMessage="Loading deleted products..."
          items={deletedItems}
          onRestore={handleRestore}
        />

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
