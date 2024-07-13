import React, { useEffect } from 'react'
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Start() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8082/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === 'admin') {
                        navigate('/dashboard');
                        console.log('admin login verify ')
                    } else {
                        navigate(`employee_detail/${result.data.id}`)
                        console.log('No admin login verify ')
                    }
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <div className='cont-form'>
            <h2>Login As</h2>
            <div>
                <button className='btn' onClick={() => { navigate('/employee_login') }}>Employee</button>
                <br />
                <br />
                <button className='btn' onClick={() => { navigate('/adminlogin') }}>Admin</button>
            </div>
        </div>
    )
}

