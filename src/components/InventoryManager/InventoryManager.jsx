import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import ProductList from "../ProductList/ProductList";
import './InventoryManager.scss';

export default function InventoryManager() {
    const { items, loading } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return(
        <div className="inventory-content">
            <button className="add-product-btn">Add Product</button>
            <div className="product-list">
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <ProductList products={items} />
                )}
            </div>
        </div>
    );
}
