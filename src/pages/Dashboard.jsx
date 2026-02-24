import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductList from '../components/ProductList/ProductList';
import '../styles/_dashboard.scss';

export default function Dashboard(){

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="dashboard-view">
      <h1 className="main-title">Desserts</h1>
      <div className="products-list">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <ProductList products={items} />
        )}
      </div>
    </div>
  );
};

