import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Products = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/addproduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                title,
                description,
                image,
                category,
                price
            })
        }).then(res => res.json())
            .then(result => {
                const Items = JSON.parse(localStorage.getItem('allproducts'))
                const newitems = Items.concat(result)
                localStorage.setItem('allproducts', JSON.stringify(newitems))
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='mt-5' style={{ width: '30rem', margin: '0 auto' }}>
            <h3 className='text-center'>Add Product</h3>
            <div >
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input className='form-control' type="text" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input className='form-control' type="text" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Image</label>
                        <input className='form-control' type="text" onChange={e => setImage(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Category</label>
                        <select className='form-select' onChange={e => setCategory(e.target.value)}>
                            <option defaultValue='category'>Category</option>
                            <option value="men's clothing">men's clothing</option>
                            <option value="women's clothing">women's clothing</option>
                            <option value="electronics">electronics</option>
                            <option value="jewelery">jewelery</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Price</label>
                        <input className='form-control' type="text" onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className="text-center">
                        <Button variant='contained' type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Products


// value={address} onChange={e => setAddress(e.target.value)} 