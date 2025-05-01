import { useState } from 'react';
import { Download } from 'lucide-react';
import Button from '../../components/common/Button';

const StockImport = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const downloadTemplate = () => {
    // Implementation for template download would go here
    console.log("Downloading template file");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Import Stock Data</h1>
      <p className="mb-6">
        Download the template file, fill it with your stock data, and then upload it here to update your product inventory.
      </p>

      <div className="flex justify-between mb-6">
        <div>
          <a 
            href="#"
            onClick={downloadTemplate}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <Download size={16} />
            Download Template
          </a>
        </div>
        <Button variant="primary">
          Import Products
        </Button>
      </div>

      <div className="border rounded-md p-4">
        <label htmlFor="file-upload" className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
          {file ? `File selected: ${file.name}` : 'Select a file to upload'}
          <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default StockImport;
