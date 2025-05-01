import { useState } from 'react';
import { Upload, Download, FileText, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';

const StockImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'validating' | 'importing' | 'success' | 'error'>('idle');
  const [importLogs, setImportLogs] = useState<Array<{ type: 'info' | 'warning' | 'error' | 'success'; message: string }>>([]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      setImportStatus('validating');
      setImportLogs([
        { type: 'info', message: 'Validating file structure...' }
      ]);
      
      // Simulate validation process
      setTimeout(() => {
        setImportLogs(prev => [
          ...prev,
          { type: 'success', message: 'File structure valid.' },
          { type: 'info', message: 'Checking data format...' }
        ]);
        
        setTimeout(() => {
          if (selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.json')) {
            setImportLogs(prev => [
              ...prev,
              { type: 'success', message: 'Data format valid.' },
              { type: 'info', message: 'Ready to import. Click "Start Import" to proceed.' }
            ]);
          } else {
            setImportStatus('error');
            setImportLogs(prev => [
              ...prev,
              { type: 'error', message: 'Invalid file format. Please use CSV or JSON files.' }
            ]);
          }
        }, 800);
      }, 1000);
    }
  };
  
  const handleStartImport = () => {
    if (!file) return;
    
    setImportStatus('importing');
    setImportLogs(prev => [
      ...prev,
      { type: 'info', message: 'Starting import process...' }
    ]);
    
    // Simulate import process
    setTimeout(() => {
      setImportLogs(prev => [
        ...prev,
        { type: 'info', message: 'Importing product data...' }
      ]);
      
      setTimeout(() => {
        setImportLogs(prev => [
          ...prev,
          { type: 'info', message: 'Imported 50 of 126 products...' }
        ]);
        
        setTimeout(() => {
          setImportLogs(prev => [
            ...prev,
            { type: 'info', message: 'Imported 100 of 126 products...' }
          ]);
          
          setTimeout(() => {
            setImportLogs(prev => [
              ...prev,
              { type: 'warning', message: 'Skipped 3 products due to missing required fields.' },
              { type: 'info', message: 'Imported 126 of 126 products.' },
              { type: 'success', message: 'Import completed successfully!' }
            ]);
            setImportStatus('success');
          }, 1500);
        }, 1200);
      }, 1500);
    }, 1000);
  };
  
  const handleReset = () => {
    setFile(null);
    setImportStatus('idle');
    setImportLogs([]);
  };
  
  const getTemplateFile = () => {
    // In a real app, this would download a template CSV/JSON file
    alert('Downloading template file...');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Stock Import</h1>
        <p className="text-secondary-600">Update your product catalog by uploading a CSV or JSON file</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Import Products</h2>
            </div>
            
            <div className="p-6">
              {importStatus === 'idle' && (
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <Upload className="h-12 w-12 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">Upload Product File</h3>
                  <p className="text-secondary-600 mb-6">
                    Supported formats: CSV, JSON
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".csv,.json"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="primary" as="span">
                      Select File
                    </Button>
                  </label>
                </div>
              )}
              
              {file && importStatus !== 'idle' && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0">
                      <FileText className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-secondary-900">{file.name}</h3>
                      <p className="text-sm text-secondary-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="ml-auto">
                      {importStatus === 'validating' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReset}
                        >
                          Change File
                        </Button>
                      )}
                      
                      {importStatus === 'validating' && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="ml-3"
                          onClick={handleStartImport}
                        >
                          Start Import
                        </Button>
                      )}
                      
                      {importStatus === 'importing' && (
                        <div className="flex items-center text-primary-600">
                          <RefreshCw size={20} className="animate-spin mr-2" />
                          <span>Importing...</span>
                        </div>
                      )}
                      
                      {importStatus === 'success' && (
                        <div className="flex items-center text-success-700">
                          <CheckCircle size={20} className="mr-2" />
                          <span>Import Complete</span>
                        </div>
                      )}
                      
                      {importStatus === 'error' && (
                        <div className="flex items-center text-error-600">
                          <AlertTriangle size={20} className="mr-2" />
                          <span>Import Failed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border border-secondary-200 rounded-lg p-4 bg-secondary-50">
                    <h4 className="font-medium text-secondary-900 mb-3">Import Log</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {importLogs.map((log, index) => (
                        <div key={index} className="flex items-start">
                          <span className={`flex-shrink-0 w-5 ${
                            log.type === 'success' ? 'text-success-600' :
                            log.type === 'error' ? 'text-error-600' :
                            log.type === 'warning' ? 'text-warning-600' :
                            'text-secondary-600'
                          }`}>
                            {log.type === 'success' && <CheckCircle size={16} />}
                            {log.type === 'error' && <AlertTriangle size={16} />}
                            {log.type === 'warning' && <AlertTriangle size={16} />}
                            {log.type === 'info' && <span>•</span>}
                          </span>
                          <span className="text-sm text-secondary-800">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {(importStatus === 'success' || importStatus === 'error') && (
                    <div className="mt-6 text-center">
                      <Button
                        variant="primary"
                        onClick={handleReset}
                      >
                        Start New Import
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Recent Import History</h2>
            </div>
            
            <div className="p-6">
              <div className="divide-y divide-secondary-200">
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900">full_catalog_june.csv</p>
                    <p className="text-sm text-secondary-500">2023-06-15 09:14:32</p>
                  </div>
                  <div className="text-sm flex items-center text-success-700">
                    <CheckCircle size={16} className="mr-1" />
                    <span>126 products imported</span>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900">product_update_may.json</p>
                    <p className="text-sm text-secondary-500">2023-05-20 14:32:10</p>
                  </div>
                  <div className="text-sm flex items-center text-success-700">
                    <CheckCircle size={16} className="mr-1" />
                    <span>47 products imported</span>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-secondary-900">new_items_april.csv</p>
                    <p className="text-sm text-secondary-500">2023-04-12 11:08:45</p>
                  </div>
                  <div className="text-sm flex items-center text-warning-700">
                    <AlertTriangle size={16} className="mr-1" />
                    <span>15 products imported, 3 failed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Import Instructions</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-secondary-900 mb-1">Supported Formats</h3>
                  <p className="text-sm text-secondary-600">
                    Upload products in CSV or JSON format. Make sure your file follows the required structure.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-secondary-900 mb-1">Required Fields</h3>
                  <ul className="list-disc list-inside text-sm text-secondary-600">
                    <li>title - Product name</li>
                    <li>partCode - 7-digit part number</li>
                    <li>mliCode - Manufacturer Line Item code</li>
                    <li>category - Product category</li>
                    <li>model - Compatible Ford model</li>
                    <li>stockStatus - In Stock/Limited/Out of Stock</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-secondary-900 mb-1">Optional Fields</h3>
                  <ul className="list-disc list-inside text-sm text-secondary-600">
                    <li>image - Product image URL</li>
                    <li>description - Product description</li>
                    <li>compatibility - List of compatible models</li>
                    <li>yearRange - Year range of compatibility</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download size={16} />}
                    onClick={getTemplateFile}
                    fullWidth
                  >
                    Download Template File
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Export Products</h2>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-secondary-600 mb-4">
                Export your current product catalog in CSV or JSON format for backup or modification.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download size={16} />}
                  fullWidth
                >
                  Export as CSV
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download size={16} />}
                  fullWidth
                >
                  Export as JSON
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockImport;