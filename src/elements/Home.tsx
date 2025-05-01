import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d: any, i: number) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <Link to={`/read/${d.id}`} className="btn btn-sm btn-primary">Read</Link>
                  <Link to={`/edit/${d.id}`} className="btn btn-sm btn-success ms-2">Edit</Link>
                  <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
