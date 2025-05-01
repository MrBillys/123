
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/common/Button";

function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`/get_student/${id}`)
      .then((res) => {
        setName(res.data[0].name);
        setEmail(res.data[0].email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`/update/${id}`, { name, email })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-primary-600 justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Button to="/home" variant="secondary" className="mb-4">
          Back
        </Button>
        <h2 className="text-2xl font-bold mb-4">Update Student</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-secondary-800 mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="input w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-secondary-800 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
