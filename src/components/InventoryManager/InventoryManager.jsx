import ProductList from '../ProductList/ProductList';
import ProductModal from '../ProductModal/ProductModal';
import DeletedItemsModal from '../RecentlyDeletedItemsModal/RecentlyDeletedItemsModal';
import { useState } from 'react';
import './InventoryManager.scss';

export default function InventoryManager() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeletedItemsModal, setShowDeletedItemsModal] = useState(false);

  const openDeletedItemsModal = () => {
    setShowDeletedItemsModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

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
