
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/common/Button";

function Read() {
  const [data, setData] = useState<any[]>([]);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/get_student/${id}`).then((res) => {
      setData(res.data);
    }).catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="flex min-h-screen bg-primary-600 justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Button to="/home" variant="secondary" className="mb-4">
          Back
        </Button>
        <h2 className="text-2xl font-bold mb-4">Student Detail</h2>
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="mb-2 font-semibold text-secondary-800 border-b pb-2">
            Student Information
          </div>
          <div className="mt-4">
            <p className="mb-2"><span className="font-medium">Name:</span> {data[0]?.name}</p>
            <p><span className="font-medium">Email:</span> {data[0]?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
