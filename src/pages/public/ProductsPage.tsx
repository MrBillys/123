import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import ProductFilter from '../../components/product/ProductFilter';
import { products } from '../../data/products';

// Define a type for setTimeout ID
type TimeoutId = ReturnType<typeof setTimeout>;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer: TimeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      let results = products;

      if (category) {
        results = results.filter((product) => product.category === category);
      }

      if (model) {
        results = results.filter((product) => product.model === model);
      }

      if (debouncedSearchTerm) {
        const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
        results = results.filter((product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.partCode.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      setFilteredProducts(results);
      setLoading(false);
    }, 300);
  }, [category, model, debouncedSearchTerm]);

  // Extract unique categories and models for filters
  const categories = [...new Set(products.map((product) => product.category))];
  const models = [...new Set(products.map((product) => product.model))];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <ProductFilter
          categories={categories}
          models={models}
          category={category}
          model={model}
          searchTerm={searchTerm}
          onCategoryChange={handleCategoryChange}
          onModelChange={handleModelChange}
          onSearchChange={handleSearchChange}
        />

        <div className="flex-1">
          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
