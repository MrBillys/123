import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { products } from '../../data/products';

interface Product {
  id: string;
  name: string;
  cost: number;
  imageUrl: string;
  inStock: boolean;
  viewCount: number;
  category: string;
  compatibleModels: string[];
  description: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct);
    }
  }, [id]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {product ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full object-contain h-80"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-600">${product.cost.toFixed(2)}</span>
              <span className="ml-2 text-secondary-500 text-sm">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-secondary-300"} 
                />
              ))}
              <span className="ml-2 text-secondary-600 text-sm">{product.viewCount} reviews</span>
            </div>
            
            <p className="text-secondary-700 mb-6">{product.description}</p>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-secondary-600">Product not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
