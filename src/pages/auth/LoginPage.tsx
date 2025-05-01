import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

interface LocationState {
  from?: { pathname: string };
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const from = state?.from?.pathname || '/admin';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">Admin Login</h2>
          <p className="mt-2 text-sm text-secondary-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        <div className="bg-primary-50 border border-primary-100 rounded-md p-4 text-primary-800">
          <p className="text-sm font-medium">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-sm">
            Email: <code className="bg-white px-1 py-0.5 rounded">admin@example.com</code>
          </p>
          <p className="text-sm">
            Password: <code className="bg-white px-1 py-0.5 rounded">admin123</code>
          </p>
        </div>
        
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-md p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-error-600 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-error-700">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="text-center">
            <a href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Return to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;