import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/productSlice';

export default function Product({ product, onAction }) {
    const { user } = useSelector((state) => state.auth);
    const { name, price, image_url, category, description } = product;
    const dispatch = useDispatch();
    

    return(
        <div className="product-card">
            <h2>{name}</h2>
            <p className="category">{category}</p>
            <img src={image_url} alt={name} className="product-image" />
            <div className="product-info">
                <p className="description">{description}</p>
                <p className="price">{price} RON</p>
            </div>
                { user&&
                <button className="order-btn" onClick={() => dispatch(addToCart(product))}>Comandă Acum</button>
    }
        </div>
    )
}