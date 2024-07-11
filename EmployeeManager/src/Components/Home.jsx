import './dashboard.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [adminTotal, setAdminTotal] = useState(0)
    const [employeeTotal, setemployeeTotal] = useState(0)
    const [salaryTotal, setSalaryTotal] = useState(0)
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        adminCount();
        employeeCount();
        salaryCount();
        AdminRecords();
    }, [])

    const adminCount = () => {
        axios.get('http://localhost:8082/auth/admin_count')
            .then(result => {
                if (result.data.Status) {
                    setAdminTotal(result.data.Result[0].admin)
                }
            })
    }
    const employeeCount = () => {
        axios.get('http://localhost:8082/auth/employee_count')
            .then(result => {
                if (result.data.Status) {
                    setemployeeTotal(result.data.Result[0].employee)
                }
            })
    }
    const salaryCount = () => {
        axios.get('http://localhost:8082/auth/salary_count')
            .then(result => {
                if (result.data.Status) {
                    setSalaryTotal(result.data.Result[0].salaryEmployee)
                } else {
                    console.log(result.data.Error)
                }
            })
    }
    const AdminRecords = () => {
        axios.get('http://localhost:8082/auth/admin_records')
            .then(result => {
                if (result.data.Status) {
                    setAdmins(result.data.Result)
                } else {
                    console.log(result.data.Error)
                }
            })
    }

    return (
        <section className='sectionHome'>
            <div className='info'>
                <div className='card'>
                    <h4>Admin</h4>
                    <div>
                        <h5>Total:</h5>
                        <h5>{adminTotal}</h5>
                    </div>
                </div>

                <div className='card'>
                    <h4>Employee</h4>
                    <div>
                        <h5>Total:</h5>
                        <h5>{employeeTotal}</h5>
                    </div>
                </div>

                <div className='card'>
                    <h4>Salary</h4>
                    <div>
                        <h5>Total:</h5>
                        <h5>${salaryTotal}</h5>
                    </div>
                </div>
            </div>

            <div>
                <h2>List of Admins</h2>
                <div className='header admin'>
                    <p>Email</p>
                    <p>Action</p>
                </div>
                <div >
                    {admins.map((e, index) => (
                        <div key={index} className='adminInfo'>
                            <p> {e.email}</p>
                            <div className='btnsAdmin'>
                                <button className='btnDelete' >
                                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.77 8.00006L18.71 6.00006C18.8963 5.8127 19.0008 5.55925 19.0008 5.29506C19.0008 5.03087 18.8963 4.77742 18.71 4.59006L15.37 1.29006C15.1826 1.10381 14.9292 0.999268 14.665 0.999268C14.4008 0.999268 14.1474 1.10381 13.96 1.29006L12 3.23006L16.77 8.00006ZM1 14.2501V19.0001H5.75L15.71 9.04006L10.96 4.29006L1 14.2501Z" fill="#333333" />
                                    </svg>
                                </button>
                                <button className='btnDelete' >
                                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z" fill="#333333" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    )
}

export default Home
