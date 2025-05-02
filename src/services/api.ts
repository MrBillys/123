
/**
 * API service for connecting to the backend server
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic request function with error handling
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Product API endpoints
export const productApi = {
  // Get all products
  getAll: () => request<Product[]>('/products'),
  
  // Get product by ID
  getById: (id: string) => request<Product>(`/products/${id}`),
  
  // Create new product
  create: (product: Omit<Product, 'id'>) => 
    request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  
  // Update product
  update: (id: string, product: Partial<Product>) => 
    request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  
  // Delete product
  delete: (id: string) => 
    request<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Category API endpoints
export const categoryApi = {
  // Get all categories
  getAll: () => request<Category[]>('/categories'),
  
  // Get category by ID
  getById: (id: string) => request<Category>(`/categories/${id}`),
};

// Import Product and Category types to maintain consistency
import { Product, Category } from '../types/product';

export type ApiError = {
  status: number;
  message: string;
}
