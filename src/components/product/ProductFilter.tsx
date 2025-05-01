import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FilterState } from '../../types/product';
import { categories, fordModels, yearRanges } from '../../data/products';
import Button from '../common/Button';

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const ProductFilter = ({ onFilterChange, currentFilters }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const [mliCode, setMliCode] = useState(currentFilters.mliCode || '');
  
  // Update local filters when current filters change (e.g., from URL params)
  useEffect(() => {
    setLocalFilters(currentFilters);
    setMliCode(currentFilters.mliCode || '');
  }, [currentFilters]);
  
  const handleMliCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMliCode(e.target.value);
  };
  
  const handleCategoryChange = (category: string | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
  };
  
  const handleModelChange = (model: string | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      model: prev.model === model ? undefined : model
    }));
  };
  
  const handleYearChange = (year: string | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      year: prev.year === year ? undefined : year
    }));
  };
  
  const applyFilters = () => {
    onFilterChange({
      ...localFilters,
      mliCode: mliCode || undefined
    });
  };
  
  const resetFilters = () => {
    setLocalFilters({});
    setMliCode('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by MLI code..."
              value={mliCode}
              onChange={handleMliCodeChange}
              className="pl-10 w-full input"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="primary" 
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              rightIcon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              className="sm:hidden"
            >
              Filters
            </Button>
          </div>
        </div>
        
        {Object.values(localFilters).some(v => v !== undefined) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(localFilters).map(([key, value]) => (
              value && (
                <div 
                  key={key}
                  className="badge bg-primary-100 text-primary-700 border border-primary-200 pr-1 flex items-center"
                >
                  <span className="mr-1">{key}: {value}</span>
                  <button
                    onClick={() => {
                      const newFilters = { ...localFilters };
                      delete newFilters[key as keyof FilterState];
                      setLocalFilters(newFilters);
                    }}
                    className="text-primary-500 hover:text-primary-700 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              )
            ))}
            {Object.values(localFilters).some(v => v !== undefined) && (
              <button
                onClick={resetFilters}
                className="text-sm text-secondary-600 hover:text-primary-600"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Filter panels */}
      <div className={`border-t border-secondary-200 ${isOpen || 'hidden sm:block'}`}>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Filter size={16} className="mr-2" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={localFilters.category === category.name}
                    onChange={() => handleCategoryChange(category.name)}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-secondary-700">
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Models */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Filter size={16} className="mr-2" />
              Ford Models
            </h3>
            <div className="space-y-2">
              {fordModels.map(model => (
                <div key={model} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`model-${model}`}
                    checked={localFilters.model === model}
                    onChange={() => handleModelChange(model)}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`model-${model}`} className="ml-2 text-sm text-secondary-700">
                    {model}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Year Ranges */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Filter size={16} className="mr-2" />
              Year Range
            </h3>
            <div className="space-y-2">
              {yearRanges.map(year => (
                <div key={year} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`year-${year}`}
                    checked={localFilters.year === year}
                    onChange={() => handleYearChange(year)}
                    className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`year-${year}`} className="ml-2 text-sm text-secondary-700">
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;