
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../components/common/Button";
import { Plus, Eye, Edit, Trash } from "lucide-react";

function Home() {
  const [data, setData] = useState<any[]>([]);
  const [deleted, setDeleted] = useState(true);
  
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios.get("/students").then((res) => {
        setData(res.data);
      }).catch((err) => console.log(err));
    }
  }, [deleted]);
  
  function handleDelete(id: string) {
    axios.delete(`/delete/${id}`).then(() => {
      setDeleted(true);
    }).catch((err) => console.log(err));
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-800">Students Management</h2>
          <Button to="/create" variant="primary" leftIcon={<Plus size={16} />}>
            Add Student
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-secondary-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((student, i) => (
                  <tr key={i} className="border-b border-secondary-100">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button to={`/read/${student.id}`} variant="secondary" size="sm" leftIcon={<Eye size={14} />}>
                          View
                        </Button>
                        <Button to={`/edit/${student.id}`} variant="outline" size="sm" leftIcon={<Edit size={14} />}>
                          Edit
                        </Button>
                        <Button 
                          onClick={() => handleDelete(student.id)} 
                          variant="text" 
                          size="sm"
                          className="text-error-700 hover:bg-error-50" 
                          leftIcon={<Trash size={14} />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-secondary-600">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
