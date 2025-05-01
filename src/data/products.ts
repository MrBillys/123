import { Product, Category } from '../types/product';

export const categories: Category[] = [
  { id: '1', name: 'Engine Parts', slug: 'engine-parts', count: 87 },
  { id: '2', name: 'Transmission', slug: 'transmission', count: 54 },
  { id: '3', name: 'Suspension', slug: 'suspension', count: 42 },
  { id: '4', name: 'Brakes', slug: 'brakes', count: 35 },
  { id: '5', name: 'Electrical', slug: 'electrical', count: 63 },
  { id: '6', name: 'Body Parts', slug: 'body-parts', count: 71 },
  { id: '7', name: 'Interior', slug: 'interior', count: 48 },
  { id: '8', name: 'Cooling', slug: 'cooling', count: 29 },
];

export const fordModels = [
  'Fiesta', 'Focus', 'Mustang', 'Escape', 'Explorer', 
  'F-150', 'Ranger', 'Bronco', 'Edge', 'Transit'
];

export const yearRanges = [
  '2020-2023', '2015-2019', '2010-2014', '2005-2009', '2000-2004', 'Pre-2000'
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Ford Mustang V8 Air Filter',
    partCode: '7654321',
    mliCode: 'FMAF-V8',
    category: 'Engine Parts',
    compatibility: ['Mustang GT 2018-2023'],
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'High-performance air filter for Ford Mustang V8 models. Provides increased airflow and engine protection.',
    stockStatus: 'In Stock',
    yearRange: '2018-2023',
    model: 'Mustang',
    viewCount: 452,
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-05-20T14:15:00Z',
    isVisible: true
  },
  {
    id: '2',
    title: 'Ford F-150 Brake Pads (Front)',
    partCode: '1234567',
    mliCode: 'F150-BP-F',
    category: 'Brakes',
    compatibility: ['F-150 2015-2023'],
    image: 'https://images.pexels.com/photos/2901281/pexels-photo-2901281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Genuine Ford replacement brake pads for F-150 trucks. Provides optimal stopping power and long-lasting performance.',
    stockStatus: 'Limited',
    yearRange: '2015-2023',
    model: 'F-150',
    viewCount: 367,
    createdAt: '2023-02-10T09:45:00Z',
    updatedAt: '2023-06-18T11:20:00Z',
    isVisible: true
  },
  {
    id: '3',
    title: 'Ford Focus Electric Window Regulator',
    partCode: '2345678',
    mliCode: 'FCWR-DR',
    category: 'Electrical',
    compatibility: ['Focus 2012-2018'],
    image: 'https://images.pexels.com/photos/2922140/pexels-photo-2922140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Driver side electric window regulator for Ford Focus models. Direct replacement for smooth window operation.',
    stockStatus: 'Out of Stock',
    yearRange: '2012-2018',
    model: 'Focus',
    viewCount: 198,
    createdAt: '2023-03-05T14:20:00Z',
    updatedAt: '2023-07-12T10:30:00Z',
    isVisible: true
  },
  {
    id: '4',
    title: 'Ford Explorer Suspension Control Arm',
    partCode: '3456789',
    mliCode: 'EXPCA-FL',
    category: 'Suspension',
    compatibility: ['Explorer 2016-2023'],
    image: 'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Front left suspension control arm for Ford Explorer. Ensures proper wheel alignment and smooth ride quality.',
    stockStatus: 'In Stock',
    yearRange: '2016-2023',
    model: 'Explorer',
    viewCount: 234,
    createdAt: '2023-01-28T11:15:00Z',
    updatedAt: '2023-05-30T16:45:00Z',
    isVisible: true
  },
  {
    id: '5',
    title: 'Ford Escape Alternator',
    partCode: '4567890',
    mliCode: 'ESCALT-4C',
    category: 'Electrical',
    compatibility: ['Escape 2013-2019'],
    image: 'https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Replacement alternator for Ford Escape 4-cylinder engines. Ensures reliable electrical power generation.',
    stockStatus: 'In Stock',
    yearRange: '2013-2019',
    model: 'Escape',
    viewCount: 321,
    createdAt: '2023-02-20T10:05:00Z',
    updatedAt: '2023-06-25T09:10:00Z',
    isVisible: true
  },
  {
    id: '6',
    title: 'Ford Ranger Fuel Pump Assembly',
    partCode: '5678901',
    mliCode: 'RNGFP-V6',
    category: 'Engine Parts',
    compatibility: ['Ranger 2019-2023'],
    image: 'https://images.pexels.com/photos/4489729/pexels-photo-4489729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Complete fuel pump assembly for Ford Ranger pickup trucks. Ensures proper fuel delivery to the engine.',
    stockStatus: 'Limited',
    yearRange: '2019-2023',
    model: 'Ranger',
    viewCount: 276,
    createdAt: '2023-03-15T13:40:00Z',
    updatedAt: '2023-07-05T15:25:00Z',
    isVisible: true
  },
  {
    id: '7',
    title: 'Ford Transit Transmission Filter Kit',
    partCode: '6789012',
    mliCode: 'TRNSTFK',
    category: 'Transmission',
    compatibility: ['Transit 2014-2023'],
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Transmission filter and gasket kit for Ford Transit vans. Regular replacement ensures optimal transmission performance.',
    stockStatus: 'In Stock',
    yearRange: '2014-2023',
    model: 'Transit',
    viewCount: 189,
    createdAt: '2023-04-02T09:30:00Z',
    updatedAt: '2023-08-10T11:50:00Z',
    isVisible: true
  },
  {
    id: '8',
    title: 'Ford Edge Radiator Assembly',
    partCode: '7890123',
    mliCode: 'EDGERAD',
    category: 'Cooling',
    compatibility: ['Edge 2015-2022'],
    image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Complete radiator assembly for Ford Edge SUVs. Ensures proper engine cooling and prevents overheating.',
    stockStatus: 'Out of Stock',
    yearRange: '2015-2022',
    model: 'Edge',
    viewCount: 245,
    createdAt: '2023-02-05T15:20:00Z',
    updatedAt: '2023-06-15T08:35:00Z',
    isVisible: true
  },
  {
    id: '9',
    title: 'Ford Fiesta Clutch Kit',
    partCode: '8901234',
    mliCode: 'FSTCLTCH',
    category: 'Transmission',
    compatibility: ['Fiesta 2011-2019'],
    image: 'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Complete clutch kit for manual transmission Ford Fiesta models. Includes pressure plate, clutch disc, and release bearing.',
    stockStatus: 'In Stock',
    yearRange: '2011-2019',
    model: 'Fiesta',
    viewCount: 213,
    createdAt: '2023-04-18T12:55:00Z',
    updatedAt: '2023-08-22T09:40:00Z',
    isVisible: true
  },
  {
    id: '10',
    title: 'Ford Bronco Headlight Assembly',
    partCode: '9012345',
    mliCode: 'BRNHDLT-R',
    category: 'Body Parts',
    compatibility: ['Bronco 2021-2023'],
    image: 'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Right side headlight assembly for new Ford Bronco models. Direct replacement with plug-and-play installation.',
    stockStatus: 'Limited',
    yearRange: '2021-2023',
    model: 'Bronco',
    viewCount: 387,
    createdAt: '2023-03-25T10:10:00Z',
    updatedAt: '2023-07-28T14:05:00Z',
    isVisible: true
  }
];

// Helper function to get products with filtering
export const getFilteredProducts = (filters: {
  category?: string;
  model?: string;
  year?: string;
  mliCode?: string;
}) => {
  return products.filter(product => {
    // Apply category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Apply model filter
    if (filters.model && product.model !== filters.model) {
      return false;
    }
    
    // Apply year filter (check if product's year range overlaps with filter)
    if (filters.year && !isYearInRange(filters.year, product.yearRange)) {
      return false;
    }
    
    // Apply MLI code filter
    if (filters.mliCode && !product.mliCode.includes(filters.mliCode)) {
      return false;
    }
    
    return product.isVisible;
  });
};

// Helper function to check if a year is in a given range
const isYearInRange = (yearFilter: string, productYearRange: string) => {
  // Simple check - could be enhanced for more complex ranges
  return yearFilter === productYearRange || productYearRange.includes(yearFilter);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && 
               (p.category === product.category || p.model === product.model))
    .slice(0, limit);
};