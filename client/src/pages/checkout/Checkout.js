import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [card, setCard] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const mycart = JSON.parse(localStorage.getItem('cartItems'))
    const allproducts = JSON.parse(localStorage.getItem('allproducts'))
    const oneproduct = allproducts.find(item => item._id === params.id)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (oneproduct) {
            fetch('/api/order', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    userId: user._id,
                    products: oneproduct,
                    amount: oneproduct.price,
                    address,
                    mobile,
                    card
                })
            }).then(res => res.json())
                .then(result => {
                    if (result) {
                        const Items = JSON.parse(localStorage.getItem('myorders'))
                        const newitems = Items.concat(result)
                        localStorage.setItem('myorders', JSON.stringify(newitems))
                        alert(`Order place ! To see your order check myorders`)
                        navigate('/')
                    }
                })
                .catch(err => console.log(err))
        } else {
            fetch('/api/order', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    userId: user._id,
                    products: mycart,
                    amount: Math.round(params.price),
                    address,
                    mobile,
                    card
                })
            }).then(res => res.json())
                .then(result => {
                    if (result) {
                        const Items = JSON.parse(localStorage.getItem('myorders'))
                        const newitems = Items.concat(result)
                        localStorage.setItem('myorders', JSON.stringify(newitems))
                        alert(`Order place ! To see your order check myorders`)
                        navigate('/')
                    }
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className='mt-5' style={{ width: '30rem', margin: '0 auto' }}>
            <div >
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Address</label>
                        <input className='form-control' type="text" required minLength='3' maxLength='90' value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Mobile number</label>
                        <input className='form-control' type="number" required minLength='10' maxLength='10' value={mobile} onChange={e => setMobile(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Debit Card</label>
                        <input className='form-control' type="number" required minLength='16' maxLength='16' value={card} onChange={e => setCard(e.target.value)} />
                    </div>
                    <div className='mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Amount</h4>
                        <h6>${oneproduct ? oneproduct.price : Math.round(params.price)}</h6>
                    </div>
                    <div className="text-center">
                        <Button variant='contained' type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout