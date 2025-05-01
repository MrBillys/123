import { ArrowRight, Truck, Shield, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';
import { products } from '../../data/products';

const HomePage = () => {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  
  // Featured categories
  const featuredCategories = [
    { 
      name: 'Engine Parts', 
      image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: 87
    },
    { 
      name: 'Brakes', 
      image: 'https://images.pexels.com/photos/2901281/pexels-photo-2901281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: 35
    },
    { 
      name: 'Electrical', 
      image: 'https://images.pexels.com/photos/2922140/pexels-photo-2922140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: 63
    },
    { 
      name: 'Transmission', 
      image: 'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: 54
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary-900 opacity-70"></div>
        <div 
          className="h-[600px] bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
              Greece's Premier Supplier of Ford Auto Parts
            </h1>
            <p className="text-xl max-w-2xl mb-8">
              Genuine and quality aftermarket parts for mechanics, auto shops, and wholesalers
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                to="/products"
              >
                Browse Parts Catalog
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/b2b"
                className="text-white border-white hover:bg-white hover:text-secondary-900"
              >
                B2B Partnership
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Why Choose FordPartsPro?</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              We provide the highest quality Ford auto parts with reliable service throughout Greece and the Balkans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 p-4 rounded-full text-primary-600 mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-secondary-600">
                Next-day delivery available throughout Greece and 2-3 days for the Balkans.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 p-4 rounded-full text-primary-600 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-secondary-600">
                All parts come with a 12-month warranty and satisfaction guarantee.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 p-4 rounded-full text-primary-600 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Catalog</h3>
              <p className="text-secondary-600">
                Over 10,000 Ford parts in stock, covering models from 1990 to present.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-50 p-4 rounded-full text-primary-600 mb-4">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-secondary-600">
                Our team of Ford specialists is available to help with technical queries.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900">Featured Categories</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All Categories <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="block group"
              >
                <div className="relative h-60 overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm mt-1">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All Products <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Ordering?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join hundreds of businesses across Greece that trust us for their Ford parts needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              to="/products"
              className="text-white border-white hover:bg-white hover:text-primary-600"
            >
              Browse Catalog
            </Button>
            <Button
              variant="primary"
              size="lg"
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;