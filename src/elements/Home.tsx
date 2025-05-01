
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Student {
  id: string | number;
  name: string;
  email: string;
  admin: string;
}

function Home() {
    const [data, setData] = useState<Student[]>([]);
    const [deleted, setDeleted] = useState(true);
    
    useEffect(() => {
        if(deleted) {
            setDeleted(false);
            axios.get('/students')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
        }
    }, [deleted]);

    function handleDelete(id: string | number) {
        axios.delete(`/delete/${id}`)
        .then(() => {
            setDeleted(true);
        })
        .catch((err) => console.log(err));
    }
    
    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Students</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create'>Add Student</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student) => {
                            return (<tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.admin}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
                                    <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Home;
