import ProductList from '../ProductList/ProductList';
import ProductModal from '../ProductModal/ProductModal';
import DeletedItemsModal from '../RecentlyDeletedModal/RecentlyDeletedModal';
import { useCallback, useState } from 'react';
import './InventoryManager.scss';

export default function InventoryManager() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeletedItemsModal, setShowDeletedItemsModal] = useState(false);

  const openDeletedItemsModal = useCallback(() => {
    setShowDeletedItemsModal(true);
  }, []);

  const openEditModal = useCallback((product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  }, []);

  const openAddModal = useCallback(() => {
    setSelectedProduct(null);
    setShowProductModal(true);
  }, []);

  return (
    <div className="inventory-content">
      <div className="inventory-buttons">
        <button className="inventory-btn" onClick={openAddModal}>
          Add Product
        </button>
        <button className="inventory-btn" onClick={openDeletedItemsModal}>
          Recently Deleted
        </button>
      </div>
      <ProductList onEdit={openEditModal} />
      {showProductModal && (
        <ProductModal product={selectedProduct} onClose={() => setShowProductModal(false)} />
      )}
      {showDeletedItemsModal && (
        <DeletedItemsModal onClose={() => setShowDeletedItemsModal(false)} />
      )}
    </div>
  );
}
