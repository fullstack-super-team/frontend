const Category = {
  FOOD: "food",
  DRINK: "drink",
  CLOTHING: "clothing",
  ELECTRONICS: "electronics",
  BOOKS: "books",
  GENERAL: "general"
};

function getCategories() {
  return Object.keys(DifficultyLevel).map(key => ({
    value: DifficultyLevel[key],
    label: key.charAt(0) + key.slice(1).toLowerCase(),
  }));
}

export { Category, getCategories };