import { useState } from 'react';
import { Plus, Pencil, Eye, EyeOff, Trash, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import DataTable from '../../components/admin/DataTable';
import { products } from '../../data/products';
import { formatDate } from '../../utils/helpers';

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  
  // For demo purposes, we'll work with a copy of the data
  const [productData, setProductData] = useState(products);
  
  const handleAddProduct = () => {
    setSelectedProductId(null);
    setIsModalOpen(true);
  };
  
  const handleEditProduct = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };
  
  const handleToggleVisibility = (id: string) => {
    setProductData(prev => 
      prev.map(product => 
        product.id === id ? { ...product, isVisible: !product.isVisible } : product
      )
    );
  };
  
  const filteredProducts = showInactive 
    ? productData 
    : productData.filter(p => p.isVisible);
  
  // Define columns for the data table
  const columns = [
    {
      header: 'Product Name',
      accessor: (product: typeof products[0]) => (
        <div>
          <p className="font-medium text-secondary-900">{product.title}</p>
          <p className="text-xs text-secondary-500">#{product.partCode}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: true,
    },
    {
      header: 'Model',
      accessor: 'model',
      sortable: true,
    },
    {
      header: 'Stock',
      accessor: (product: typeof products[0]) => {
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
      accessor: 'viewCount',
      sortable: true,
    },
    {
      header: 'Date Added',
      accessor: (product: typeof products[0]) => formatDate(product.createdAt),
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (product: typeof products[0]) => (
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

  return (
    <div>
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
      
      <DataTable
        columns={columns}
        data={filteredProducts}
        keyField="id"
        searchField="title"
        actions={(product) => (
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
              className="p-1 text-secondary-700 hover:text-error-600 hover:bg-secondary-50 rounded"
              title="Delete product"
            >
              <Trash size={18} />
            </button>
          </div>
        )}
      />
      
      {/* Product Editor Modal - would be implemented fully in a real app */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              {selectedProductId ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <p className="text-secondary-600 mb-4">
              This modal would contain a complete product form in a real implementation.
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