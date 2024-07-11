import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/auth/add_category', { category })
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/category');
                } else {
                    console.log(result.data.Error)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='cont-form'>
            <h2>Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category"><strong>category:</strong></label>
                    <input type="text" name='category' placeholder='Enter Category'
                        onChange={(e) => setCategory(e.target.value)} />
                </div>
                <button className='btn'>Add Category</button>
            </form>
        </div>
    );
}
