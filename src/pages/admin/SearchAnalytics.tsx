import React from 'react';

const SearchAnalytics = () => {
  // Mock data for search analytics
  const analyticsData = {
    totalSearches: 1250,
    popularCategories: [
      { category: 'Engine Parts', count: 320 },
      { category: 'Brake Components', count: 280 },
      { category: 'Suspension Systems', count: 210 },
    ],
    searchTerms: [
      { term: 'Ford F-150 brakes', count: 150, conversionRate: 12 },
      { term: 'Mustang engine', count: 120, conversionRate: 10 },
      { term: 'Explorer tires', count: 90, conversionRate: 8 },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Analytics</h1>

      {/* Total Searches */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Total Searches</h2>
        <p className="text-3xl font-bold text-primary-600">{analyticsData.totalSearches}</p>
      </div>

      {/* Popular Categories */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Popular Categories</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.popularCategories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{category.category}</td>
                <td className="py-3 px-4">{category.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Search Terms */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Top Search Terms</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Search Term</th>
              <th className="text-left py-2">Count</th>
              <th className="text-left py-2">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.searchTerms.length > 0 ? (
              analyticsData.searchTerms.map((term, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{term.term}</td>
                  <td className="py-3 px-4">{term.count}</td>
                  <td className="py-3 px-4">{term.conversionRate}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">No search data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchAnalytics;
