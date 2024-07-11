import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8082/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    console.log(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('salary', employee.salary);
        formData.append('address', employee.address);
        formData.append('category_id', employee.category_id);
        formData.append('image', employee.image);

        axios.post('http://localhost:8082/auth/add_employee', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    console.log(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='cont-form'>
            <h1>Employee</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Name" >Name</label>
                    <input type="text" id="Name" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setEmployee({ ...employee, name: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Email">Email</label>
                    <input type="email" id="Email" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setEmployee({ ...employee, email: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Password">Password</label>
                    <input type="password" id="Password" placeholder='Enter Password'
                        onChange={e => setEmployee({ ...employee, password: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Salary">Salary</label>
                    <input type="text" id="Salary" placeholder="Enter Salary" autoComplete='off'
                        onChange={e => setEmployee({ ...employee, salary: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Address">Address</label>
                    <input type="text" id="Address" placeholder="1234 Main St" autoComplete='off'
                        onChange={e => setEmployee({ ...employee, address: e.target.value })} />
                </div>
                <div >
                    <label htmlFor="Category">Category</label>
                    <select name="category" id="Category" onChange={e => setEmployee({ ...employee, category_id: e.target.value })}>
                        {category.map((catego, index) => {
                            return <option value={catego.idcategory} key={index} required>{catego.name}</option>
                        })}
                    </select>
                </div>
                <div >
                    <label htmlFor="Image">Profile</label>
                    <input type="file" id="Image" name="image" required
                        onChange={e => setEmployee({ ...employee, image: e.target.files[0] })} />
                </div>

                <button className='btn'>Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
