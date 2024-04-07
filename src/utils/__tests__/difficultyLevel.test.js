import { DifficultyLevel, getDifficultyLevels, getDifficultyLevelLabel } from "@/utils/difficultyLevel.js";

describe('DifficultyLevel', () => {
    it('should have the correct values', () => {
        expect(DifficultyLevel.EASY).toBe(1);
        expect(DifficultyLevel.MEDIUM).toBe(2);
        expect(DifficultyLevel.HARD).toBe(3);
    });
});

describe('getDifficultyLevels', () => {
    it('should return an array of difficulty levels', () => {
        const levels = getDifficultyLevels();
        expect(levels).toEqual([
            {
                label: 'Easy',
                value: 1
            },
            {
                label: 'Medium',
                value: 2
            },
            {
                label: 'Hard',
                value: 3
            }
        ]);
    });
});

describe('getDifficultyLevelLabel', () => {
    it('should return the correct label for a given difficulty level', () => {
        expect(getDifficultyLevelLabel(1)).toBe('Easy');
        expect(getDifficultyLevelLabel(2)).toBe('Medium');
        expect(getDifficultyLevelLabel(3)).toBe('Hard');
    });

    it('should return "Unknown" for an unknown difficulty level', () => {
        expect(getDifficultyLevelLabel(4)).toBe('Unknown');
    });
});
