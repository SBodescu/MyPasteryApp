import { useState, useEffect, use } from "react";
import { useDispatch} from "react-redux";
import { updateInDB,addToDB } from "../../store/productSlice";
import './ProductModal.scss';

export default function ProductModal({ product, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image_url: '',
        category: '',
        description: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                description: product.description,
                image_url: product.image_url
            });
        } else {
            setFormData({
                name: '',
                price: '',
                category: '',
                description: '',
                image_url: ''
            });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            dispatch(updateInDB(formData));
        } else {
            dispatch(addToDB(formData));
        }
        onClose(); 
    };
    return(
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="Product Name"
                    />
                    <input 
                        type="number" 
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                        placeholder="Price"
                    />
                    <textarea 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        placeholder="Description"
                    />
                    <input 
                        type="text" 
                        value={formData.image_url} 
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
                        placeholder="Image URL"
                    />
                    <input 
                        type="text" 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        placeholder="Category"
                    />
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}