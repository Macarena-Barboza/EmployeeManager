import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
    });
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8082/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get(`http://localhost:8082/auth/employee/${id}`)
            .then(result => {
                console.log(result.data)
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    salary: result.data.Result[0].salary,
                    address: result.data.Result[0].address,
                    category_id: result.data.Result[0].category_id,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8082/auth/edit_employee/${id}`, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    console.log(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='cont-form'>
            <h2>EditEmployee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Name" >Name</label>
                    <input type="text" id="Name" placeholder='Enter Name' autoComplete='off' value={employee.name}
                        onChange={e => setEmployee({ ...employee, name: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" placeholder='Enter Email' autoComplete='off' value={employee.email}
                        onChange={e => setEmployee({ ...employee, email: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Salary">Salary</label>
                    <input type="text" id="Salary" placeholder="Enter Salary" autoComplete='off' value={employee.salary}
                        onChange={e => setEmployee({ ...employee, salary: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Address">Address</label>
                    <input type="text" id="Address" placeholder="1234 Main St" autoComplete='off' value={employee.address}
                        onChange={e => setEmployee({ ...employee, address: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Category">Category</label>
                    <select name="category" id="Category" value={employee.category_id} onChange={e => setEmployee({ ...employee, category_id: e.target.value })}>
                        {category.map((catego, index) => {
                            return <option value={catego.idcategory} key={index}>{catego.name}</option>
                        })}
                    </select>
                </div>

                <button className='btn'>Edit Employee</button>
            </form>
        </div >
    )
}

export default EditEmployee



