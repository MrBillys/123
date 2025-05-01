export interface Product {
  id: string;
  title: string;
  partCode: string; // 7 digits
  category: string;
  compatibility: string[];
  image?: string;
  description: string;
  stockStatus: 'In Stock' | 'Limited' | 'Out of Stock';
  yearRange: string;
  model: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
  mliCode: string; // Manufacturer Line Item code
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface FilterState {
  mliCode?: string;
  category?: string;
  model?: string;
  year?: string;
}