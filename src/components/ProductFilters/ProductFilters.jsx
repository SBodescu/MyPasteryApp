import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../../store/productSlice';
import './ProductFilters.scss';

export default function Filters() {
  const categories = ['All', 'Torturi', 'Prajituri', 'Patiserie'];
  const filters = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFilters({ [name]: value }));
  };

  return (
    <div className="filters-container">
      <div className="search-filter">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={handleFilterChange}
        />
      </div>
      <div className="category-filter">
        <label htmlFor="category">Category:</label>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="price-filter">
        <label htmlFor="price">Price:</label>
        <select name="price" value={filters.price} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="sort-alphabetically-filter">
        <label htmlFor="alphabetical">Sort:</label>
        <select name="alphabetical" value={filters.alphabetical} onChange={handleFilterChange}>
          <option value="none">Default</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </div>
    </div>
  );
}
