import { Lead } from '../types/lead';

export const leads: Lead[] = [
  {
    id: '1',
    name: 'George Papadopoulos',
    company: 'Athens Auto Service',
    email: 'george@athensauto.gr',
    phone: '+30 210 1234567',
    message: 'Looking for bulk pricing on Ford F-150 brake pads. We service many American vehicles.',
    productId: '2',
    productName: 'Ford F-150 Brake Pads (Front)',
    status: 'contacted',
    createdAt: '2023-05-15T10:23:15Z'
  },
  {
    id: '2',
    name: 'Maria Konstantinou',
    company: 'EuroAmerican Motors',
    email: 'maria@euroamerican.gr',
    phone: '+30 210 7654321',
    message: 'We need a complete catalog of all Ford Mustang parts you carry. We are expanding our service department.',
    status: 'new',
    createdAt: '2023-06-02T14:18:42Z'
  },
  {
    id: '3',
    name: 'Dimitris Alexiou',
    company: 'D&A Auto Parts',
    email: 'dimitris@daautoparts.gr',
    phone: '+30 697 1234567',
    message: 'Interested in establishing a wholesale account. We have three locations in northern Greece.',
    status: 'contacted',
    createdAt: '2023-05-28T08:41:33Z'
  },
  {
    id: '4',
    name: 'Andreas Papoutsis',
    email: 'andreas.p@gmail.com',
    phone: '+30 694 7865432',
    message: 'Is this part compatible with a 2017 Ford Focus diesel?',
    productId: '3',
    productName: 'Ford Focus Electric Window Regulator',
    status: 'closed',
    createdAt: '2023-04-12T16:09:27Z'
  },
  {
    id: '5',
    name: 'Christina Demetriou',
    company: 'ChrisGarage',
    email: 'info@chrisgarage.gr',
    phone: '+30 210 9876543',
    message: 'Need pricing for multiple Ford Transit parts. Please contact me to discuss a large order.',
    productId: '7',
    productName: 'Ford Transit Transmission Filter Kit',
    status: 'new',
    createdAt: '2023-06-10T11:37:52Z'
  },
  {
    id: '6',
    name: 'Nikos Stavrou',
    email: 'nstavrou@hotmail.com',
    message: 'Looking for this exact part but for a 2020 Ford Ranger. Do you have it in stock?',
    productId: '6',
    productName: 'Ford Ranger Fuel Pump Assembly',
    status: 'new',
    createdAt: '2023-06-15T09:14:08Z'
  },
  {
    id: '7',
    name: 'Sofia Papadaki',
    company: 'SP Auto Import',
    email: 'sofia@spauto.gr',
    phone: '+30 693 1472583',
    message: 'Requesting wholesale pricing sheet for all Ford original and aftermarket parts.',
    status: 'contacted',
    createdAt: '2023-05-05T13:22:46Z'
  },
  {
    id: '8',
    name: 'Kostas Antonopoulos',
    company: 'American Car Services',
    email: 'kantonopoulos@acs.gr',
    phone: '+30 210 3698521',
    message: 'Need regular supply of common Ford parts. Looking to establish ongoing B2B relationship.',
    status: 'closed',
    createdAt: '2023-04-22T15:49:31Z'
  }
];

export const getRecentLeads = (limit = 5): Lead[] => {
  return [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getLeadsByStatus = (status: Lead['status']): Lead[] => {
  return leads.filter(lead => lead.status === status);
};

export const getLeadById = (id: string): Lead | undefined => {
  return leads.find(lead => lead.id === id);
};