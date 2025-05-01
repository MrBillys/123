import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState<any[]>([]);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/get_student/${id}`).then((res) => {
      setData(res.data);
    }).catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/" className="btn btn-success">
          Back
        </Link>
        <h2>Student Detail</h2>
        <div className="card">
          <div className="card-header">
            <strong className="font-weight-bold">Data</strong>
          </div>
          <div className="card-body">
            <p>Name: {data[0]?.name}</p>
            <p>Email: {data[0]?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
