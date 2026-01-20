import React from 'react';

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'today', label: '오늘' },
  { id: 'week', label: '이번주' },
  { id: 'later', label: '나중에' },
];

function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
