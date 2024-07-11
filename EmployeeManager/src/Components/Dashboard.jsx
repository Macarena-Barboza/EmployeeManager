import React from 'react'
import './dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:8082/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            })
    }

    return (
        <div className='dashboard'>
            <section className='section1'>
                <Link to='/dashboard' className='linkLogo'>Company</Link>
                <div>
                    <ul>
                        <li><Link to='/dashboard/' className='link'>Dashboard</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/dashboard/employee' className='link'>Manage Employees</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/dashboard/category' className='link'>Category</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/dashboard/profile' className='link'>Profile</Link></li>
                    </ul>
                    <ul>
                        <li onClick={handleLogout}><Link className='link'>Logout</Link></li>
                    </ul>
                </div>
            </section>
            <section className='section2'>
                <Outlet />
            </section>
        </div>
    )
}
