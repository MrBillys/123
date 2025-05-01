import { 
  ArrowDownRight, 
  ArrowUpRight,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Button from '../../components/common/Button';
import DataTable from '../../components/admin/DataTable';
import { searchTerms } from '../../data/analytics';
import { formatDate, generateCsvDownload } from '../../utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SearchAnalytics = () => {
  // Take the top 10 search terms for the chart
  const topTerms = [...searchTerms]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Prepare chart data
  const chartData = {
    labels: topTerms.map(term => term.term),
    datasets: [
      {
        label: 'Search Count',
        data: topTerms.map(term => term.count),
        backgroundColor: 'rgba(0, 102, 255, 0.7)',
        borderRadius: 4,
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Search Terms',
        color: '#243b53',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };
  
  // Define columns for the data table
  const columns = [
    {
      header: 'Search Term',
      accessor: 'term',
      sortable: true,
    },
    {
      header: 'Count',
      accessor: 'count',
      sortable: true,
    },
    {
      header: 'Date',
      accessor: (term: typeof searchTerms[0]) => formatDate(term.date),
      sortable: true,
    },
    {
      header: 'Trend',
      accessor: (term: typeof searchTerms[0]) => {
        // This would normally be calculated based on previous periods
        // For demo purposes, we'll use a random trend
        const isUp = Math.random() > 0.5;
        const value = Math.floor(Math.random() * 20);
        
        return (
          <div className={`flex items-center ${isUp ? 'text-success-700' : 'text-error-700'}`}>
            {isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {value}%
          </div>
        );
      },
    },
  ];
  
  const handleExport = () => {
    generateCsvDownload(searchTerms, 'search-analytics');
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Search Analytics</h1>
          <p className="text-secondary-600">Analyze customer search patterns</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="secondary"
            leftIcon={<Calendar size={16} />}
          >
            Date Range
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<Download size={16} />}
            onClick={handleExport}
          >
            Export Data
          </Button>
        </div>
      </div>
      
      {/* Charts */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-secondary-900">Search Term Visualization</h2>
        </div>
        <div className="p-6">
          <div className="h-96">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Search Term Details</h2>
        <DataTable
          columns={columns}
          data={searchTerms}
          keyField="term"
          searchField="term"
        />
      </div>
      
      {/* Insights */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-lg font-semibold text-secondary-900">Search Insights</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-secondary-200 rounded-lg p-4">
              <h3 className="font-medium text-secondary-900 mb-2">Popular Searches without Results</h3>
              <p className="text-secondary-600 text-sm mb-4">
                These search terms are popular but have no matching products.
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span>Ford Explorer roof rack</span>
                  <span className="badge bg-secondary-100 text-secondary-800">12 searches</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>F-150 2024 headlight</span>
                  <span className="badge bg-secondary-100 text-secondary-800">9 searches</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>Mustang GT exhaust system</span>
                  <span className="badge bg-secondary-100 text-secondary-800">7 searches</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-secondary-200 rounded-lg p-4">
              <h3 className="font-medium text-secondary-900 mb-2">Search Conversion Rate</h3>
              <p className="text-secondary-600 text-sm mb-4">
                Percentage of searches that led to product views or inquiries.
              </p>
              <div className="flex items-end gap-4 mb-4">
                <div className="text-4xl font-bold text-secondary-900">37.2%</div>
                <div className="text-success-700 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  5.3% vs. last month
                </div>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '37.2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAnalytics;