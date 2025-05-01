import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Share, ShoppingCart } from 'lucide-react';
import { products } from '../../data/products';
import Button from '../../components/common/Button';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src={product.image} alt={product.title} className="rounded-lg shadow-md" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold text-secondary-900 mb-2">{product.title}</h1>
          <p className="text-secondary-600 mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <div className="text-xl font-bold text-primary-600 mr-4">${product.price}</div>
            <div className="flex items-center text-secondary-500">
              <Star className="h-5 w-5 mr-1 text-yellow-500" />
              <span>{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-3 text-secondary-700 font-medium">Quantity:</label>
            <div className="flex items-center border border-secondary-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 text-secondary-500 hover:text-primary-600 focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 text-center text-secondary-700 focus:outline-none"
                min="1"
              />
              <button
                onClick={incrementQuantity}
                className="px-3 py-2 text-secondary-500 hover:text-primary-600 focus:outline-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button variant="primary" leftIcon={<ShoppingCart size={16} />} className="mb-4">
            Add to Cart
          </Button>

          {/* Social Sharing */}
          <div className="flex items-center text-secondary-500">
            <Share className="h-5 w-5 mr-2" />
            <span>Share this product</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
