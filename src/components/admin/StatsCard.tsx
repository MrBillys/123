import { twMerge } from 'tailwind-merge';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  return (
    <div className={twMerge("bg-white rounded-lg shadow p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-secondary-500 text-sm font-medium">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-secondary-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  trend.isUpward ? 'text-success-700' : 'text-error-700'
                }`}
              >
                {trend.isUpward ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-secondary-500 text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="bg-primary-50 p-3 rounded-full text-primary-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;