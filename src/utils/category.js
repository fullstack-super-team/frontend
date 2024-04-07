const Category = {
  FOOD: "food",
  SPORT: "sport",
  SCIENCE: "science",
  HISTORY: "history",
  CULTURE: "culture",
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
    case Category.SPORT:
      return "Sport";
    case Category.SCIENCE:
      return "Science";
    case Category.HISTORY:
      return "History";
    case Category.CULTURE:
      return "Culture";
    case Category.GENERAL:
      return "General";      
    default:
      return "Unknown";
  }
}

export { Category, getCategories, getCategoryLabel };