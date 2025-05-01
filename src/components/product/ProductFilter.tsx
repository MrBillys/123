
import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

export interface ProductFilterProps {
  searchTerm: string;
  category: string;
  model: string;
  categories: string[];
  models: string[];
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onModelChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  searchTerm,
  category,
  model,
  categories,
  models,
  onSearchChange,
  onCategoryChange,
  onModelChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
      
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-secondary-400" aria-hidden="true" />
        </div>
        <input
          type="search"
          name="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={onSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-secondary-700">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={onCategoryChange}
          className="mt-1 block w-full py-2 px-3 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {/* Model Filter */}
      <div>
        <label htmlFor="model" className="block text-sm font-medium text-secondary-700">Compatible Model</label>
        <select
          id="model"
          name="model"
          value={model}
          onChange={onModelChange}
          className="mt-1 block w-full py-2 px-3 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">All Models</option>
          {models.map(mod => (
            <option key={mod} value={mod}>{mod}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
