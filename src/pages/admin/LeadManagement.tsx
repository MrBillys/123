import { useState } from 'react';
import { Download, Filter, Mail, Phone, MessageSquare, UserCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import DataTable from '../../components/admin/DataTable';
import { leads } from '../../data/leads';
import { formatDate, generateCsvDownload } from '../../utils/helpers';

const LeadManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  
  const handleExport = () => {
    generateCsvDownload(filteredLeads, 'leads-export');
  };
  
  const handleViewLead = (lead: typeof leads[0]) => {
    setSelectedLead(lead);
  };
  
  const filteredLeads = selectedStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === selectedStatus);
  
  // Define columns for the data table
  const columns = [
    {
      header: 'Lead',
      accessor: (lead: typeof leads[0]) => (
        <div>
          <p className="font-medium text-secondary-900">{lead.name}</p>
          <p className="text-xs text-secondary-500">
            {lead.company && `${lead.company} • `}{lead.email}
          </p>
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: (lead: typeof leads[0]) => formatDate(lead.createdAt),
      sortable: true,
    },
    {
      header: 'Source',
      accessor: (lead: typeof leads[0]) => 
        lead.productName 
          ? <span className="text-primary-600">Product Inquiry</span>
          : <span>Contact Form</span>,
    },
    {
      header: 'Status',
      accessor: (lead: typeof leads[0]) => {
        const statusColors = {
          'new': 'text-success-700 bg-success-50',
          'contacted': 'text-warning-700 bg-warning-50',
          'closed': 'text-secondary-700 bg-secondary-100',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
            {lead.status === 'new' ? 'New' : 
             lead.status === 'contacted' ? 'Contacted' : 'Closed'}
          </span>
        );
      },
    },
  ];
  
  // Count leads by status for the filter buttons
  const leadCounts = {
    all: leads.length,
    new: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    closed: leads.filter(lead => lead.status === 'closed').length,
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Lead Management</h1>
          <p className="text-secondary-600">Track and manage customer inquiries</p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Download size={16} />}
          onClick={handleExport}
        >
          Export Leads
        </Button>
      </div>
      
      {/* Status filter tabs */}
      <div className="mb-6">
        <div className="border-b border-secondary-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`${
                selectedStatus === 'all'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-600 hover:text-secondary-800 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Filter size={16} className="mr-2" />
              All
              <span className="ml-2 bg-secondary-100 text-secondary-800 rounded-full px-2.5 py-0.5 text-xs font-medium">
                {leadCounts.all}
              </span>
            </button>
            
            <button
              onClick={() => setSelectedStatus('new')}
              className={`${
                selectedStatus === 'new'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-600 hover:text-secondary-800 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <MessageSquare size={16} className="mr-2" />
              New
              <span className="ml-2 bg-success-50 text-success-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
                {leadCounts.new}
              </span>
            </button>
            
            <button
              onClick={() => setSelectedStatus('contacted')}
              className={`${
                selectedStatus === 'contacted'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-600 hover:text-secondary-800 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Phone size={16} className="mr-2" />
              Contacted
              <span className="ml-2 bg-warning-50 text-warning-700 rounded-full px-2.5 py-0.5 text-xs font-medium">
                {leadCounts.contacted}
              </span>
            </button>
            
            <button
              onClick={() => setSelectedStatus('closed')}
              className={`${
                selectedStatus === 'closed'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-secondary-600 hover:text-secondary-800 hover:border-secondary-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <UserCheck size={16} className="mr-2" />
              Closed
              <span className="ml-2 bg-secondary-100 text-secondary-800 rounded-full px-2.5 py-0.5 text-xs font-medium">
                {leadCounts.closed}
              </span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Leads table */}
      <div className="flex gap-6">
        <div className="flex-1">
          <DataTable
            columns={columns}
            data={filteredLeads}
            keyField="id"
            onRowClick={handleViewLead}
            searchField="name"
          />
        </div>
        
        {/* Lead details panel */}
        {selectedLead && (
          <div className="w-96 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">{selectedLead.name}</h2>
            
            <div className="space-y-4">
              {selectedLead.company && (
                <div>
                  <p className="text-sm font-medium text-secondary-500">Company</p>
                  <p className="text-secondary-900">{selectedLead.company}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-secondary-500">Contact</p>
                <div className="flex items-center mt-1">
                  <Mail size={16} className="text-secondary-500 mr-2" />
                  <a href={`mailto:${selectedLead.email}`} className="text-primary-600 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center mt-1">
                    <Phone size={16} className="text-secondary-500 mr-2" />
                    <a href={`tel:${selectedLead.phone}`} className="text-primary-600 hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-secondary-500">Status</p>
                <select
                  className="mt-1 block w-full rounded-md border border-secondary-300 shadow-sm py-2 px-3 text-secondary-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={selectedLead.status}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div>
                <p className="text-sm font-medium text-secondary-500">Date Received</p>
                <p className="text-secondary-900">{formatDate(selectedLead.createdAt)}</p>
              </div>
              
              {selectedLead.productName && (
                <div>
                  <p className="text-sm font-medium text-secondary-500">Product Inquiry</p>
                  <p className="text-primary-600">{selectedLead.productName}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-secondary-500">Message</p>
                <p className="text-secondary-900 border border-secondary-200 rounded-md p-3 mt-1 bg-secondary-50 text-sm">
                  {selectedLead.message}
                </p>
              </div>
              
              <div className="pt-4 space-y-3">
                <Button 
                  variant="primary" 
                  size="sm"
                  leftIcon={<Mail size={16} />}
                  fullWidth
                >
                  Send Email
                </Button>
                
                {selectedLead.phone && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Phone size={16} />}
                    fullWidth
                  >
                    Call Contact
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadManagement;