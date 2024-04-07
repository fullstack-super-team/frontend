import { Category, getCategories, getCategoryLabel } from '../category';

describe('Category', () => {
  it('should have the correct values', () => {
    expect(Category.FOOD).toBe('food');
    expect(Category.DRINK).toBe('drink');
    expect(Category.CLOTHING).toBe('clothing');
    expect(Category.ELECTRONICS).toBe('electronics');
    expect(Category.BOOKS).toBe('books');
    expect(Category.GENERAL).toBe('general');
  });
});

describe('getCategories', () => {
  it('should return an array of category values', () => {
    const categories = getCategories();
    console.log(categories);
    expect(categories).toEqual([
      {
        label: 'Food',
        value: 'food'
      },
      {
        label: 'Drink',
        value: 'drink'
      },
      {
        label: 'Clothing',
        value: 'clothing'
      },
      {
        label: 'Electronics',
        value: 'electronics'
      },
      {
        label: 'Books',
        value: 'books'
      },
      {
        label: 'General',
        value: 'general'
      }
    ]);
  });
});

describe('getCategoryLabel', () => {
  it('should return the correct label for a given category', () => {
    expect(getCategoryLabel('food')).toBe('Food');
    expect(getCategoryLabel('drink')).toBe('Drink');
    expect(getCategoryLabel('clothing')).toBe('Clothing');
    expect(getCategoryLabel('electronics')).toBe('Electronics');
    expect(getCategoryLabel('books')).toBe('Books');
    expect(getCategoryLabel('general')).toBe('General');
  });

  it('should return "Unknown" for an unknown category', () => {
    expect(getCategoryLabel('unknown')).toBe('Unknown');
  });
});
