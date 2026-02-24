import ProductList from '../ProductList/ProductList';
import ProductModal from '../ProductModal/ProductModal';
import { useState } from 'react';
import './InventoryManager.scss';

export default function InventoryManager() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <button className="add-product-btn" onClick={openAddModal}>
        Add Product
      </button>
      <ProductList onEdit={openEditModal} />
      {showProductModal && (
        <ProductModal product={selectedProduct} onClose={() => setShowProductModal(false)} />
      )}
    </div>
  );
}
