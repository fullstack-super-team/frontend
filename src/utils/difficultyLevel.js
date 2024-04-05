const DifficultyLevel = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

function getDifficultyLevels() {
  return Object.keys(DifficultyLevel).map(key => ({
    value: DifficultyLevel[key],
    label: getDifficultyLevelLabel(DifficultyLevel[key]),
  }));
}

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

export { DifficultyLevel, getDifficultyLevels };