export default function filterAndSortProducts(items, { search, category, price, alphabetical }) {
  if (!items) return [];

  return items
    .filter((item) => {
      if (item.isDeleted) return false;
      if (!item.name) return false;

      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

      let matchesCategory = true;
      switch (category) {
        case 'all':
          matchesCategory = true;
          break;
        default:
          matchesCategory = item.category.toLowerCase() === category.toLowerCase();
          break;
      }

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (price) {
        case 'asc':
          return a.price - b.price;
        case 'desc':
          return b.price - a.price;
      }

      switch (alphabetical) {
        case 'asc':
          return a.name.localeCompare(b.name);
        case 'desc':
          return b.name.localeCompare(a.name);
      }

      return 0;
    });
}
