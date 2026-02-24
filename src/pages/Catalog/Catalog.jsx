import ProductList from '../../components/ProductList/ProductList';
import './Catalog.scss';

export default function Dashboard(){
  return (
    <div className="dashboard-view">
      <h1 className="main-title">Desserts</h1>
      <div className="products-list">
          <ProductList/>
      </div>
    </div>
  );
};

