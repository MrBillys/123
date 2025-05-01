import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import AboutPage from './pages/public/AboutPage';
import B2BPage from './pages/public/B2BPage';
import ContactPage from './pages/public/ContactPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import SearchAnalytics from './pages/admin/SearchAnalytics';
import LeadManagement from './pages/admin/LeadManagement';
import StockImport from './pages/admin/StockImport';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/shared/NotFoundPage';

import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="analytics" element={<SearchAnalytics />} />
        <Route path="leads" element={<LeadManagement />} />
        <Route path="stock" element={<StockImport />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;