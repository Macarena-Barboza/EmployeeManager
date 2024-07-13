import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import './register.css';

export default function EmployeeDetail() {
    const [employee, setEmployee] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8082/employee/detail/${id}`)
            .then(result => {
                setEmployee(result.data[0]);
            })
            .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8082/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='cont-form'>
            <h2>Employee Management System</h2>
            <div className='detail'>
                <img src={`http://localhost:8082/Images/${employee.image}`} alt={employee.name} />
                <div>
                    <p>Name: <strong>{employee.name}</strong></p>
                    <p>Email: <strong>{employee.email}</strong></p>
                    <p>Salary: <strong>${employee.salary}</strong></p>
                </div>
                <div className='btnDetail'>
                    <button className='btn'>Edit</button>
                    <button className='btn' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
