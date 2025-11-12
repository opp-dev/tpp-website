'use client'

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="sticky top-0 bg-white z-10 py-4 mb-8 border-b border-gray-300">
      <div className="flex gap-6 overflow-x-auto">
        <button
          onClick={() => onSelectCategory('all')}
          className={`link-mono whitespace-nowrap transition-colors cursor-pointer border border-gray-300 rounded-sm ${
            selectedCategory === 'all'
              ? 'opacity-100'
              : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            color: selectedCategory === 'all' ? 'var(--color-text)' : 'var(--color-text-lighter)',
            padding: '2px 12px'
          }}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`link-mono whitespace-nowrap transition-colors cursor-pointer border border-gray-300 rounded-sm ${
              selectedCategory === category
                ? 'opacity-100'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              color: selectedCategory === category ? 'var(--color-text)' : 'var(--color-text-lighter)',
              padding: '2px 12px'
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
