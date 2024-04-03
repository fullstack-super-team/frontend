const DifficultyLevel = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

function getDifficultyLevels() {
  return Object.keys(DifficultyLevel).map(key => ({
    value: DifficultyLevel[key],
    label: key.charAt(0) + key.slice(1).toLowerCase(),
  }));
}

export { DifficultyLevel, getDifficultyLevels };