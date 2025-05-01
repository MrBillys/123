export interface SearchTerm {
  term: string;
  count: number;
  date: string;
}

export interface VisitStat {
  date: string;
  visits: number;
}

export const searchTerms: SearchTerm[] = [
  { term: 'F-150 brake pads', count: 87, date: '2023-06-12T00:00:00Z' },
  { term: 'Mustang air filter', count: 64, date: '2023-06-14T00:00:00Z' },
  { term: 'Ford Focus window regulator', count: 53, date: '2023-06-10T00:00:00Z' },
  { term: 'Ranger fuel pump', count: 49, date: '2023-06-15T00:00:00Z' },
  { term: 'Transit filter', count: 42, date: '2023-06-08T00:00:00Z' },
  { term: 'Explorer suspension', count: 37, date: '2023-06-13T00:00:00Z' },
  { term: 'Edge radiator', count: 32, date: '2023-06-11T00:00:00Z' },
  { term: 'Bronco headlight', count: 29, date: '2023-06-09T00:00:00Z' },
  { term: 'Fiesta clutch', count: 25, date: '2023-06-14T00:00:00Z' },
  { term: 'Escape alternator', count: 21, date: '2023-06-12T00:00:00Z' },
  { term: 'F-150 coolant', count: 18, date: '2023-06-15T00:00:00Z' },
  { term: 'Focus timing belt', count: 16, date: '2023-06-13T00:00:00Z' },
  { term: 'Mustang exhaust', count: 15, date: '2023-06-10T00:00:00Z' },
  { term: 'Transit brake disc', count: 14, date: '2023-06-11T00:00:00Z' },
  { term: 'Explorer oxygen sensor', count: 12, date: '2023-06-09T00:00:00Z' },
];

export const visitStats: VisitStat[] = [
  { date: '2023-06-01', visits: 245 },
  { date: '2023-06-02', visits: 263 },
  { date: '2023-06-03', visits: 198 },
  { date: '2023-06-04', visits: 187 },
  { date: '2023-06-05', visits: 305 },
  { date: '2023-06-06', visits: 312 },
  { date: '2023-06-07', visits: 298 },
  { date: '2023-06-08', visits: 276 },
  { date: '2023-06-09', visits: 265 },
  { date: '2023-06-10', visits: 197 },
  { date: '2023-06-11', visits: 185 },
  { date: '2023-06-12', visits: 327 },
  { date: '2023-06-13', visits: 338 },
  { date: '2023-06-14', visits: 315 },
  { date: '2023-06-15', visits: 294 },
];

export const productViewsData = [
  { name: 'Mustang V8 Air Filter', views: 452 },
  { name: 'F-150 Brake Pads', views: 367 },
  { name: 'Bronco Headlight Assembly', views: 387 },
  { name: 'Escape Alternator', views: 321 },
  { name: 'Ranger Fuel Pump', views: 276 },
];

export const getMostViewedProducts = (limit = 5) => {
  return productViewsData.slice(0, limit);
};

export const getTopSearchTerms = (limit = 10) => {
  return [...searchTerms]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const getVisitStatsByDateRange = (days = 7) => {
  return visitStats.slice(-days);
};