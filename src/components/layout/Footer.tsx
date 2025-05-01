import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from '../common/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-secondary-300 text-sm">
              We provide genuine and aftermarket Ford parts for mechanics, 
              auto shops, and wholesalers throughout Greece and the Balkans.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-secondary-300 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/b2b" className="text-secondary-300 hover:text-white transition-colors">B2B Partnership</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Engine Parts" className="text-secondary-300 hover:text-white transition-colors">Engine Parts</Link>
              </li>
              <li>
                <Link to="/products?category=Transmission" className="text-secondary-300 hover:text-white transition-colors">Transmission</Link>
              </li>
              <li>
                <Link to="/products?category=Brakes" className="text-secondary-300 hover:text-white transition-colors">Brakes</Link>
              </li>
              <li>
                <Link to="/products?category=Electrical" className="text-secondary-300 hover:text-white transition-colors">Electrical</Link>
              </li>
              <li>
                <Link to="/products?category=Body Parts" className="text-secondary-300 hover:text-white transition-colors">Body Parts</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 h-5 w-5 text-primary-400 mr-3 mt-0.5" />
                <span className="text-secondary-300">
                  123 Pireos Street, Athens 12345, Greece
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 h-5 w-5 text-primary-400 mr-3" />
                <a href="tel:+302101234567" className="text-secondary-300 hover:text-white transition-colors">
                  +30 210 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 h-5 w-5 text-primary-400 mr-3" />
                <a href="mailto:info@fordpartspro.gr" className="text-secondary-300 hover:text-white transition-colors">
                  info@fordpartspro.gr
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-700 text-secondary-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} FordPartsPro. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-secondary-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;