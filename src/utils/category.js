const Category = {
  FOOD: "food",
  DRINK: "drink",
  CLOTHING: "clothing",
  ELECTRONICS: "electronics",
  BOOKS: "books",
  GENERAL: "general"
};

function getCategories() {
  return Object.keys(Category).map(key => ({
    value: Category[key],
    label: key.charAt(0) + key.slice(1).toLowerCase(),
  }));
}

export { Category, getCategories };