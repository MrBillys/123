import { useState } from 'react';
import { 
  Users, 
  Package, 
  Search, 
  TrendingUp,
  BarChart,
  Eye
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import StatsCard from '../../components/admin/StatsCard';
import { getRecentLeads } from '../../data/leads';
import { getTopSearchTerms, getVisitStatsByDateRange, productViewsData } from '../../data/analytics';
import { formatDate } from '../../utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [visitsRange, setVisitsRange] = useState<7 | 14 | 30>(7);
  
  // Get data
  const recentLeads = getRecentLeads();
  const topSearchTerms = getTopSearchTerms(5);
  const visitStats = getVisitStatsByDateRange(visitsRange);
  
  // Prepare chart data for visits
  const visitChartData = {
    labels: visitStats.map(stat => stat.date.slice(5)), // Format dates as MM-DD
    datasets: [
      {
        label: 'Daily Visits',
        data: visitStats.map(stat => stat.visits),
        borderColor: '#0066ff',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        borderWidth: 2,
        tension: 0.2,
        fill: true,
      }
    ]
  };
  
  // Prepare chart data for product views
  const productViewsChartData = {
    labels: productViewsData.map(item => item.name),
    datasets: [
      {
        label: 'Product Views',
        data: productViewsData.map(item => item.views),
        backgroundColor: 'rgba(0, 102, 255, 0.7)',
        borderRadius: 4,
      }
    ]
  };
  
  // Options for charts
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Website Visits',
        color: '#243b53',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(...visitStats.map(stat => stat.visits)) * 0.9,
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Most Viewed Products',
        color: '#243b53',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600">Overview of your store's performance</p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Leads"
          value="48"
          icon={<Users size={24} />}
          trend={{ value: 12, isUpward: true }}
        />
        
        <StatsCard
          title="Active Products"
          value="126"
          icon={<Package size={24} />}
          trend={{ value: 5, isUpward: true }}
        />
        
        <StatsCard
          title="Total Searches"
          value="564"
          icon={<Search size={24} />}
          trend={{ value: 8, isUpward: true }}
        />
        
        <StatsCard
          title="Conversion Rate"
          value="8.2%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 3, isUpward: false }}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Website Traffic</h2>
            <div className="flex">
              <button
                className={`px-3 py-1 text-sm rounded-l-md ${
                  visitsRange === 7
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={() => setVisitsRange(7)}
              >
                7 Days
              </button>
              <button
                className={`px-3 py-1 text-sm ${
                  visitsRange === 14
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={() => setVisitsRange(14)}
              >
                14 Days
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-r-md ${
                  visitsRange === 30
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
                onClick={() => setVisitsRange(30)}
              >
                30 Days
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <Line options={lineChartOptions} data={visitChartData} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-80">
            <Bar options={barChartOptions} data={productViewsChartData} />
          </div>
        </div>
      </div>
      
      {/* Data Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Recent Leads</h2>
          </div>
          <div className="divide-y divide-secondary-200">
            {recentLeads.length > 0 ? (
              recentLeads.map(lead => (
                <div key={lead.id} className="p-4 hover:bg-secondary-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-secondary-900">{lead.name}</p>
                      <p className="text-sm text-secondary-600">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex badge ${
                        lead.status === 'new' ? 'badge-success' :
                        lead.status === 'contacted' ? 'badge-warning' :
                        'bg-secondary-100 text-secondary-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-xs text-secondary-500 mt-1">{formatDate(lead.createdAt)}</p>
                    </div>
                  </div>
                  {lead.productName && (
                    <p className="text-sm text-primary-600 mt-1">
                      Product: {lead.productName}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-secondary-600">
                No leads found
              </div>
            )}
          </div>
          <div className="p-4 border-t border-secondary-200">
            <a 
              href="/admin/leads" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all leads
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Top Search Terms</h2>
          </div>
          <div>
            <ul>
              {topSearchTerms.map((term, index) => (
                <li key={index} className="flex items-center justify-between p-4 border-b border-secondary-100 last:border-b-0">
                  <div className="flex items-center">
                    <Search className="h-5 w-5 text-secondary-500 mr-2" />
                    <span className="text-secondary-800">{term.term}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-secondary-600 text-sm mr-2">{term.count} searches</span>
                    <div className="w-16 bg-secondary-100 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, term.count / topSearchTerms[0].count * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-secondary-200">
            <a 
              href="/admin/analytics" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all search analytics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;