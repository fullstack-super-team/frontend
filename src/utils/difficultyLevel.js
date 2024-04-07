/**
 * Difficulty levels for the game.
 *
 * @type {{EASY: number, MEDIUM: number, HARD: number}}
 */
const DifficultyLevel = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

/**
 * Generates an array of difficulty levels with value and label.
 *
 * @returns {{label: string, value: *}[]}
 */
function getDifficultyLevels() {
  return Object.keys(DifficultyLevel).map(key => ({
    value: DifficultyLevel[key],
    label: getDifficultyLevelLabel(DifficultyLevel[key]),
  }));
}

/**
 * Returns the label of a given difficulty level.
 *
 * @param level
 * @returns {string}
 */
function getDifficultyLevelLabel(level) {
  switch (level) {
    case DifficultyLevel.EASY:
      return "Easy";
    case DifficultyLevel.MEDIUM:
      return "Medium";
    case DifficultyLevel.HARD:
      return "Hard";
    default:
      return "Unknown";
  }
}

/**
 * Exports the DifficultyLevel object, getDifficultyLevels and getDifficultyLevelLabel functions.
 */
export { DifficultyLevel, getDifficultyLevels, getDifficultyLevelLabel };