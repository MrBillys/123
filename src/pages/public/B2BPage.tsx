import { useState } from 'react';
import { CheckCircle, Package, Truck, FileText, ClipboardList, Layers } from 'lucide-react';
import Button from '../../components/common/Button';

const B2BPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
    agreement: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
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
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.businessType) newErrors.businessType = 'Please select a business type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the terms and conditions';
    
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
      businessType: '',
      message: '',
      agreement: false
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary-900 opacity-70"></div>
        <div 
          className="h-[400px] bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              B2B Partnership Program
            </h1>
            <p className="text-xl max-w-2xl">
              Exclusive benefits for auto shops, mechanics, and wholesalers
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Partner Benefits</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              Join our B2B program and enjoy these exclusive advantages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wholesale Pricing</h3>
              <p className="text-secondary-700">
                Access our special pricing tiers based on your order volume, with up to 30% off retail prices.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority Shipping</h3>
              <p className="text-secondary-700">
                Get your orders processed first with dedicated shipping options and next-day delivery for urgent needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Order Discounts</h3>
              <p className="text-secondary-700">
                Additional savings on large-volume orders and recurring purchases with flexible payment terms.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicated Account Manager</h3>
              <p className="text-secondary-700">
                A personal point of contact for all your ordering, technical questions, and business needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Catalogs</h3>
              <p className="text-secondary-700">
                Get customized parts catalogs tailored to your business needs and the Ford models you service most.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <div className="text-primary-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extended Warranty</h3>
              <p className="text-secondary-700">
                Enjoy extended warranty coverage on all parts purchased through our B2B program.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership Requirements */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Partnership Requirements</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              Our B2B program is designed for businesses in the automotive sector
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">
                  <strong className="text-secondary-900">Valid Business License:</strong> Must be a registered business in the automotive sector
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">
                  <strong className="text-secondary-900">Minimum Order Volume:</strong> Regular orders with a minimum value of €500 per month
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">
                  <strong className="text-secondary-900">Payment Terms:</strong> Initial orders require payment in advance; credit terms available after established relationship
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">
                  <strong className="text-secondary-900">Geographic Location:</strong> Based in Greece or neighboring Balkan countries
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">
                  <strong className="text-secondary-900">Business Type:</strong> Auto repair shops, service centers, parts retailers, or other automotive businesses
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Apply Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Apply for B2B Partnership</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              Fill out the form below to start the application process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-success-700" />
                </div>
                <h3 className="text-xl font-semibold text-success-700 mb-2">Application Received!</h3>
                <p className="text-secondary-700 mb-4">
                  Thank you for your interest in our B2B partnership program. Our team will review your application
                  and contact you within 1-2 business days.
                </p>
                <Button 
                  variant="primary"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                    Contact Name *
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
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`input ${errors.company ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                  {errors.company && <p className="text-error-600 text-sm">{errors.company}</p>}
                </div>
                
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
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input ${errors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                  {errors.phone && <p className="text-error-600 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="businessType" className="block text-sm font-medium text-secondary-700">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={`input ${errors.businessType ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  >
                    <option value="">Select business type</option>
                    <option value="auto_repair">Auto Repair Shop</option>
                    <option value="dealer">Car Dealership</option>
                    <option value="parts_retailer">Parts Retailer</option>
                    <option value="fleet">Fleet Service</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.businessType && <p className="text-error-600 text-sm">{errors.businessType}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700">
                    Tell us about your business and requirements *
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
                
                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreement"
                        name="agreement"
                        type="checkbox"
                        checked={formData.agreement}
                        onChange={handleCheckbox}
                        className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreement" className="text-secondary-700">
                        I agree to the <a href="#" className="text-primary-600 hover:text-primary-700">terms and conditions</a> and consent to having my data processed for B2B partnership purposes. *
                      </label>
                      {errors.agreement && <p className="text-error-600 text-sm mt-1">{errors.agreement}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    fullWidth
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-secondary-600 max-w-3xl mx-auto">
              Common questions about our B2B partnership program
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-secondary-900">What is the minimum order quantity for B2B partners?</h3>
                <p className="mt-2 text-secondary-700">
                  There is no strict minimum order quantity, but we do require regular orders with a minimum value of €500 per month to maintain B2B status and associated benefits.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-secondary-900">How long does the application process take?</h3>
                <p className="mt-2 text-secondary-700">
                  Typically, we review applications within 1-2 business days. Once approved, your account will be upgraded to B2B status immediately, and your dedicated account manager will contact you.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-secondary-900">Do you offer customized pricing for specific parts?</h3>
                <p className="mt-2 text-secondary-700">
                  Yes, for high-volume specific parts that you regularly order, we can create custom pricing tiers. This is particularly beneficial for repair shops that specialize in certain Ford models.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-secondary-900">Can I order non-catalog items through the B2B program?</h3>
                <p className="mt-2 text-secondary-700">
                  Absolutely. Our B2B partners have access to our full sourcing network. If there's a specific Ford part you need that isn't in our catalog, your account manager will help source it.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-secondary-900">What payment terms are available to B2B partners?</h3>
                <p className="mt-2 text-secondary-700">
                  New B2B partners typically start with advance payment. After establishing a consistent ordering history (usually 3 months), we offer net-30 payment terms with the possibility of extending to net-60 for long-term partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2BPage;