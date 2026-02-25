import ProductList from '../../components/ProductList/ProductList';
import './Catalogue.scss';

export default function Catalogue() {
  return (
    <div className="dashboard-view">
      <h1 className="main-title">Desserts</h1>
      <div className="products-list">
        <ProductList />
      </div>
    </div>
  );
}
