import { React, useState, useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios';
import './dashboard.css'

export default function Employee() {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8082/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result)
                } else {
                    console.log(result.data.Error)
                }
            }).catch(err => console.log(err));
    }, [employee])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8082/auth/delete_employee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div >
            <h1>Employee List</h1>
            <div className='category'>
                <Link to='/dashboard/add_employee' className='link'><button className='btn'>Add Employee</button></Link>
            </div>

            <div className='tablaEmpl'>
                <div className='header'>
                    <p>Perfil</p>
                    <p>name</p>
                    <p>email</p>
                    <p>address</p>
                    <p>salary</p>
                    <p></p>
                </div>
                <div>
                    {employee.map((e, index) => (
                        <div key={index} className='fila'>
                            <p> <img src={`http://localhost:8082/Images/${e.image}`} alt={e.name} /></p>
                            <p>{e.name}</p>
                            <p>{e.email}</p>
                            <p>{e.address}</p>
                            <p>$ {e.salary}</p>
                            <p className='btns'>
                                <Link to={`/dashboard/edit_employee/${e.id}`} >
                                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.77 8.00006L18.71 6.00006C18.8963 5.8127 19.0008 5.55925 19.0008 5.29506C19.0008 5.03087 18.8963 4.77742 18.71 4.59006L15.37 1.29006C15.1826 1.10381 14.9292 0.999268 14.665 0.999268C14.4008 0.999268 14.1474 1.10381 13.96 1.29006L12 3.23006L16.77 8.00006ZM1 14.2501V19.0001H5.75L15.71 9.04006L10.96 4.29006L1 14.2501Z" fill="#333333" />
                                    </svg>
                                </Link>
                                <button onClick={() => handleDelete(e.id)} className='btnDelete' >
                                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z" fill="#333333" />
                                    </svg>
                                </button>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

