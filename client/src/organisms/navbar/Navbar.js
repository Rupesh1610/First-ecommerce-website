import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <div className='nav_container sticky-top'>
            <nav className="navbar navbar-expand-lg bg-info navbar-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MY SHOP</NavLink>
                    <NavLink to='/cart' className='nav_link'>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlinedIcon sx={{ marginTop: '0.5rem', color: 'white' }} />
                        </Badge>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {user === null ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signin">SIGNIN</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">SIGNUP</NavLink>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {user.isAdmin === true ?
                                            (<>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/users">USERS</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/orders">ORDERS</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/products">PRODUCTS</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <Button onClick={() => {
                                                        localStorage.clear()
                                                        navigate('/')
                                                    }}>logout</Button>
                                                </li>
                                            </>)
                                            :
                                            (<>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/myorders">MY ORDERS</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/profile">PROFILE</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <Button onClick={() => {
                                                        localStorage.clear()
                                                        navigate('/')
                                                    }}>logout</Button>
                                                </li>
                                            </>)
                                        }
                                    </>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar



























