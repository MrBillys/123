import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';
import ProductFilter from '../../components/product/ProductFilter';
import { getFilteredProducts } from '../../data/products';
import { FilterState, Product } from '../../types/product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productsGridRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  
  const filters = useMemo<FilterState>(() => ({
    category: searchParams.get('category') || undefined,
    model: searchParams.get('model') || undefined,
    year: searchParams.get('year') || undefined,
    mliCode: searchParams.get('mliCode') || undefined,
  }), [searchParams]);
  
  useEffect(() => {
    setLoading(true);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      const filteredProducts = getFilteredProducts(filters);
      setProducts(filteredProducts);
      setLoading(false);
    }, 300);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [filters]);
  
  const handleFilterChange = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Ford Auto Parts</h1>
        <p className="mt-2 text-secondary-600">
          Browse our extensive collection of genuine and high-quality aftermarket Ford parts
        </p>
      </div>
      
      <ProductFilter onFilterChange={handleFilterChange} currentFilters={filters} />
      
      <div className="mb-6 flex justify-between items-center">
        <div className="text-secondary-600">
          {loading ? (
            <span>Loading results...</span>
          ) : (
            <span>{products.length} parts found</span>
          )}
        </div>
      </div>
      
      <div ref={productsGridRef}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card p-4 h-80 animate-pulse">
                <div className="bg-gray-200 w-full h-44 rounded-md"></div>
                <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-2 h-3 bg-gray-200 rounded w-full"></div>
                <div className="mt-4 flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100">
              <Filter className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-secondary-900">No products found</h3>
            <p className="mt-1 text-sm text-secondary-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;