import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { getProductById } from '../../data/products';
import { Product } from '../../types/product';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [product, setProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    productId: productId || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
      
      if (foundProduct) {
        setFormData(prev => ({
          ...prev,
          productId,
          message: `I'm interested in the ${foundProduct.title} (Part #: ${foundProduct.partCode}). Please provide pricing and availability information.`
        }));
      }
    }
  }, [productId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid - in a real app, this would submit to the backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      productId: ''
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">Contact Us</h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-secondary-900">Our Location</h3>
                    <address className="mt-2 text-secondary-600 not-italic">
                      123 Pireos Street<br />
                      Athens, 12345<br />
                      Greece
                    </address>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-secondary-900">Phone</h3>
                    <p className="mt-2 text-secondary-600">
                      <a href="tel:+302101234567" className="hover:text-primary-600">+30 210 123 4567</a>
                    </p>
                    <p className="mt-1 text-secondary-600">
                      <a href="https://wa.me/302101234567" className="hover:text-primary-600">WhatsApp: +30 210 123 4567</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-secondary-900">Email</h3>
                    <p className="mt-2 text-secondary-600">
                      <a href="mailto:info@fordpartspro.gr" className="hover:text-primary-600">info@fordpartspro.gr</a>
                    </p>
                    <p className="mt-1 text-secondary-600">
                      <a href="mailto:b2b@fordpartspro.gr" className="hover:text-primary-600">b2b@fordpartspro.gr</a> (For business inquiries)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Business Hours</h3>
                <table className="min-w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 text-secondary-600">Monday - Friday</td>
                      <td className="py-2 text-secondary-900">9:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-secondary-600">Saturday</td>
                      <td className="py-2 text-secondary-900">9:00 AM - 2:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-secondary-600">Sunday</td>
                      <td className="py-2 text-secondary-900">Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium text-secondary-900 mb-4">Location</h3>
                <div className="rounded-lg overflow-hidden h-64 border border-secondary-200">
                  {/* Google Map Embed would go here in a real implementation */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-secondary-600">
                    Google Map Embed
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Send a Message</h2>
              
              {product && (
                <div className="mb-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                  <p className="text-secondary-700 mb-2">
                    <strong>Inquiring about:</strong> {product.title}
                  </p>
                  <p className="text-secondary-700">
                    <strong>Part #:</strong> {product.partCode}
                  </p>
                </div>
              )}
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-success-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-success-700 mb-2">Message Sent!</h3>
                  <p className="text-secondary-700 mb-4">
                    Thank you for contacting us. We've received your message and will get back to you
                    within 24 hours during business days.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input ${errors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      />
                      {errors.name && <p className="text-error-600 text-sm">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-secondary-700">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      />
                      {errors.email && <p className="text-error-600 text-sm">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-secondary-700">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`input ${errors.message ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                    ></textarea>
                    {errors.message && <p className="text-error-600 text-sm">{errors.message}</p>}
                  </div>
                  
                  <div>
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      fullWidth
                      leftIcon={<MessageSquare size={18} />}
                    >
                      Send Message
                    </Button>
                    <p className="mt-2 text-sm text-secondary-500">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;