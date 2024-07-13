import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

export default function EmployeeLogin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate(`/employee_detail/${result.data.id}`);
                    console.log('Login guardado');
                } else {
                    setError(result.data.Error);
                    console.log('Error en el login:', result.data.Error);
                }
            })
            .catch(error => console.error('Error al enviar la solicitud:', error));
    }

    return (
        <div className='cont-form'>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email'
                        value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })}
                        className='form-control rounded-0' />
                </div>
                <div>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" id='password' name='password' placeholder='Enter Password'
                        value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })}
                        className='form-control rounded-0' />
                </div>

                <p className='text-red'>
                    {error && error}
                </p>

                <button className='btn'>Log in</button>

                <div className='condition'>
                    <input type="checkbox" name="tick" id="check" />
                    <label htmlFor="check">You agree with terms & conditions</label>
                </div>
            </form>
        </div>
    );
}
