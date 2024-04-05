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
    label: getCategoryLabel(Category[key]),
  }));
}

function getCategoryLabel(type) {
  switch (type) {
    case Category.FOOD:
      return "Food";
    case Category.DRINK:
      return "Drink";
    case Category.CLOTHING:
      return "Clothing";
    case Category.ELECTRONICS:
      return "Electronics";
    case Category.BOOKS:
      return "Books";
    case Category.GENERAL:
      return "General";      
    default:
      return "Unknown";
  }
}

export { Category, getCategories };