import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import ProductFilter from '../../components/product/ProductFilter';
import { products } from '../../data/products';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialModel = searchParams.get('model') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedModel, setSelectedModel] = useState(initialModel);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setSelectedCategory(initialCategory);
    setSelectedModel(initialModel);
  }, [initialSearchTerm, initialCategory, initialModel]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  // Filter products based on selected category, model, and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesModel = selectedModel === '' || product.compatibleModels.includes(selectedModel);
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesModel && matchesSearch;
  });

  // Extract unique categories and models from products data
  const categories = [...new Set(products.map(p => p.category))];
  const models = [...new Set(products.flatMap(p => p.compatibleModels))];

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Ford Auto Parts</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8">
        <ProductFilter 
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onModelChange={handleModelChange}
          searchTerm={searchTerm}
          category={selectedCategory}
          model={selectedModel}
          categories={categories}
          models={models}
        />
      </div>
      
      {/* Results count */}
      <p className="text-secondary-600 mb-4">{filteredProducts.length} products found</p>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary-600">No products match your search criteria.</p>
          <p className="mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
