import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';

export default function Product({ product, onAction }) {
    const { user } = useSelector((state) => state.auth);
    const { name, price, image_url, category, description } = product;

    return(
        <div className="product-card">
            <h2>{name}</h2>
            <div className="product-info">
                <p className="category">{category}</p>
                <p className="description">{description}</p>
                <p className="price">{price} RON</p>
            </div>
                { user&&
                <button className="order-btn" onClick={onAction}>Comandă Acum</button>
    }
        </div>
    )
}