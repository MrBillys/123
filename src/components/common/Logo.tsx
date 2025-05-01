import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ variant = 'dark', size = 'md' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-900';
  
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };
  
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32
  };

  return (
    <Link to="/" className={`font-bold flex items-center gap-2 ${sizeClasses[size]} ${textColor}`}>
      <Wrench size={iconSizes[size]} className="text-primary-600" />
      <span>FordParts<span className="text-primary-600">Pro</span></span>
    </Link>
  );
};

export default Logo;