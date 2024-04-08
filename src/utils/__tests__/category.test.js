import { describe, it, expect } from 'vitest';
import { Category, getCategories, getCategoryLabel } from '../category';

describe('Category', () => {
  it('should have the correct values', () => {
    expect(Category.FOOD).toBe('food');
    expect(Category.SPORT).toBe('sport');
    expect(Category.SCIENCE).toBe('science');
    expect(Category.HISTORY).toBe('history');
    expect(Category.CULTURE).toBe('culture');
    expect(Category.GENERAL).toBe('general');
  });
});

describe('getCategories', () => {
  it('should return an array of category values', () => {
    const categories = getCategories();
    expect(categories).toEqual([
        { value: 'food', label: 'Food' },
      { value: 'sport', label: 'Sport' },
      { value: 'science', label: 'Science' },
      { value: 'history', label: 'History' },
      { value: 'culture', label: 'Culture' },
      { value: 'general', label: 'General' },
    ]);
  });
});

describe('getCategoryLabel', () => {
  it('should return the correct label for a given category', () => {
    expect(getCategoryLabel('food')).toBe('Food');
    expect(getCategoryLabel('sport')).toBe('Sport');
    expect(getCategoryLabel('science')).toBe('Science');
    expect(getCategoryLabel('history')).toBe('History');
    expect(getCategoryLabel('culture')).toBe('Culture');
    expect(getCategoryLabel('general')).toBe('General');
  });

  it('should return "Unknown" for an unknown category', () => {
    expect(getCategoryLabel('unknown')).toBe('Unknown');
  });
});
