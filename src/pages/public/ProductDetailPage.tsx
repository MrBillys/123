import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Facebook, Twitter, Link as LinkIcon, Truck, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';
import { getProductById, getRelatedProducts } from '../../data/products';
import { getStockStatusColor } from '../../utils/helpers';
import { Product } from '../../types/product';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundProduct = getProductById(id);
        setProduct(foundProduct || null);
        
        if (foundProduct) {
          setRelatedProducts(getRelatedProducts(foundProduct));
        }
      }
      
      setLoading(false);
    }, 300);
  }, [id]);
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-1/4 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-8"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-8"></div>
              <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button variant="primary" to="/products">
          Back to Products
        </Button>
      </div>
    );
  }
  
  const stockStatusColor = getStockStatusColor(product.stockStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex items-center text-sm font-medium text-secondary-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-secondary-800">{product.title}</span>
        </nav>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <span className="text-secondary-400">No image available</span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">{product.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="badge bg-secondary-100 text-secondary-800 font-medium">
              Part #: {product.partCode}
            </span>
            <span className="badge bg-secondary-100 text-secondary-800 font-medium">
              MLI: {product.mliCode}
            </span>
            <span className={`badge-${stockStatusColor}`}>
              {product.stockStatus}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-secondary-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Compatibility</h2>
            <p className="text-secondary-700">{product.compatibility.join(', ')}</p>
          </div>
          
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="mr-3 text-primary-600">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-900">Shipping</p>
                <p className="text-sm text-secondary-600">1-3 business days</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 text-primary-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-900">Warranty</p>
                <p className="text-sm text-secondary-600">12 months</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <Button
              variant="primary"
              size="lg"
              to={`/contact?product=${product.id}`}
              leftIcon={<MessageSquare size={18} />}
            >
              Request Price
            </Button>
          </div>
          
          {/* Share */}
          <div>
            <p className="text-sm font-medium text-secondary-700 mb-2">Share this product:</p>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors">
                <Facebook size={16} />
              </button>
              <button className="p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors">
                <Twitter size={16} />
              </button>
              <button className="p-2 rounded-full bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors">
                <LinkIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;