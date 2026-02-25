function getCartProducts() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

function saveFullCart(cartArray) {
  localStorage.setItem('cartItems', JSON.stringify(cartArray));
}

function clearAllItemsCart() {
  localStorage.removeItem('cartItems');
}

function getFilters() {
  const saved = localStorage.getItem('product_filters');
  return saved
    ? JSON.parse(saved)
    : {
        search: '',
        category: 'all',
        price: '',
        alphabetical: 'none',
      };
}

function setFilters(filters) {
  localStorage.setItem('product_filters', JSON.stringify(filters));
}

export { getCartProducts, saveFullCart, clearAllItemsCart, getFilters, setFilters };
