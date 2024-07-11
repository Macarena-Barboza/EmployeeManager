import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Category() {
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategorys(result.data.Result)
                } else {
                    console.log(result.data.Error)
                }
            }).catch(err => console.log(err));
    }, [])

    return (
        <div >
            <h1>Category List</h1>
            <div className='category'>
                <Link to='/dashboard/add_category' className='link'><button className='btn'>Add Category</button></Link>
            </div>
            <div className='tabla'>
                {
                    categorys.map((c, index) => (
                        <p key={index}>{c.name}</p>
                    ))
                }
            </div>
        </div >
    )
}
