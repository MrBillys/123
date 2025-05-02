import { useState, useEffect } from 'react';
import { Plus, Pencil, Eye, EyeOff, Trash, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import DataTable from '../../components/admin/DataTable';
import { products } from '../../data/products';
import { formatDate } from '../../utils/helpers';
import { Product } from '../../types/product';
import { productApi } from '../../services/api';
import { FEATURES } from '../../config';

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // For now, we'll continue to use the mock data, but we're preparing for API integration
  const [productData, setProductData] = useState<Product[]>(products);
  
  // This useEffect will be used to fetch products from your backend when ready
  useEffect(() => {
    // Only attempt to fetch from API if we're not using mock data
    if (!FEATURES.USE_MOCK_DATA) {
      const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const data = await productApi.getAll();
          setProductData(data);
        } catch (err) {
          console.error('Failed to fetch products:', err);
          setError('Failed to load products. Please try again later.');
          // Fallback to mock data if API fails
          setProductData(products);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchProducts();
    }
  }, []);
  
  const handleAddProduct = () => {
    setSelectedProductId(null);
    setIsModalOpen(true);
  };
  
  const handleEditProduct = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };
  
  const handleToggleVisibility = async (id: string) => {
    // Find the product to toggle visibility
    const product = productData.find(p => p.id === id);
    if (!product) return;
    
    // Optimistically update the UI
    setProductData(prev => 
      prev.map(product => 
        product.id === id ? { ...product, isVisible: !product.isVisible } : product
      )
    );
    
    // If not using mock data, update on the backend
    if (!FEATURES.USE_MOCK_DATA) {
      try {
        await productApi.update(id, { isVisible: !product.isVisible });
      } catch (err) {
        console.error('Failed to update product visibility:', err);
        // Revert the optimistic update if the API call fails
        setProductData(prev => 
          prev.map(p => p.id === id ? product : p)
        );
        setError('Failed to update product visibility. Please try again.');
      }
    }
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Optimistically update UI
      setProductData(prev => prev.filter(product => product.id !== id));
      
      // If not using mock data, delete from backend
      if (!FEATURES.USE_MOCK_DATA) {
        try {
          await productApi.delete(id);
        } catch (err) {
          console.error('Failed to delete product:', err);
          // Restore the product if the API call fails
          const deletedProduct = products.find(p => p.id === id);
          if (deletedProduct) {
            setProductData(prev => [...prev, deletedProduct]);
          }
          setError('Failed to delete product. Please try again.');
        }
      }
    }
  };
  
  const filteredProducts = showInactive 
    ? productData 
    : productData.filter(p => p.isVisible);

  // Define columns for the data table
  const columns = [
    {
      header: 'Product Name',
      accessor: (product: Product) => (
        <div>
          <p className="font-medium text-secondary-900">{product.title}</p>
          <p className="text-xs text-secondary-500">#{product.partCode}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (product: Product) => product.category,
      sortable: true,
    },
    {
      header: 'Model',
      accessor: (product: Product) => product.model,
      sortable: true,
    },
    {
      header: 'Stock',
      accessor: (product: Product) => {
        const statusColors = {
          'In Stock': 'text-success-700 bg-success-50',
          'Limited': 'text-warning-700 bg-warning-50',
          'Out of Stock': 'text-error-700 bg-error-50',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[product.stockStatus]}`}>
            {product.stockStatus}
          </span>
        );
      },
    },
    {
      header: 'Views',
      accessor: (product: Product) => String(product.viewCount),
      sortable: true,
    },
    {
      header: 'Date Added',
      accessor: (product: Product) => formatDate(product.createdAt),
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (product: Product) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          product.isVisible 
            ? 'text-success-700 bg-success-50' 
            : 'text-secondary-700 bg-secondary-100'
        }`}>
          {product.isVisible ? 'Active' : 'Hidden'}
        </span>
      ),
    },
  ];

  // Update the "Delete Product" button onClick to use the new handler
  // You'll need to modify the actions prop in the DataTable component:
  const actions = (product: Product) => (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => handleToggleVisibility(product.id)}
        className="p-1 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 rounded"
        title={product.isVisible ? 'Hide product' : 'Show product'}
      >
        {product.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      <button
        onClick={() => handleEditProduct(product.id)}
        className="p-1 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 rounded"
        title="Edit product"
      >
        <Pencil size={18} />
      </button>
      <button
        onClick={() => handleDeleteProduct(product.id)}
        className="p-1 text-secondary-700 hover:text-error-600 hover:bg-secondary-50 rounded"
        title="Delete product"
      >
        <Trash size={18} />
      </button>
    </div>
  );

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-md">
          {error}
          <button 
            className="ml-2 text-error-900 underline"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Product Management</h1>
          <p className="text-secondary-600">Manage your product catalog</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="secondary"
            leftIcon={<Filter size={16} />}
            onClick={() => setShowInactive(!showInactive)}
          >
            {showInactive ? 'Hide Inactive' : 'Show All'}
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <p>Loading products...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          keyField="id"
          searchField="title"
          actions={actions}
        />
      )}
      
      {/* Product Editor Modal - would be implemented fully in a real app */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {selectedProductId ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <p className="text-secondary-600 mb-4">
              This modal would contain a complete product form in a real implementation.
              It would be connected to your backend API endpoints.
            </p>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                {selectedProductId ? 'Save Changes' : 'Add Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
