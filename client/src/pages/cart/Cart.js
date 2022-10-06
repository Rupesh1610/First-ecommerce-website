import React, { useEffect, useState } from 'react'
import './cart.css'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Cart = () => {

    return (
        <div style={{ width: '90%', margin: '3rem auto 0' }}>
            <h3 className='text-center mb-5'>YOUR BAG</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div className='product_container'>
                    {quantity === 0 ? (<h4>your cart is empty <Link to='/'>shop now</Link></h4>) : cartItems.map((product, index) => {
                        return (
                            <div key={product._id}>
                                <div className='cart_card mb-5'>
                                    <img src={product.image} alt={product.title} style={{ margin: '0 2rem 0 0' }} />
                                    <div>
                                        <h6>{product.title}</h6>
                                        <h5>$ {product.price}</h5>
                                        <Button sx={{ width: '3rem' }} onClick={() => handleRemove(index)}>remove</Button>
                                    </div>
                                </div>
                                <hr className='cart_hr' />
                            </div>
                        )
                    })}
                </div>
                <div className={`price_container ${quantity === 0 && 'hide'}`}>
                    <div className='price_details'>
                        <h3>PRICE DETAILS</h3>
                        <hr />
                        <div>
                            <h6>Price({quantity} items)</h6>
                            <p>{Math.round(total)}</p>
                        </div>
                        <div>
                            <h6>Delivery charges</h6>
                            <p>Free Delivery</p>
                        </div>
                        <hr />
                        <div>
                            <h5>Total Amount</h5>
                            <h5>{Math.round(total)}</h5>
                        </div>
                        <div>
                            <Button variant='contained' fullWidth sx={{ margin: '4rem auto 0' }} onClick={() => navigate(`/checkout/cart/${total}`)}>checkout now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart