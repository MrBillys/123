export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}