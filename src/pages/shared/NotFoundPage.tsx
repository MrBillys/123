import { AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-24 w-24 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-4">Page Not Found</h2>
        <p className="text-secondary-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" to="/">
            Back to Home
          </Button>
          <Button variant="outline" to="/products">
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;