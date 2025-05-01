import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types/product';
import { getStockStatusColor } from '../../utils/helpers';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  showRequestPrice?: boolean;
}

const ProductCard = ({ product, showRequestPrice = true }: ProductCardProps) => {
  const stockStatusColor = getStockStatusColor(product.stockStatus);

  return (
    <div className="card group transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}
        <div className={`absolute top-2 right-2 badge-${stockStatusColor}`}>
          {product.stockStatus}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-lg">
            <Link to={`/products/${product.id}`} className="text-secondary-800 hover:text-primary-600">
              {product.title}
            </Link>
          </h3>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="badge bg-secondary-100 text-secondary-800">
            Part #: {product.partCode}
          </span>
          <span className="badge bg-secondary-100 text-secondary-800">
            {product.category}
          </span>
          <span className="badge bg-secondary-100 text-secondary-800">
            {product.model}
          </span>
        </div>
        
        <p className="mt-3 text-sm text-secondary-600">
          {product.compatibility.join(', ')}
        </p>
        
        {showRequestPrice && (
          <div className="mt-4 flex justify-between items-center">
            <Link 
              to={`/products/${product.id}`} 
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              View Details
              <ArrowRight size={16} className="ml-1" />
            </Link>
            
            <Button
              variant="primary"
              size="sm"
              to={`/contact?product=${product.id}`}
            >
              Request Price
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;