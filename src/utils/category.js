/**
 * Enum for categories.
 *
 * @type {{SPORT: string, SCIENCE: string, GENERAL: string, CULTURE: string, FOOD: string, HISTORY: string}}
 */
const Category = {
  FOOD: "food",
  SPORT: "sport",
  SCIENCE: "science",
  HISTORY: "history",
  CULTURE: "culture",
  GENERAL: "general"
};

/**
 * Generates an array of categories with value and label.
 *
 * @returns {Array} Array of categories with value and label
 */
function getCategories() {
  return Object.keys(Category).map(key => ({
    value: Category[key],
    label: getCategoryLabel(Category[key]),
  }));
}

/**
 * Returns the label of a given category.
 *
 * @param type
 * @returns {string}
 */
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

/**
 * Exports the Category object, getCategories and getCategoryLabel functions.
 */
export { Category, getCategories, getCategoryLabel };