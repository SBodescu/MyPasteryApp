import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { use, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

export default function ProductList({onEdit}) {
    const {items, loading } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return(
        <div className="product-list">
            {items.map(item => (
                <ProductCard key={item.id} product={item} onEdit={onEdit} />
            ))}
        </div>
    );
}