
import React, { useState } from 'react';
import { Product } from '../../types/product';
import Button from '../common/Button';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      title: '',
      partCode: '',
      mliCode: '',
      category: '',
      model: '',
      description: '',
      stockStatus: 'In Stock',
      yearRange: '',
      compatibility: [],
      viewCount: 0,
      isVisible: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompatibilityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, compatibility: values }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-secondary-700">
            Product Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="partCode" className="block text-sm font-medium text-secondary-700">
            Part Code*
          </label>
          <input
            type="text"
            id="partCode"
            name="partCode"
            value={formData.partCode || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="mliCode" className="block text-sm font-medium text-secondary-700">
            MLI Code*
          </label>
          <input
            type="text"
            id="mliCode"
            name="mliCode"
            value={formData.mliCode || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-secondary-700">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Category</option>
            <option value="Engine Parts">Engine Parts</option>
            <option value="Transmission">Transmission</option>
            <option value="Suspension">Suspension</option>
            <option value="Brakes">Brakes</option>
            <option value="Electrical">Electrical</option>
            <option value="Body Parts">Body Parts</option>
            <option value="Interior">Interior</option>
            <option value="Cooling">Cooling</option>
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-secondary-700">
            Model*
          </label>
          <select
            id="model"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Model</option>
            <option value="Fiesta">Fiesta</option>
            <option value="Focus">Focus</option>
            <option value="Mustang">Mustang</option>
            <option value="Escape">Escape</option>
            <option value="Explorer">Explorer</option>
            <option value="F-150">F-150</option>
            <option value="Ranger">Ranger</option>
            <option value="Bronco">Bronco</option>
            <option value="Edge">Edge</option>
            <option value="Transit">Transit</option>
          </select>
        </div>

        <div>
          <label htmlFor="yearRange" className="block text-sm font-medium text-secondary-700">
            Year Range*
          </label>
          <select
            id="yearRange"
            name="yearRange"
            value={formData.yearRange || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Year Range</option>
            <option value="2020-2023">2020-2023</option>
            <option value="2015-2019">2015-2019</option>
            <option value="2010-2014">2010-2014</option>
            <option value="2005-2009">2005-2009</option>
            <option value="2000-2004">2000-2004</option>
            <option value="Pre-2000">Pre-2000</option>
          </select>
        </div>

        <div>
          <label htmlFor="stockStatus" className="block text-sm font-medium text-secondary-700">
            Stock Status
          </label>
          <select
            id="stockStatus"
            name="stockStatus"
            value={formData.stockStatus || 'In Stock'}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="In Stock">In Stock</option>
            <option value="Limited">Limited</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="col-span-2">
          <label htmlFor="compatibility" className="block text-sm font-medium text-secondary-700">
            Compatibility (comma separated)
          </label>
          <textarea
            id="compatibility"
            name="compatibility"
            value={formData.compatibility?.join(', ') || ''}
            onChange={handleCompatibilityChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-secondary-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-secondary-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="isVisible"
              name="isVisible"
              checked={formData.isVisible || false}
              onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor="isVisible" className="ml-2 block text-sm text-secondary-700">
              Product is visible
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
