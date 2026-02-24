import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

export default function ProductList({ products, onAction }) {
    return(
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAction={onAction} />
            ))}
        </div>
    );
}